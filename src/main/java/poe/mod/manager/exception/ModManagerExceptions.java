package poe.mod.manager.exception;

public enum ModManagerExceptions {
	MISSING_TOKEN("Missing token.", 400),
	INVALID_TOKEN("Invalid token.", 403),
	MISSING_TEMP_FOLDER("Missing temp folder. How?..", 500);

	private int statusCode;
	private String description;
	
	private ModManagerExceptions(String description, int statusCode) {
		this.statusCode = statusCode;
		this.description = description;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
}
