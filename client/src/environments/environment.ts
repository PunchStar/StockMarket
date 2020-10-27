// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	isMockEnabled: true, // You have to switch this, when your real back-end is done
	authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
	authURL:'',
	firebaseConfig:{
		apiKey: "AIzaSyAeyzKpG53K32YrGeHsSNq_18NuzFXY09g",
		authDomain: "stock-27c73.firebaseapp.com",
		databaseURL: "https://stock-27c73.firebaseio.com",
		projectId: "stock-27c73",
		storageBucket: "stock-27c73.appspot.com",
		messagingSenderId: "654930247486",
		appId: "1:654930247486:web:674c30f562dd8ce350366f",
		measurementId: "G-Y1DST03Q61"
	  }
};
/*
	authURL:'http://localhost:5000/',

 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
