package poe.mod.manager.util;

public class ModManagerConstants {

	public static final String INSTALL_FOLDER = System.getProperty("user.home") + "/AppData/Local/POEModManager";
	public static final int BUFFER_SIZE = 4096;
	public static final String VERSION_REGEX = "[^0-9\\.]";
	public static final String MOD_FILE = "mod.json";
	public static final String TOKEN_COOKIE = "x-mod-manager-token";
	public static final int TOKEN_AGE = 604800;
	
}
