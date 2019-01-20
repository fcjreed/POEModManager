import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-modtab',
  templateUrl: './app.modtab.html',
  styles: []
})
export class ModTabComponent {

	private installToggle: boolean = true;
	private availableToggle: boolean = false;


	constructor(private http: HttpClient, private dataService: DataService) {}

	ngOnInit() {
		let mods = JSON.parse(localStorage.getItem('mods'));
		if (!mods) {
			this.http.get('/populateModData').subscribe(data => this.populateData(data));
		}
		else {
			this.populateData(mods);
		}
	}

	populateData(mods) {
		mods = mods.mods ? mods.mods : mods
		if (mods) {
			this.dataService.addAll(mods);
		}
	}

	navClick(event) {
		if (event.target.id == 'install') {
			this.installToggle = true;
			this.availableToggle = false;
		}
		else {
			this.availableToggle = true;
			this.installToggle = false;
		}
	}

}
