package poe.mod.manager.config;

import java.security.GeneralSecurityException;

import javax.annotation.PostConstruct;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import com.google.crypto.tink.aead.AeadConfig;

import poe.mod.manager.properties.GitHubRepos;
import poe.mod.manager.util.EncryptionService;

@Configuration
@ComponentScan("poe.mod.manager.controller")
public class ModManagerJavaConfig {

	@ConfigurationProperties(prefix = "github.mod")
	@Bean
	public GitHubRepos gitHubRepos() {
		return new GitHubRepos();
	}
	
	@Bean
	public EncryptionService encryptionService() {
		return new EncryptionService();
	}
	
	@PostConstruct
	public void init() throws GeneralSecurityException {
		AeadConfig.register();
	}
	
}
