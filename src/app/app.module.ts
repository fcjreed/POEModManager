import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from '../components/app.login';
import { ModTabComponent } from '../components/app.modtab';
import { ModTabInstalledComponent } from '../components/modtab.installed';
import { ModTabAvailableComponent } from '../components/modtab.available';
import { RouterModule, Routes } from "@angular/router";
import { DataService } from '../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


const routes = [
	{ path: '', component: AppComponent },
	{ path: 'login', component: LoginComponent },
  { path: 'modtab', 
    component: ModTabComponent,
    children: [
      { path: '', component: ModTabInstalledComponent },
      { path: 'modAvailable', component: ModTabAvailableComponent }
    ]
  }
]

@NgModule({
  declarations: [
  	AppComponent,
	  LoginComponent,
    ModTabComponent,
    ModTabInstalledComponent,
    ModTabAvailableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
