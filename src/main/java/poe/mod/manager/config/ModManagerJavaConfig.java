package poe.mod.manager.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import poe.mod.manager.properties.GitHubRepos;

@Configuration
@ComponentScan("poe.mod.manager.controller")
public class ModManagerJavaConfig {

	@ConfigurationProperties(prefix = "github.mod")
	@Bean
	public GitHubRepos gitHubRepos() {
		return new GitHubRepos();
	}
	
}
