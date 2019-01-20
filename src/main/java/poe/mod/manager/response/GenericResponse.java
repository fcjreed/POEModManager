package poe.mod.manager.response;

public class GenericResponse {

	private int status = 0;
	private String errorMessage;
	
	public GenericResponse() {}
	
	public GenericResponse(int status, String errorMessage) {
		this.status = status;
		this.errorMessage = errorMessage;
	}
	
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	
}
