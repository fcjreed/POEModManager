import { Injectable } from '@angular/core';
import { Mod } from '../model/mod';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class DataService {

	private mods: Array<Mod>;
	observableMods: BehaviorSubject<Mod[]>;

	constructor() {
		this.observableMods = new BehaviorSubject<Mod[]>(this.mods);
	}

	private addMod(mod) {
		let newMod = new Mod(mod.name, mod.version, 
			mod.installed, mod.newVersion, mod.activated, 
			mod.executeType, mod.executablePath, mod.downloadUrls);
		if (this.mods && this.mods.indexOf(newMod) == -1) {
			this.mods.push(newMod);
		}
		else {
			this.mods = [];
			this.mods.push(newMod);
		}
	}

	addAll(mods) {
		for (let mod of mods) {
			this.addMod(mod);
		}
		console.log("Calling mods changed");
		this.modsChanged();
	}

	getObservable() {
		return this.observableMods;
	}

	loadToBrowser() {
		localStorage.setItem('mods', JSON.stringify(this.mods));
	}

	modsChanged() {
		this.observableMods.next(this.mods);
		this.loadToBrowser();
	}

	getModByName(name) {
		return this.mods.filter(mod => mod.name === name);
	}

	getModByInstalled(installed): Array<Mod> {
		let test = this.mods.filter(mod => {
			return mod.installed == installed;
		});
		return test;
	}

	private updateMod(mod) {
		this.mods[this.mods.findIndex(({name}) => name === mod.name)] = mod;
		console.log("UPDATED MODS");
		console.log(this.mods);
	}

	updateMods(mods) {
		for (let mod of mods) {
			this.updateMod(mod);
		}
		this.modsChanged();
	}

}
