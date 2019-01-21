package poe.mod.manager.boot;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Import;

import poe.mod.manager.config.ModManagerJavaConfig;

@SpringBootApplication
@Import(ModManagerJavaConfig.class)
public class ModManagerMain {

	public static void main(String...args) {
		SpringApplicationBuilder builder = new SpringApplicationBuilder(ModManagerMain.class);
		builder.headless(false).run(args);
	}
	
}
