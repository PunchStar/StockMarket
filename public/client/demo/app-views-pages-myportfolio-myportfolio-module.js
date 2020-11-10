(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-views-pages-myportfolio-myportfolio-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/views/pages/myportfolio/myportfolio.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/views/pages/myportfolio/myportfolio.component.html ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\"  *ngIf=\"user$ | async as _user\">\r\n\t<div class=\"col-xl-12\">\r\n\t\t<kt-portlet [class]=\"'kt-portlet--height-fluid'\">\r\n\t\t\t<kt-portlet-header [title]=\"'MY PORTFOLIO'\" style=\"color: white;\">\r\n\t\t\t\t\r\n\t\t\t</kt-portlet-header>\r\n\t\t\t<kt-portlet-body>\r\n\t\t\t\t\t<kt-widget1  [userId]=\"_user._id\"></kt-widget1>\r\n\t\t\t</kt-portlet-body>\r\n\t\t</kt-portlet>\r\n\t</div>\r\n\r\n\r\n</div> \r\n\r\n<div class=\"row\">\r\n\t<div class=\"col-xl-5 col-sm-4\"></div>\r\n\t<div class=\"col-xl-2 col-sm-4\">\r\n\t\t<a [routerLink]=\"['/dashboard']\" class=\"btn btn-outline-primary btn-elevate kt-login__btn-primary\" style=\"width: 100%\">Return to Dashboard</a>\r\n\t</div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/pages/myportfolio/myportfolio.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/views/pages/myportfolio/myportfolio.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host ::ng-deep ngb-tabset > .nav-tabs {\n  display: none; }\n\n.example-container {\n  display: flex;\n  flex-direction: column;\n  min-width: 300px; }\n\n.example-header {\n  min-height: 64px;\n  padding: 8px 24px 0; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\n.mat-table {\n  overflow: auto;\n  max-height: 500px; }\n\n.mat-tab-body-content {\n  padding-top: 0px !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Wb2x1bWVzL0RBVEEyL1N0b2NrL2Zyb250ZW5kL3NyYy9hcHAvdmlld3MvcGFnZXMvbXlwb3J0Zm9saW8vbXlwb3J0Zm9saW8uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFHRyxhQUFhLEVBQUE7O0FBSWhCO0VBQ0MsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixnQkFBZ0IsRUFBQTs7QUFFZjtFQUNELGdCQUFnQjtFQUNoQixtQkFBbUIsRUFBQTs7QUFFbEI7RUFDRCxlQUFlO0VBQ2YsV0FBVyxFQUFBOztBQUVWO0VBQ0QsY0FBYztFQUNkLGlCQUFpQixFQUFBOztBQUVoQjtFQUNDLDJCQUEwQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvdmlld3MvcGFnZXMvbXlwb3J0Zm9saW8vbXlwb3J0Zm9saW8uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcblx0OjpuZy1kZWVwIHtcclxuXHRcdG5nYi10YWJzZXQgPiAubmF2LXRhYnMge1xyXG5cdFx0XHRkaXNwbGF5OiBub25lO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4uZXhhbXBsZS1jb250YWluZXIge1xyXG5cdGRpc3BsYXk6IGZsZXg7XHJcblx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHRtaW4td2lkdGg6IDMwMHB4O1xyXG4gIH1cclxuICAuZXhhbXBsZS1oZWFkZXIge1xyXG5cdG1pbi1oZWlnaHQ6IDY0cHg7XHJcblx0cGFkZGluZzogOHB4IDI0cHggMDtcclxuICB9XHJcbiAgLm1hdC1mb3JtLWZpZWxkIHtcclxuXHRmb250LXNpemU6IDE0cHg7XHJcblx0d2lkdGg6IDEwMCU7XHJcbiAgfVxyXG4gIC5tYXQtdGFibGUge1xyXG5cdG92ZXJmbG93OiBhdXRvO1xyXG5cdG1heC1oZWlnaHQ6IDUwMHB4O1xyXG4gIH1cclxuICAubWF0LXRhYi1ib2R5LWNvbnRlbnR7XHJcblx0ICBwYWRkaW5nLXRvcDogMHB4IWltcG9ydGFudDtcclxuICB9Il19 */"

/***/ }),

/***/ "./src/app/views/pages/myportfolio/myportfolio.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/views/pages/myportfolio/myportfolio.component.ts ***!
  \******************************************************************/
/*! exports provided: MyportfolioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyportfolioComponent", function() { return MyportfolioComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _core_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core/auth */ "./src/app/core/auth/index.ts");
/* harmony import */ var _core_base_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../core/_base/layout */ "./src/app/core/_base/layout/index.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");

// Angular

// Lodash

// NGRX



// import { Widget4Data } from '../../partials/content/widgets/widget4/widget4.component';

var MyportfolioComponent = /** @class */ (function () {
    function MyportfolioComponent(layoutConfigService, dataservice, store) {
        this.layoutConfigService = layoutConfigService;
        this.dataservice = dataservice;
        this.store = store;
        // displayedColumns = ['id', 'name', 'progress', 'color'];
        this.displayedColumns = ['id', 'name', 'price', 'change'];
        // widget4_1: Widget4Data;
        // widget4_2: Widget4Data;
        // widget4_3: Widget4Data;
        // widget4_4: Widget4Data;
        this.ftseArr = [];
        // for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }
        //  dataservice.getJSON().subscribe((res)=>{
        // 	const users: UserData[] = [];
        // 	const dataTemp = res;
        // 	var tempArr = [];
        // 	tempArr =  dataTemp['feed']['entry'];
        // 	// tempArr = tempArr.slice(0,100);
        // 	this.ftseArr = [];
        // 	var i = 1;
        // 	tempArr.forEach((element) => {
        // 		var tempStr:String = element.content.$t
        // 		var tempStrArr = tempStr.split(',');
        // 		this.ftseArr.push({
        // 			name: tempStrArr[0].slice(6),
        // 			price: tempStrArr[1].slice(8),
        // 			change: tempStrArr[2].slice(9),
        // 		});
        // 		users.push(createNewUser(i,tempStrArr[0].slice(6),tempStrArr[1].slice(8) , tempStrArr[2].slice(9)));
        // 		i ++;
        // 	})
        // 	this.dataSource = new MatTableDataSource(users);
        // });
    }
    MyportfolioComponent.prototype.ngOnInit = function () {
        this.user$ = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["select"])(_core_auth__WEBPACK_IMPORTED_MODULE_4__["currentUser"]));
        this.chartOptions1 = {
            data: [10, 14, 18, 11, 9, 12, 14, 17, 18, 14],
            color: this.layoutConfigService.getConfig('colors.state.brand'),
            border: 3
        };
        this.chartOptions2 = {
            data: [11, 12, 18, 13, 11, 12, 15, 13, 19, 15],
            color: this.layoutConfigService.getConfig('colors.state.danger'),
            border: 3
        };
        this.chartOptions3 = {
            data: [12, 12, 18, 11, 15, 12, 13, 16, 11, 18],
            color: this.layoutConfigService.getConfig('colors.state.success'),
            border: 3
        };
        this.chartOptions4 = {
            data: [11, 9, 13, 18, 13, 15, 14, 13, 18, 15],
            color: this.layoutConfigService.getConfig('colors.state.primary'),
            border: 3
        };
        // @ts-ignore
        this.widget4_1 = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["shuffle"])([
            {
                pic: './assets/media/files/doc.svg',
                title: 'Metronic Documentation',
                url: 'https://keenthemes.com.my/metronic',
            }, {
                pic: './assets/media/files/jpg.svg',
                title: 'Project Launch Evgent',
                url: 'https://keenthemes.com.my/metronic',
            }, {
                pic: './assets/media/files/pdf.svg',
                title: 'Full Developer Manual For 4.7',
                url: 'https://keenthemes.com.my/metronic',
            }, {
                pic: './assets/media/files/javascript.svg',
                title: 'Make JS Development',
                url: 'https://keenthemes.com.my/metronic',
            }, {
                pic: './assets/media/files/zip.svg',
                title: 'Download Ziped version OF 5.0',
                url: 'https://keenthemes.com.my/metronic',
            }, {
                pic: './assets/media/files/pdf.svg',
                title: 'Finance Report 2016/2017',
                url: 'https://keenthemes.com.my/metronic',
            },
        ]);
        // @ts-ignore
        this.widget4_2 = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["shuffle"])([
            {
                pic: './assets/media/users/100_4.jpg',
                username: 'Anna Strong',
                desc: 'Visual Designer,Google Inc.',
                url: 'https://keenthemes.com.my/metronic',
                buttonClass: 'btn-label-brand'
            }, {
                pic: './assets/media/users/100_14.jpg',
                username: 'Milano Esco',
                desc: 'Product Designer, Apple Inc.',
                url: 'https://keenthemes.com.my/metronic',
                buttonClass: 'btn-label-warning'
            }, {
                pic: './assets/media/users/100_11.jpg',
                username: 'Nick Bold',
                desc: 'Web Developer, Facebook Inc.',
                url: 'https://keenthemes.com.my/metronic',
                buttonClass: 'btn-label-danger'
            }, {
                pic: './assets/media/users/100_1.jpg',
                username: 'Wilter Delton',
                desc: 'Project Manager, Amazon Inc.',
                url: 'https://keenthemes.com.my/metronic',
                buttonClass: 'btn-label-success'
            }, {
                pic: './assets/media/users/100_5.jpg',
                username: 'Nick Stone',
                desc: 'Visual Designer, Github Inc.',
                url: 'https://keenthemes.com.my/metronic',
                buttonClass: 'btn-label-dark'
            },
        ]);
        // @ts-ignore
        this.widget4_3 = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["shuffle"])([
            {
                icon: 'flaticon-pie-chart-1 kt-font-info',
                title: 'Metronic v6 has been arrived!',
                url: 'https://keenthemes.com.my/metronic',
                value: '+$500',
                valueColor: 'kt-font-info'
            }, {
                icon: 'flaticon-safe-shield-protection kt-font-success',
                title: 'Metronic community meet-up 2019 in Rome.',
                url: 'https://keenthemes.com.my/metronic',
                value: '+$1260',
                valueColor: 'kt-font-success'
            }, {
                icon: 'flaticon2-line-chart kt-font-danger',
                title: 'Metronic Angular 8 version will be landing soon..',
                url: 'https://keenthemes.com.my/metronic',
                value: '+$1080',
                valueColor: 'kt-font-danger'
            }, {
                icon: 'flaticon2-pie-chart-1 kt-font-primary',
                title: 'ale! Purchase Metronic at 70% off for limited time',
                url: 'https://keenthemes.com.my/metronic',
                value: '70% Off!',
                valueColor: 'kt-font-primary'
            }, {
                icon: 'flaticon2-rocket kt-font-brand',
                title: 'Metronic VueJS version is in progress. Stay tuned!',
                url: 'https://keenthemes.com.my/metronic',
                value: '+134',
                valueColor: 'kt-font-brand'
            }, {
                icon: 'flaticon2-notification kt-font-warning',
                title: 'Black Friday! Purchase Metronic at ever lowest 90% off for limited time',
                url: 'https://keenthemes.com.my/metronic',
                value: '70% Off!',
                valueColor: 'kt-font-warning'
            }, {
                icon: 'flaticon2-file kt-font-focus',
                title: 'Metronic React version is in progress.',
                url: 'https://keenthemes.com.my/metronic',
                value: '+13%',
                valueColor: 'kt-font-focus'
            },
        ]);
        // @ts-ignore
        this.widget4_4 = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["shuffle"])([
            {
                pic: './assets/media/client-logos/logo5.png',
                title: 'Trump Themes',
                desc: 'Make Metronic Development',
                url: 'https://keenthemes.com.my/metronic',
                value: '+$2500',
                valueColor: 'kt-font-brand'
            }, {
                pic: './assets/media/client-logos/logo4.png',
                title: 'StarBucks',
                desc: 'Good Coffee & Snacks',
                url: 'https://keenthemes.com.my/metronic',
                value: '-$290',
                valueColor: 'kt-font-brand'
            }, {
                pic: './assets/media/client-logos/logo3.png',
                title: 'Phyton',
                desc: 'A Programming Language',
                url: 'https://keenthemes.com.my/metronic',
                value: '+$17',
                valueColor: 'kt-font-brand'
            }, {
                pic: './assets/media/client-logos/logo2.png',
                title: 'GreenMakers',
                desc: 'Make Green Development',
                url: 'https://keenthemes.com.my/metronic',
                value: '-$2.50',
                valueColor: 'kt-font-brand'
            }, {
                pic: './assets/media/client-logos/logo1.png',
                title: 'FlyThemes',
                desc: 'A Let\'s Fly Fast Again Language',
                url: 'https://keenthemes.com.my/metronic',
                value: '+200',
                valueColor: 'kt-font-brand'
            },
        ]);
    };
    MyportfolioComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    MyportfolioComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    };
    MyportfolioComponent.ctorParameters = function () { return [
        { type: _core_base_layout__WEBPACK_IMPORTED_MODULE_5__["LayoutConfigService"] },
        { type: _core_base_layout__WEBPACK_IMPORTED_MODULE_5__["DataTableService"] },
        { type: _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"])
    ], MyportfolioComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSort"])
    ], MyportfolioComponent.prototype, "sort", void 0);
    MyportfolioComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'kt-myportfolio',
            template: __webpack_require__(/*! raw-loader!./myportfolio.component.html */ "./node_modules/raw-loader/index.js!./src/app/views/pages/myportfolio/myportfolio.component.html"),
            styles: [__webpack_require__(/*! ./myportfolio.component.scss */ "./src/app/views/pages/myportfolio/myportfolio.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_core_base_layout__WEBPACK_IMPORTED_MODULE_5__["LayoutConfigService"], _core_base_layout__WEBPACK_IMPORTED_MODULE_5__["DataTableService"], _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"]])
    ], MyportfolioComponent);
    return MyportfolioComponent;
}());

/** Builds and returns a new User. */
function createNewUser(id, name, price, change) {
    // const name =
    // 	NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    // 	  NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
    //   return {
    // 	id: id.toString(),
    // 	name: name,
    // 	progress:'d',
    // 	color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
    //    };
    return {
        id: id.toString(),
        name: name,
        price: price,
        change: change
    };
}
/** Constants used to fill up our data base. */
var COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
    'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
var NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
    'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
    'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];


/***/ }),

/***/ "./src/app/views/pages/myportfolio/myportfolio.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/views/pages/myportfolio/myportfolio.module.ts ***!
  \***************************************************************/
/*! exports provided: MyportfolioModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyportfolioModule", function() { return MyportfolioModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _core_core_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core/core.module */ "./src/app/core/core.module.ts");
/* harmony import */ var _partials_partials_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../partials/partials.module */ "./src/app/views/partials/partials.module.ts");
/* harmony import */ var _myportfolio_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./myportfolio.component */ "./src/app/views/pages/myportfolio/myportfolio.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");

// Angular



// Core Module




var MyportfolioModule = /** @class */ (function () {
    function MyportfolioModule() {
    }
    MyportfolioModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _partials_partials_module__WEBPACK_IMPORTED_MODULE_5__["PartialsModule"],
                _core_core_module__WEBPACK_IMPORTED_MODULE_4__["CoreModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatChipsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSliderModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatStepperModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDividerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatButtonToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatBottomSheetModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTreeModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _myportfolio_component__WEBPACK_IMPORTED_MODULE_6__["MyportfolioComponent"]
                    },
                ]),
            ],
            providers: [],
            declarations: [
                _myportfolio_component__WEBPACK_IMPORTED_MODULE_6__["MyportfolioComponent"],
            ]
        })
    ], MyportfolioModule);
    return MyportfolioModule;
}());



/***/ })

}]);
//# sourceMappingURL=app-views-pages-myportfolio-myportfolio-module.js.map