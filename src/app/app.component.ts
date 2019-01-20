import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
	public isShowingRouteLoadIndicator: boolean;
	constructor(private http: HttpClient, private router: Router) {
		this.isShowingRouteLoadIndicator = true;
	}

	ngOnInit() {
		this.http.post("/verifyAccess", {}, httpOptions).subscribe( data => this.validateResponse(data));
	}

	validateResponse(response) {
		this.isShowingRouteLoadIndicator = false;
		if (response.status != 0) {
			this.router.navigate(["login"]);
		}
		else {
			this.router.navigate(["modtab"]);
		}
	}
}
