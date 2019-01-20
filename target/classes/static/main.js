(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron text-center\">\n\t<h1>Path of Exile Mod Manager</h1>\n</div>\n<router-outlet></router-outlet>\n<div\n    *ngIf=\"isShowingRouteLoadIndicator\"\n    class=\"router-load-indicator\">\n    Loading Module\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({ 'Content-Type': 'application/json' })
};
var AppComponent = /** @class */ (function () {
    function AppComponent(http, router) {
        this.http = http;
        this.router = router;
        this.isShowingRouteLoadIndicator = true;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.post("/verifyAccess", {}, httpOptions).subscribe(function (data) { return _this.validateResponse(data); });
    };
    AppComponent.prototype.validateResponse = function (response) {
        this.isShowingRouteLoadIndicator = false;
        if (response.status != 0) {
            this.router.navigate(["login"]);
        }
        else {
            this.router.navigate(["modtab"]);
        }
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_app_login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/app.login */ "./src/components/app.login.ts");
/* harmony import */ var _components_app_modtab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/app.modtab */ "./src/components/app.modtab.ts");
/* harmony import */ var _components_modtab_installed__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/modtab.installed */ "./src/components/modtab.installed.ts");
/* harmony import */ var _components_modtab_available__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/modtab.available */ "./src/components/modtab.available.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/data.service */ "./src/services/data.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");












var routes = [
    { path: '', component: _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"] },
    { path: 'login', component: _components_app_login__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"] },
    { path: 'modtab',
        component: _components_app_modtab__WEBPACK_IMPORTED_MODULE_5__["ModTabComponent"],
        children: [
            { path: '', component: _components_modtab_installed__WEBPACK_IMPORTED_MODULE_6__["ModTabInstalledComponent"] },
            { path: 'modAvailable', component: _components_modtab_available__WEBPACK_IMPORTED_MODULE_7__["ModTabAvailableComponent"] }
        ]
    }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _components_app_login__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"],
                _components_app_modtab__WEBPACK_IMPORTED_MODULE_5__["ModTabComponent"],
                _components_modtab_installed__WEBPACK_IMPORTED_MODULE_6__["ModTabInstalledComponent"],
                _components_modtab_available__WEBPACK_IMPORTED_MODULE_7__["ModTabAvailableComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_10__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"].forRoot(routes)
            ],
            providers: [_services_data_service__WEBPACK_IMPORTED_MODULE_9__["DataService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/components/app.login.html":
/*!***************************************!*\
  !*** ./src/components/app.login.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n\t<div class=\"row\">\n    <div class=\"col\">\n      <h3 class=\"text-center mb-5\">Please enter your Github private access token.</h3>\n      <div id=\"loginForm\" class=\"form-group\">\n        <input type=\"text\" class=\"form-control form-control-sm\" placeholder=\"Github Access Token\" required minlength=\"38\" [(ngModel)]=\"model.gtoken\" id=\"gtoken\" #login=\"ngModel\">\n      </div>\n      <button type=\"button\" id=\"login\" class=\"btn mx-auto w-50 btn-info btn-block\" [disabled]=\"login.invalid\" (click)=\"onLogin()\">Login</button>\n    </div>\n  </div>\n\t<div [ngModel]=\"model\" *ngIf=\"model.error\" class=\"toast\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\">\n    <div class=\"toast-header\">\n      <div class=\"alert alert-danger\"></div>\n      <strong class=\"mr-auto\">Error</strong>\n      <button type=\"button\" class=\"ml-2 mb-1 close\" data-dismiss=\"toast\" aria-label=\"Close\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"toast-body\">\n      Invalid token.\n    </div>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./src/components/app.login.ts":
/*!*************************************!*\
  !*** ./src/components/app.login.ts ***!
  \*************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({ 'Content-Type': 'application/json' })
};
var LoginComponent = /** @class */ (function () {
    function LoginComponent(http, router) {
        this.http = http;
        this.router = router;
        this.model = { "gtoken": "", "error": false };
    }
    LoginComponent.prototype.onLogin = function () {
        var _this = this;
        this.http.post("/verifyAccess", { "token": this.model.gtoken }, httpOptions).subscribe(function (data) { return _this.verifyLogin(data); });
    };
    LoginComponent.prototype.verifyLogin = function (response) {
        if (response.status != 0) {
            this.model.error = true;
        }
        else {
            this.router.navigateByUrl('/modtab');
        }
    };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./app.login.html */ "./src/components/app.login.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/components/app.modtab.html":
/*!****************************************!*\
  !*** ./src/components/app.modtab.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n\t<ul class=\"nav nav-pills\">\n\t\t<li class=\"nav-item\">\n\t\t\t<a id=\"install\" class=\"nav-link\" [ngClass]=\"{'active': this.installToggle }\" (click)=\"navClick($event)\" [routerLink]=\"['/modtab']\">Installed</a>\n\t\t</li>\n\t\t<li class=\"nav-item\">\n    \t\t\t<a id=\"available\" class=\"nav-link\" [ngClass]=\"{'active': this.availableToggle }\" (click)=\"navClick($event)\" [routerLink]=\"['/modtab/modAvailable']\">Available</a>\n  \t\t</li>\n\t</ul>\n\t<div class=\"inner-outlet\">\n\t\t<router-outlet></router-outlet>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./src/components/app.modtab.ts":
/*!**************************************!*\
  !*** ./src/components/app.modtab.ts ***!
  \**************************************/
/*! exports provided: ModTabComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModTabComponent", function() { return ModTabComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/data.service */ "./src/services/data.service.ts");




var ModTabComponent = /** @class */ (function () {
    function ModTabComponent(http, dataService) {
        this.http = http;
        this.dataService = dataService;
        this.installToggle = true;
        this.availableToggle = false;
    }
    ModTabComponent.prototype.ngOnInit = function () {
        var _this = this;
        var mods = JSON.parse(localStorage.getItem('mods'));
        if (!mods) {
            this.http.get('/populateModData').subscribe(function (data) { return _this.populateData(data); });
        }
        else {
            this.populateData(mods);
        }
    };
    ModTabComponent.prototype.populateData = function (mods) {
        mods = mods.mods ? mods.mods : mods;
        if (mods) {
            this.dataService.addAll(mods);
        }
    };
    ModTabComponent.prototype.navClick = function (event) {
        if (event.target.id == 'install') {
            this.installToggle = true;
            this.availableToggle = false;
        }
        else {
            this.availableToggle = true;
            this.installToggle = false;
        }
    };
    ModTabComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-modtab',
            template: __webpack_require__(/*! ./app.modtab.html */ "./src/components/app.modtab.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _services_data_service__WEBPACK_IMPORTED_MODULE_3__["DataService"]])
    ], ModTabComponent);
    return ModTabComponent;
}());



/***/ }),

/***/ "./src/components/modtab.available.html":
/*!**********************************************!*\
  !*** ./src/components/modtab.available.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"dataAvailable | async\" class=\"container-fluid\">\r\n\t<table  class=\"table table-dark\">\r\n\t<thead>\r\n\t\t<tr>\r\n\t\t\t<th>Name</th>\r\n\t\t\t<th>Version</th>\r\n\t\t</tr>\r\n\t</thead>\r\n\t<tbody>\r\n\t\t<tr *ngFor=\"let mod of mods\">\r\n\t\t\t<td>{{mod.name}}</td>\r\n\t\t\t<td>{{mod.version}}</td>\r\n\t\t\t<td><button type=\"button\" id=\"installMod\" class=\"btn mx-auto btn-info btn-block\" (click)=\"installMod(mod)\">Install</button></td>\r\n\t\t</tr>\r\n\t</tbody>\r\n</table>"

/***/ }),

/***/ "./src/components/modtab.available.ts":
/*!********************************************!*\
  !*** ./src/components/modtab.available.ts ***!
  \********************************************/
/*! exports provided: ModTabAvailableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModTabAvailableComponent", function() { return ModTabAvailableComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/data.service */ "./src/services/data.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");




var ModTabAvailableComponent = /** @class */ (function () {
    function ModTabAvailableComponent(http, dataService) {
        this.http = http;
        this.dataService = dataService;
        this.mods = [];
    }
    ModTabAvailableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.getObservable().subscribe(function (newVal) {
            if (newVal) {
                _this.mods = _this.dataService.getModByInstalled(false);
                _this.hasAvailable = _this.mods.length > 0;
                _this.dataAvailable = Promise.resolve(true);
            }
        });
    };
    ModTabAvailableComponent.prototype.installMod = function (mod) {
        var _this = this;
        this.http.post('/installMod', mod).subscribe(function (resp) { return _this.handleInstallResponse(resp); });
    };
    ModTabAvailableComponent.prototype.handleInstallResponse = function (resp) {
        if (resp) {
            this.dataService.updateMods([resp]);
        }
    };
    ModTabAvailableComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'available-tab',
            template: __webpack_require__(/*! ./modtab.available.html */ "./src/components/modtab.available.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"], _services_data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"]])
    ], ModTabAvailableComponent);
    return ModTabAvailableComponent;
}());



/***/ }),

/***/ "./src/components/modtab.installed.html":
/*!**********************************************!*\
  !*** ./src/components/modtab.installed.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"dataAvailable | async\" class=\"container-fluid\">\r\n\t<div class=\"row\">\r\n\t\t<table class=\"table table-dark\">\r\n\t\t\t<thead>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<th>Name</th>\r\n\t\t\t\t\t<th>Version</th>\r\n\t\t\t\t\t<th>Activate</th>\r\n\t\t\t\t</tr>\r\n\t\t\t</thead>\r\n\t\t\t<tbody>\r\n\t\t\t\t<tr *ngFor=\"let mod of mods\">\r\n\t\t\t\t\t<td>{{mod.name}}</td>\r\n\t\t\t\t\t<td>{{mod.version}}</td>\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<form>\r\n  \t\t\t\t\t\t\t<div class=\"custom-control custom-checkbox\">\r\n    \t\t\t\t\t\t\t<input type=\"checkbox\" [checked]=\"mod.activated\" (change)=\"mod.activated = !mod.activated\" class=\"custom-control-input\" id=\"activate\">\r\n    \t\t\t\t\t\t\t<label class=\"custom-control-label\" for=\"activate\"></label>\r\n  \t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</form>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t<td *ngIf=\"mod.newVersion\"><button type=\"button\" id=\"updateMod\" class=\"btn mx-auto btn-info btn-block\" (click)=\"updateMod(mod)\">Install {{mod.newVersion}}</button></td>\r\n\t\t\t\t</tr>\r\n\t\t\t</tbody>\r\n\t\t</table>\r\n\t</div>\r\n\t<div *ngIf=\"mods.length > 0\" class=\"row\">\r\n\t\t<button type=\"button\" id=\"checkUpdates\" class=\"btn mx-auto w-50 btn-info btn-block\" (click)=\"checkUpdates()\">Check For Updates</button>\r\n\t</div>\r\n\t<div class=\"row mt-5\">\r\n\t\t<button type=\"button\" id=\"launchPoE\" class=\"btn mx-auto btn-info btn-block\" (click)=\"launchPoE()\">Launch Path of Exile</button>\r\n\t</div>\r\n\t<div class=\"modal\" id=\"preLaunch\">\r\n\t\t<div class=\"modal-dialog\">\r\n\t  \t\t<div class=\"modal-content\">\r\n\t\t    \t<div class=\"modal-header\">\r\n\t      \t\t\t<h4 class=\"modal-title\">Pre-Launch Details</h4>\r\n\t\t\t    </div>\r\n\t  \t\t    <div class=\"modal-body\">\r\n\t        \t\t<div class=\"form-group\">\r\n\t  \t\t\t\t\t<label for=\"poePath\">Path to executable</label>\r\n\t  \t\t\t\t\t<input type=\"text\" requried [(ngModel)]=\"this.poePath\"class=\"form-control\" id=\"poePath\" #installed=\"ngModel\">\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t  \t\t\t\t\t<label for=\"poeAHK\">Path to AHK</label>\r\n\t  \t\t\t\t\t<input type=\"text\" required [(ngModel)]=\"this.ahkPath\"class=\"form-control\" id=\"ahkPath\">\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"modal-footer\">\r\n\t\t\t\t\t\t\t<button type=\"submit\" id=\"launch\" class=\"btn mx-auto w-50 btn-info btn-block\" [disabled]=\"installed.invalid\" (click)=\"launchPoE()\">Launch</button>\r\n\t\t\t\t\t\t</div>\r\n\t      \t\t</div>\r\n\t  \t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<button type=\"button\" class=\"btn btn-primary\" id=\"modalButton\" [hidden]=\"true\" data-toggle=\"modal\" data-target=\"#preLaunch\">\r\n  \t\tOpen modal\r\n\t</button>\r\n</div>"

/***/ }),

/***/ "./src/components/modtab.installed.ts":
/*!********************************************!*\
  !*** ./src/components/modtab.installed.ts ***!
  \********************************************/
/*! exports provided: ModTabInstalledComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModTabInstalledComponent", function() { return ModTabInstalledComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/data.service */ "./src/services/data.service.ts");




var ModTabInstalledComponent = /** @class */ (function () {
    function ModTabInstalledComponent(http, dataService) {
        this.http = http;
        this.dataService = dataService;
        this.mods = [];
    }
    ModTabInstalledComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.getObservable().subscribe(function (newVal) {
            if (newVal) {
                _this.mods = _this.dataService.getModByInstalled(true);
                _this.hasInstalled = _this.mods.length > 0;
                _this.dataAvailable = Promise.resolve(true);
            }
        });
    };
    ModTabInstalledComponent.prototype.checkUpdates = function () {
        var _this = this;
        this.http.post("/checkUpdates", this.mods).subscribe(function (resp) {
            _this.handleCheckUpdates(resp);
        });
    };
    ModTabInstalledComponent.prototype.handleCheckUpdates = function (resp) {
        if (resp.status == 0) {
            this.dataService.updateMods(resp.mods);
            this.mods = resp.mods;
        }
    };
    ModTabInstalledComponent.prototype.launchPoE = function () {
        var _this = this;
        var poePath = localStorage.getItem('poePath');
        var ahkPath = localStorage.getItem('ahkPath');
        var actualPoe = poePath || this.poePath;
        var actualAhk = ahkPath || this.ahkPath;
        if (!actualPoe || !actualAhk) {
            var element = document.getElementById('modalButton');
            element.click();
        }
        else {
            localStorage.setItem('poePath', actualPoe);
            localStorage.setItem('ahkPath', actualAhk);
            var activatedMods = this.mods.filter(function (mod) {
                return mod.activated;
            });
            var request = {
                'poePath': actualPoe,
                'ahkPath': actualAhk,
                'activatedMods': activatedMods
            };
            if (activatedMods.length > 0) {
                this.dataService.updateMods(activatedMods);
            }
            this.http.post("/runGame", request).subscribe(function (data) {
                _this.handleLaunch(data);
            });
        }
    };
    ModTabInstalledComponent.prototype.handleLaunch = function (resp) {
    };
    ModTabInstalledComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'installed-tab',
            template: __webpack_require__(/*! ./modtab.installed.html */ "./src/components/modtab.installed.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _services_data_service__WEBPACK_IMPORTED_MODULE_3__["DataService"]])
    ], ModTabInstalledComponent);
    return ModTabInstalledComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ "./src/model/mod.ts":
/*!**************************!*\
  !*** ./src/model/mod.ts ***!
  \**************************/
/*! exports provided: Mod */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mod", function() { return Mod; });
var Mod = /** @class */ (function () {
    function Mod(name, version, installed, newVersion, activated, executeType, executablePath, downloadUrls) {
        this.name = name;
        this.version = version;
        this.installed = installed;
        this.newVersion = newVersion;
        this.activated = activated;
        this.executeType = executeType;
        this.executablePath = executablePath;
        this.downloadUrls = downloadUrls;
    }
    return Mod;
}());



/***/ }),

/***/ "./src/services/data.service.ts":
/*!**************************************!*\
  !*** ./src/services/data.service.ts ***!
  \**************************************/
/*! exports provided: DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return DataService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _model_mod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/mod */ "./src/model/mod.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");




var DataService = /** @class */ (function () {
    function DataService() {
        this.observableMods = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](this.mods);
    }
    DataService.prototype.addMod = function (mod) {
        var newMod = new _model_mod__WEBPACK_IMPORTED_MODULE_2__["Mod"](mod.name, mod.version, mod.installed, mod.newVersion, mod.activated, mod.executeType, mod.executablePath, mod.downloadUrls);
        if (this.mods && this.mods.indexOf(newMod) == -1) {
            this.mods.push(newMod);
        }
        else {
            this.mods = [];
            this.mods.push(newMod);
        }
    };
    DataService.prototype.addAll = function (mods) {
        for (var _i = 0, mods_1 = mods; _i < mods_1.length; _i++) {
            var mod = mods_1[_i];
            this.addMod(mod);
        }
        console.log("Calling mods changed");
        this.modsChanged();
    };
    DataService.prototype.getObservable = function () {
        return this.observableMods;
    };
    DataService.prototype.loadToBrowser = function () {
        localStorage.setItem('mods', JSON.stringify(this.mods));
    };
    DataService.prototype.modsChanged = function () {
        this.observableMods.next(this.mods);
        this.loadToBrowser();
    };
    DataService.prototype.getModByName = function (name) {
        return this.mods.filter(function (mod) { return mod.name === name; });
    };
    DataService.prototype.getModByInstalled = function (installed) {
        var test = this.mods.filter(function (mod) {
            return mod.installed == installed;
        });
        return test;
    };
    DataService.prototype.updateMod = function (mod) {
        this.mods[this.mods.findIndex(function (_a) {
            var name = _a.name;
            return name === mod.name;
        })] = mod;
        console.log("UPDATED MODS");
        console.log(this.mods);
    };
    DataService.prototype.updateMods = function (mods) {
        for (var _i = 0, mods_2 = mods; _i < mods_2.length; _i++) {
            var mod = mods_2[_i];
            this.updateMod(mod);
        }
        this.modsChanged();
    };
    DataService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DataService);
    return DataService;
}());



/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\chron\ModManager\poe-mod-manager\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map