package poe.mod.manager.boot.model;

import java.util.Set;

import poe.mod.manager.boot.enums.ExecuteType;

public class Mod {

	public String name;
	public String version;
	public Boolean installed = false;
	public String newVersion;
	public Boolean activated = false;
	public ExecuteType executeType;
	public String executablePath;
	public Set<String> downloadUrls;
	
	public Mod() {}
	
	public Mod(String name, String version, String newVersion, Boolean installed, Boolean activated, Set<String> downloadUrls) {
		super();
		this.name = name;
		this.version = version;
		this.installed = installed;
		this.activated = activated;
		this.downloadUrls = downloadUrls;
	}

	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getVersion() {
		return version;
	}
	
	public void setVersion(String version) {
		this.version = version;
	}
	
	public Boolean getInstalled() {
		return installed;
	}

	public void setInstalled(Boolean installed) {
		this.installed = installed;
	}

	public String getNewVersion() {
		return newVersion;
	}

	public void setNewVersion(String newVersion) {
		this.newVersion = newVersion;
	}

	public Boolean getActivated() {
		return activated;
	}

	public void setActivated(Boolean activated) {
		this.activated = activated;
	}

	public ExecuteType getExecuteType() {
		return executeType;
	}

	public void setExecuteType(ExecuteType executeType) {
		this.executeType = executeType;
	}
	
	public String getExecutablePath() {
		return executablePath;
	}

	public void setExecutablePath(String executablePath) {
		this.executablePath = executablePath;
	}

	public Set<String> getDownloadUrls() {
		return downloadUrls;
	}

	public void setDownloadUrls(Set<String> downloadUrls) {
		this.downloadUrls = downloadUrls;
	}
	
}
