package poe.mod.manager.controller;

import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import poe.mod.manager.enums.ExecuteType;
import poe.mod.manager.model.Mod;
import poe.mod.manager.util.ModManagerConstants;

@RestController
public class ModInstallController {

	private static final RestTemplate restTemplate = new RestTemplate();
	@Autowired
	private ObjectMapper mapper;
	
	@PostMapping(value = "/installMod")
	public Mod installMod(@RequestBody Mod mod) throws RestClientException, URISyntaxException, IOException {
		Path installFolder = Paths.get(ModManagerConstants.INSTALL_FOLDER);
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
				ExecuteType exeType = ExecuteType.determineType(downloadUrl);
				Path installPath = modFolder.resolve(downloadUrl.substring(downloadUrl.lastIndexOf('/') + 1));
        		if (exeType != null) {
        			mod.setExecuteType(exeType);
        			mod.setExecutablePath(installPath.toString());
        		}
				Files.write(
						modFolder.resolve(downloadUrl.substring(downloadUrl.lastIndexOf('/') + 1)), 
						dlResponse.getBody(), StandardOpenOption.WRITE);
			}
		}
		mod.setInstalled(true);
		Files.write(modFolder.resolve(ModManagerConstants.MOD_FILE), mapper.writeValueAsBytes(mod), StandardOpenOption.CREATE);
		return mod;
	}
	
	private static void extractZipFile(ZipInputStream zipIn, Path filePath) throws IOException {
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(filePath.toFile()));
        byte[] bytesIn = new byte[ModManagerConstants.BUFFER_SIZE];
        int read = 0;
        while ((read = zipIn.read(bytesIn)) != -1) {
            bos.write(bytesIn, 0, read);
        }
        bos.close();
	}
	
}
