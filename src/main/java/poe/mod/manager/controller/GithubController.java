package poe.mod.manager.controller;

import static poe.mod.manager.exception.ModManagerExceptions.MISSING_TOKEN;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.kohsuke.github.GHAsset;
import org.kohsuke.github.GHRelease;
import org.kohsuke.github.GHRepository;
import org.kohsuke.github.GitHub;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import poe.mod.manager.model.Mod;
import poe.mod.manager.properties.GitHubRepos;
import poe.mod.manager.request.GithubAccessRequest;
import poe.mod.manager.response.GenericResponse;
import poe.mod.manager.response.ModDataResponse;
import poe.mod.manager.util.ModManagerConstants;

@RestController
// Input validation done on front end
public class GithubController {

	private static GitHub github;
	@Autowired
	private GitHubRepos repoProps;
	@Autowired
	private ObjectMapper mapper;
	
	@PostMapping(value = "/verifyAccess")
	public GenericResponse verifyAccess(@RequestBody GithubAccessRequest request) {
		File tempLoc = new File(System.getProperty("java.io.tmpdir"));
		String token = null;
		GenericResponse response = new GenericResponse();
		try {
			if (tempLoc.exists()) {
				Path detailsPath = tempLoc.toPath().resolve(ModManagerConstants.MOD_DETAILS);
				if (StringUtils.isNotBlank(request.getToken())) {
					token = request.getToken();
					Path modManagerDir = Files.createDirectory(tempLoc.toPath().resolve(ModManagerConstants.MOD_DETAIL_FOLDER));
					Files.write(
							Files.createFile(modManagerDir.resolve(ModManagerConstants.MOD_DETAIL_FILE)), 
							request.getToken().getBytes("UTF-8"), StandardOpenOption.WRITE);
				}
				else if (detailsPath.toFile().exists()) {
					List<String> data = Files.readAllLines(detailsPath);
					token = data.get(0);
				}
				if (StringUtils.isNotBlank(token))
					github = GitHub.connectUsingOAuth(token);
			}
			if (github == null || !github.isCredentialValid()) {
				response = new GenericResponse(MISSING_TOKEN.getStatusCode(), MISSING_TOKEN.getDescription());
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return response;
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
	
}
