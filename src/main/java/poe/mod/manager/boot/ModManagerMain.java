package poe.mod.manager.boot;

import java.awt.Desktop;
import java.awt.MenuItem;
import java.awt.PopupMenu;
import java.awt.SystemTray;
import java.awt.Toolkit;
import java.awt.TrayIcon;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

import poe.mod.manager.config.ModManagerJavaConfig;

@SpringBootApplication
@Import(ModManagerJavaConfig.class)
public class ModManagerMain {
	
	private static final PopupMenu popup = new PopupMenu();
	private static final TrayIcon trayIcon = new TrayIcon(Toolkit.getDefaultToolkit().getImage(System.getProperty("user.dir") + "\\src\\images\\icon.gif"));
	private static final SystemTray tray = SystemTray.getSystemTray();
	private static final MenuItem launchApp = new MenuItem("Goto Mod Manager");
	private static final MenuItem exit = new MenuItem("Exit");

	public static void main(String...args) {
		SpringApplication.run(ModManagerMain.class, args);
		initSysTray();
	}
	
	public static void initSysTray() {
		if (SystemTray.isSupported()) {
			exit.addActionListener(new ActionListener() {
				@Override
				public void actionPerformed(ActionEvent e) {
					tray.remove(trayIcon);
					System.exit(0);
				}
			});
			launchApp.addActionListener(new ActionListener() {
				@Override
				public void actionPerformed(ActionEvent e) {
					try {
						Desktop.getDesktop().browse(new URI("http://localhost:8080"));
					} catch (Exception e1) {
						e1.printStackTrace();
					}
				}
			});
			popup.add(launchApp);
			popup.addSeparator();
			popup.add(exit);
			trayIcon.setPopupMenu(popup);
			try {
				trayIcon.setImageAutoSize(true);
				tray.add(trayIcon);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
}
