package poe.mod.manager.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

import poe.mod.manager.config.ModManagerJavaConfig;

@SpringBootApplication
@Import(ModManagerJavaConfig.class)
public class ModManagerMain {

	public static void main(String...args) {
		SpringApplication.run(ModManagerMain.class, args);
	}
	
}
