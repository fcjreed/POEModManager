package poe.mod.manager.util;

public class ModManagerConstants {

	public static final String INSTALL_FOLDER = System.getProperty("user.home") + "/AppData/Local/POEModManager";
	public static final int BUFFER_SIZE = 4096;
	public static final String VERSION_REGEX = "[^0-9\\.]";
	public static final String MOD_FILE = "mod.json";
	public static final String MOD_DETAIL_FOLDER = "modmanagerdata";
	public static final String MOD_DETAIL_FILE = "details.tmp";
	public static final String MOD_DETAILS = MOD_DETAIL_FOLDER + "/" + MOD_DETAIL_FILE;
	
}
