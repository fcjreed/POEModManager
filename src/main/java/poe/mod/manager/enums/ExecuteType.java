package poe.mod.manager.enums;

public enum ExecuteType {
	EXE(".exe"),
	AHK(".ahk");
	
	private String extension;
	
	private ExecuteType(String extension) {
		this.extension = extension;
	}
	
	public String getType() {
		return this.extension;
	}
	
	public static ExecuteType determineType(String file) {
		ExecuteType val = null;
		for (ExecuteType type : ExecuteType.values()) {
			if (file.contains(type.getType()))
				return type;
		}
		return val;
	}
	
}
