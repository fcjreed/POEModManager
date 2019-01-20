import { Component } from '@angular/core';
import { Observable } from 'rxjs/';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';

@Component({
  selector: 'installed-tab',
  templateUrl: './modtab.installed.html'
})
export class ModTabInstalledComponent {

	dataAvailable: Promise<boolean>;
	public hasInstalled: boolean;
	poePath: string;
	ahkPath: string;
	mods = [];

	constructor(private http: HttpClient, private dataService: DataService) {}


	ngOnInit() {
		this.dataService.getObservable().subscribe( newVal => {
			if (newVal) {
				this.mods = this.dataService.getModByInstalled(true);
				this.hasInstalled = this.mods.length > 0;
				this.dataAvailable = Promise.resolve(true);
			}
		});
	}

	checkUpdates() {
		this.http.post("/checkUpdates", this.mods).subscribe(resp => {
			this.handleCheckUpdates(resp);
		});
	}

	handleCheckUpdates(resp) {
		if (resp.status == 0) {
			this.dataService.updateMods(resp.mods);
			this.mods = resp.mods;
		}
	}

	launchPoE() {
		let poePath = localStorage.getItem('poePath');
		let ahkPath = localStorage.getItem('ahkPath');
		let actualPoe = poePath || this.poePath;
		let actualAhk = ahkPath || this.ahkPath;
		if (!actualPoe || !actualAhk) {
			let element = document.getElementById('modalButton') as HTMLElement;
			element.click();
		}
		else {
			localStorage.setItem('poePath', actualPoe);
			localStorage.setItem('ahkPath', actualAhk);
			let activatedMods = this.mods.filter(mod => {
				return mod.activated;
			});
			let request = {
				'poePath' : actualPoe,
				'ahkPath' : actualAhk,
				'activatedMods' : activatedMods
			};
			if (activatedMods.length > 0){
				this.dataService.updateMods(activatedMods);
			} 
			this.http.post("/runGame", request).subscribe(data => {
				this.handleLaunch(data);
			});
		}
	}

	handleLaunch(resp) {

	}

}