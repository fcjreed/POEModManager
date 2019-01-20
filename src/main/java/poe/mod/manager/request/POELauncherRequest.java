package poe.mod.manager.request;

import java.util.ArrayList;
import java.util.List;

import poe.mod.manager.model.Mod;

public class POELauncherRequest {

	public String poePath;
	public String ahkPath;
	public List<Mod> activatedMods;
	
	public POELauncherRequest() {}
	
	public POELauncherRequest(String poePath, String ahkPath, List<Mod> activatedMods) {
		this.poePath = poePath;
		this.ahkPath = ahkPath;
		this.activatedMods = activatedMods;
	}

	public String getPoePath() {
		return poePath;
	}

	public void setPoePath(String poePath) {
		this.poePath = poePath;
	}

	public String getAhkPath() {
		return ahkPath;
	}

	public void setAhkPath(String ahkPath) {
		this.ahkPath = ahkPath;
	}

	public List<Mod> getActivatedMods() {
		if (activatedMods == null) {
			activatedMods = new ArrayList<Mod>();
		}
		return activatedMods;
	}

	public void setActivatedMods(List<Mod> activatedMods) {
		this.activatedMods = activatedMods;
	}
	
}
