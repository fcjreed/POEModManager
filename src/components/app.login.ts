import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-login',
  templateUrl: './app.login.html',
  styles: []
})
export class LoginComponent {

	model = { "gtoken" : "", "error": false };

	constructor(private http: HttpClient, private router: Router) { }

	onLogin() {
		this.http.post("/verifyAccess", { "token" : this.model.gtoken }, httpOptions).subscribe( data => this.verifyLogin(data));
	}

	verifyLogin(response) {
		if (response.status != 0) {
			this.model.error = true;
		}
		else {
			this.router.navigateByUrl('/modtab');
		}
			
	}

}
