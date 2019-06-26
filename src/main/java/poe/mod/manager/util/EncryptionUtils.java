package poe.mod.manager.util;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;

import javax.annotation.PostConstruct;

import com.google.crypto.tink.Aead;
import com.google.crypto.tink.CleartextKeysetHandle;
import com.google.crypto.tink.JsonKeysetReader;
import com.google.crypto.tink.KeysetHandle;
import com.google.crypto.tink.aead.AeadConfig;
import com.google.crypto.tink.aead.AeadFactory;
import com.google.crypto.tink.aead.AeadKeyTemplates;

public class EncryptionUtils {

	@PostConstruct
	public void init() throws GeneralSecurityException {
		AeadConfig.register();
	}
	
	// One time use
	public static String encrypt(String input) throws GeneralSecurityException, IOException {
		KeysetHandle handle = KeysetHandle.generateNew(AeadKeyTemplates.AES256_GCM);
		Aead aead = AeadFactory.getPrimitive(handle);
		byte[] data = input.getBytes(StandardCharsets.UTF_8);
		byte[] encrypted = aead.encrypt(data, new byte[0]);
		return new String(encrypted);
	}
	
	public static String decrypt(String input) throws GeneralSecurityException, IOException {
		KeysetHandle handle = CleartextKeysetHandle.read(JsonKeysetReader.withString(input));
		Aead aead = AeadFactory.getPrimitive(handle);
		byte[] data = input.getBytes(StandardCharsets.UTF_8);
		byte[] encrypted = aead.decrypt(data, new byte[0]);
		return new String(encrypted);
	}
	
}
