import { Component} from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'available-tab',
  templateUrl: './modtab.available.html'
})
export class ModTabAvailableComponent {

	public hasAvailable: boolean;
	dataAvailable: Promise<boolean>;
	mods = [];

	constructor(private http: HttpClient, private dataService: DataService) {}


	ngOnInit() {
		this.dataService.getObservable().subscribe( newVal => {
			if (newVal) {
				this.mods = this.dataService.getModByInstalled(false);
				this.hasAvailable = this.mods.length > 0;
				this.dataAvailable = Promise.resolve(true);
			}
		});
	}

	installMod(mod) {
		this.http.post('/installMod', mod).subscribe(resp => this.handleInstallResponse(resp));
	}

	handleInstallResponse(resp) {
		if (resp) {
			this.dataService.updateMods([resp]);
		}
	}

}