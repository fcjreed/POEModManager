package poe.mod.manager.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import poe.mod.manager.enums.ExecuteType;
import poe.mod.manager.model.Mod;
import poe.mod.manager.request.POELauncherRequest;
import poe.mod.manager.response.GenericResponse;

@RestController
public class LauncherController {

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
	
}
