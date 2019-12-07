package poe.mod.manager.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.kohsuke.github.GHAsset;
import org.kohsuke.github.GHRelease;
import org.kohsuke.github.GHRepository;
import org.kohsuke.github.GitHub;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import poe.mod.manager.exception.ModManagerExceptions;
import poe.mod.manager.model.Mod;
import poe.mod.manager.properties.GitHubRepos;
import poe.mod.manager.request.GithubAccessRequest;
import poe.mod.manager.response.GenericResponse;
import poe.mod.manager.response.ModDataResponse;
import poe.mod.manager.util.EncryptionService;
import poe.mod.manager.util.ModManagerConstants;

@RestController
// Input validation done on front end
public class GithubController {

	private static GitHub github;
	@Autowired
	private GitHubRepos repoProps;
	@Autowired
	private ObjectMapper mapper;
	@Autowired
	private EncryptionService encryptionService;
	
	@SuppressWarnings({ "unchecked" })
	@PostMapping(value = "/verifyAccess")
	public ResponseEntity<GenericResponse> verifyAccess(@RequestBody GithubAccessRequest request, 
			HttpServletRequest req, HttpServletResponse res) {
		File tempLoc = new File(System.getProperty("java.io.tmpdir"));
		String token = null;
		GenericResponse response = new GenericResponse();
		String encryptedToken = null;
		try {
			if (tempLoc.exists()) {
				if (github == null || !github.isCredentialValid()) {
					List<Cookie> cookies = new ArrayList();
					if (req.getCookies() != null) {
						cookies = Arrays.asList(req.getCookies());
					}
					Optional<Cookie> existingCookie = cookies.stream().filter(cookie -> ModManagerConstants.TOKEN_COOKIE.equals(cookie.getName())).findAny();
					if (existingCookie.isPresent()) {
						token = existingCookie.get().getValue();
					}
					if (StringUtils.isNotBlank(token)) {
						token = encryptionService.decrypt(token);
					}
					else if (StringUtils.isNotBlank(request.getToken())){
						token = request.getToken();
						encryptedToken = encryptionService.encrypt(token);
					}
					if (StringUtils.isNotBlank(token))
						github = GitHub.connectUsingOAuth(token);
					if (github == null || !github.isCredentialValid()) {
						return buildExceptionResponse(ModManagerExceptions.MISSING_TOKEN);
					}
					if (StringUtils.isNotBlank(encryptedToken)) {
						Cookie cookie = new Cookie(ModManagerConstants.TOKEN_COOKIE, encryptedToken);
						cookie.setMaxAge(ModManagerConstants.TOKEN_AGE);
						res.addCookie(cookie);
					}
				}
			}
			else {
				return buildExceptionResponse(ModManagerExceptions.MISSING_TEMP_FOLDER);
			}
			
		} catch (IOException | GeneralSecurityException e) {
			e.printStackTrace();
			return buildExceptionResponse(ModManagerExceptions.INVALID_TOKEN);
		}
		return ResponseEntity.ok(response);
	}
	
	@GetMapping(value = "/populateModData", produces = MediaType.APPLICATION_JSON_VALUE)
	public ModDataResponse populdateModData() {
		ModDataResponse response = new ModDataResponse();
		try {
			List<String> supportedRepos = repoProps.getRepositories();
			for (String repoUrl : supportedRepos) {
				final String repoName = repoUrl.split("/")[1];
				Mod installedMod = checkAndAddIfInstalled(repoName);
				GHRepository repo = github.getRepository(repoUrl);
				GHRelease release = repo.getLatestRelease();
				String latestVersion = release.getName().replaceAll(ModManagerConstants.VERSION_REGEX, "");
				if (installedMod == null) {
					response.getMods().add(
							new Mod(repoName, latestVersion, 
									null, false, false,
									release.getAssets().stream().map(GHAsset::getBrowserDownloadUrl)
									.collect(Collectors.toSet())));
				}
				else {
					if (!installedMod.getVersion().equals(latestVersion)) {
						installedMod.setNewVersion(latestVersion);
					}
					response.getMods().add(installedMod);
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return response;
	}
	
	@PostMapping(value = "/checkUpdates")
	public ModDataResponse checkUpdates(@RequestBody List<Mod> mods) throws IOException {
		ModDataResponse response = new ModDataResponse();
		List<String> supportedRepos = repoProps.getRepositories();
		for (Mod mod : mods) {
			String repoUrl = supportedRepos.stream().filter(repo -> repo.contains(mod.getName())).findFirst().get();
			GHRepository repo = github.getRepository(repoUrl);
			GHRelease release = repo.getLatestRelease();
			String latestVersion = release.getName().replaceAll(ModManagerConstants.VERSION_REGEX, "");
			if (!mod.getVersion().equals(latestVersion)) {
				mod.setNewVersion(latestVersion);
			}
		}
		response.getMods().addAll(mods);
		return response;
	}
	
	private Mod checkAndAddIfInstalled(String name) {
		Mod installedMod = null;
		File installFolder = new File(ModManagerConstants.INSTALL_FOLDER);
		installFolder.mkdir();
		Path modFolder = installFolder.toPath().resolve(name);
		if (modFolder.toFile().exists()) {
			try {
				installedMod = mapper.readValue(modFolder.resolve(ModManagerConstants.MOD_FILE).toFile(), Mod.class);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return installedMod;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private ResponseEntity buildExceptionResponse(ModManagerExceptions exception) {
		return new ResponseEntity(new GenericResponse(exception.getStatusCode(), exception.getDescription()), HttpStatus.valueOf(exception.getStatusCode()));
	}
	
}
