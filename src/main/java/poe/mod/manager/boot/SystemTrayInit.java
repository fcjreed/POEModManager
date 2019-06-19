package poe.mod.manager.boot;

import java.awt.Desktop;
import java.awt.Image;
import java.awt.MenuItem;
import java.awt.PopupMenu;
import java.awt.SystemTray;
import java.awt.Toolkit;
import java.awt.TrayIcon;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.net.URI;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class SystemTrayInit implements ApplicationListener<ApplicationReadyEvent> {

	private PopupMenu popup;
	private TrayIcon trayIcon;
	private SystemTray tray;
	private MenuItem launchApp;
	private MenuItem exit;
	@Value("${server.port}")
	private int serverPort;
	
	public void initTrayIcon() {
		if (SystemTray.isSupported()) {
			popup = new PopupMenu();
			trayIcon = new TrayIcon(Toolkit.getDefaultToolkit().getImage("icon.gif"));
			tray = SystemTray.getSystemTray();
			launchApp = new MenuItem("Goto Mod Manager");
			exit = new MenuItem("Exit");
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
						Desktop.getDesktop().browse(new URI("http://localhost:" + serverPort));
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
	
	public SystemTrayInit() {}

	@Override
	public void onApplicationEvent(ApplicationReadyEvent event) {
		initTrayIcon();
	}
	
}
