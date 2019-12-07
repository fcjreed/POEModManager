package poe.mod.manager.util;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import com.amazonaws.util.Base64;
import com.google.crypto.tink.Aead;
import com.google.crypto.tink.CleartextKeysetHandle;
import com.google.crypto.tink.JsonKeysetReader;
import com.google.crypto.tink.JsonKeysetWriter;
import com.google.crypto.tink.KeysetHandle;
import com.google.crypto.tink.aead.AeadFactory;
import com.google.crypto.tink.aead.AeadKeyTemplates;

@Service
public class EncryptionService {

	private static final String FILE_LOC = "/sm.dat";
	private KeysetHandle handle;
	
	@PostConstruct
	public void init() {
		try {
			File check = new File(ModManagerConstants.INSTALL_FOLDER + FILE_LOC);
			if (!check.exists()) {
				handle = KeysetHandle.generateNew(AeadKeyTemplates.AES128_GCM);
				CleartextKeysetHandle.write(handle, JsonKeysetWriter.withFile(check));
			} else {
				handle = CleartextKeysetHandle.read(JsonKeysetReader.withFile(check));
			}
		} catch (GeneralSecurityException | IOException e) {
			e.printStackTrace();
		}
	}
	
	public String encrypt(String input) throws GeneralSecurityException, IOException {
		Aead aead = AeadFactory.getPrimitive(handle);
		byte[] data = input.getBytes(StandardCharsets.UTF_8);
		byte[] encrypted = aead.encrypt(data, new byte[0]);
		return new String(Base64.encode(encrypted), StandardCharsets.UTF_8);
	}
	
	public String decrypt(String input) throws GeneralSecurityException, IOException {
		Aead aead = AeadFactory.getPrimitive(handle);
		byte[] data = Base64.decode(input);
		byte[] encrypted = aead.decrypt(data, new byte[0]);
		return new String(encrypted, StandardCharsets.UTF_8);
	}
	
}
