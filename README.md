# POE Mod Manager

## How do I use this?

Once you run the jar you downloaded in release, you can either go to `http://localhost:55544` in your browser 
or you can right click the icon in the system tray and click `Goto Mod Manager`.

If you want to close the program, just right click the icon in the system tray and click `Exit`.

## DRC (Didn't read code)

The code requires a github private access token in order to access the github API. This is used for OAuth and to get past the request limitation.

It builds a working model of all the available mods and stores it in browser localStorage to limit networking. 

There's no internal request limiting so unless you want to use up your daily requests, don't spam click buttons.

Most of the information required by the application is only required one time. If you moved your installation folders then for now if you wanted to update the URLs, you need clear the `poePath` and/or `ahkPath` objects in localStorage.


## Development server

You should be able to just run `mvn install` and it should pull in node, npm, and any npm modules. 

You can run `ng build --watch` to do constant building that will automatically be picked up by spring.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## TODO

- Loading animation for installation
- Allow users to change path locations