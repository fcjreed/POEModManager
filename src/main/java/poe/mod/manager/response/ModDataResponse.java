package poe.mod.manager.response;

import java.util.HashSet;
import java.util.Set;

import poe.mod.manager.boot.model.Mod;

public class ModDataResponse extends GenericResponse {

	public Set<Mod> mods;

	public Set<Mod> getMods() {
		if (mods == null)
			mods = new HashSet<Mod>();
		return mods;
	}

	public void setMods(Set<Mod> mods) {
		this.mods = mods;
	}
	
}
