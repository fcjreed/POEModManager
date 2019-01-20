package poe.mod.manager.controller;

import static poe.mod.manager.exception.ModManagerExceptions.MISSING_TOKEN;

import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.List;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.apache.commons.lang3.StringUtils;
import org.kohsuke.github.GHAsset;
import org.kohsuke.github.GHRelease;
import org.kohsuke.github.GHRepository;
import org.kohsuke.github.GitHub;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import poe.mod.manager.boot.enums.ExecuteType;
import poe.mod.manager.boot.model.Mod;
import poe.mod.manager.properties.GitHubRepos;
import poe.mod.manager.request.GithubAccessRequest;
import poe.mod.manager.request.POELauncherRequest;
import poe.mod.manager.response.GenericResponse;
import poe.mod.manager.response.ModDataResponse;

@RestController
// Input validation done on front end
public class GithubController {

	private static final String INSTALL_FOLDER = System.getProperty("user.home") + "/AppData/Local/POEModManager";
	private static final int BUFFER_SIZE = 4096;
	private static final String VERSION_REGEX = "[^0-9\\.]";
	private static final RestTemplate restTemplate = new RestTemplate();
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
				Path detailsPath = tempLoc.toPath().resolve("modmanagerdata/details.tmp");
				if (StringUtils.isNotBlank(request.getToken())) {
					token = request.getToken();
					Path modManagerDir = Files.createDirectory(tempLoc.toPath().resolve("modmanagerdata"));
					Files.write(Files.createFile(modManagerDir.resolve("details.tmp")), request.getToken().getBytes("UTF-8"), StandardOpenOption.WRITE);
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
				String latestVersion = release.getName().replaceAll(VERSION_REGEX, "");
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
	
	@PostMapping(value = "/installMod")
	public Mod installMod(@RequestBody Mod mod) throws RestClientException, URISyntaxException, IOException {
		Path installFolder = Paths.get(INSTALL_FOLDER);
		installFolder.toFile().mkdir();
		Path modFolder = installFolder.resolve(mod.getName());
		modFolder.toFile().mkdir();
		for (String downloadUrl : mod.getDownloadUrls()) {
			ResponseEntity<byte[]> dlResponse = restTemplate.getForEntity(new URI(downloadUrl), byte[].class);
			if (downloadUrl.contains(".zip")) {
				ZipInputStream inStream = new ZipInputStream(new ByteArrayInputStream(dlResponse.getBody()));
				ZipEntry entry = inStream.getNextEntry();
		        while (entry != null) {
		        	Path installPath = modFolder.resolve(entry.getName());
		        	if (entry.isDirectory()) {
		        		installPath.toFile().mkdir();
		        	}
		        	else {
		        		ExecuteType exeType = ExecuteType.determineType(entry.getName());
		        		if (exeType != null && installPath.getParent().equals(modFolder)) {
		        			mod.setExecuteType(exeType);
		        			mod.setExecutablePath(installPath.toString());
		        		}
		        		extractZipFile(inStream, installPath);
		        	}
		            inStream.closeEntry();
		            entry = inStream.getNextEntry();
		        }
		        inStream.close();
			}
			else {
				Files.write(modFolder.resolve(downloadUrl.substring(downloadUrl.lastIndexOf('/') + 1)), dlResponse.getBody(), StandardOpenOption.WRITE);
			}
		}
		mod.setInstalled(true);
		Files.write(modFolder.resolve("mod.json"), mapper.writeValueAsBytes(mod), StandardOpenOption.CREATE_NEW);
		return mod;
	}
	
	@PostMapping(value = "/checkUpdates")
	public ModDataResponse checkUpdates(@RequestBody List<Mod> mods) throws IOException {
		ModDataResponse response = new ModDataResponse();
		List<String> supportedRepos = repoProps.getRepositories();
		for (Mod mod : mods) {
			String repoUrl = supportedRepos.stream().filter(repo -> repo.contains(mod.getName())).findFirst().get();
			GHRepository repo = github.getRepository(repoUrl);
			GHRelease release = repo.getLatestRelease();
			String latestVersion = release.getName().replaceAll(VERSION_REGEX, "");
			if (!mod.getVersion().equals(latestVersion)) {
				mod.setNewVersion(latestVersion);
			}
		}
		response.getMods().addAll(mods);
		return response;
	}
	
	@PostMapping(value = "/runGame")
	public GenericResponse runGame(@RequestBody POELauncherRequest request) {
		GenericResponse response = new GenericResponse();
		try {
			for (Mod mod : request.getActivatedMods()) {
				if (ExecuteType.EXE.equals(mod.getExecuteType())) {
					Runtime.getRuntime().exec(mod.getExecutablePath(), null, new File(mod.executablePath).getParentFile());
				}
				else {
					Runtime.getRuntime().exec(request.getAhkPath() + " " + mod.getExecutablePath(), null, new File(mod.getExecutablePath()).getParentFile());
				}
			}
			Runtime.getRuntime().exec(request.getPoePath(), null, new File(request.getPoePath()).getParentFile());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return response;
	}
	
	private Mod checkAndAddIfInstalled(String name) {
		Mod installedMod = null;
		File installFolder = new File(INSTALL_FOLDER);
		installFolder.mkdir();
		Path modFolder = installFolder.toPath().resolve(name);
		if (modFolder.toFile().exists()) {
			try {
				installedMod = mapper.readValue(modFolder.resolve("mod.json").toFile(), Mod.class);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return installedMod;
	}
	
	private static void extractZipFile(ZipInputStream zipIn, Path filePath) throws IOException {
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(filePath.toFile()));
        byte[] bytesIn = new byte[BUFFER_SIZE];
        int read = 0;
        while ((read = zipIn.read(bytesIn)) != -1) {
            bos.write(bytesIn, 0, read);
        }
        bos.close();
	}
	
}
