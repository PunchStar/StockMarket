// Angular
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
// Lodash
import { shuffle } from 'lodash';
// Services
// Widgets model
// declare var jQuery: any
declare var $: any;
import { LayoutConfigService, SparklineChartOptions, DataTableService } from '../../../core/_base/layout';
// import { Widget4Data } from '../../partials/content/widgets/widget4/widget4.component';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material'
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, skip, take, delay } from 'rxjs/operators';
import { fromEvent, merge,  of, Subscription } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../core/reducers';
import { currentUser, Logout, User, UsersDataSource, UsersPageRequested, AuthService } from '../../../core/auth';
// import "assets/js/pages/components/charts/amcharts/charts.js";


import { RequestsModel, RequestsService } from '../../../core/e-commerce';
// declare var AmCharts: any;
var users: UserData[] = [];
var userGraph:any = [];

@Component({
	selector: 'kt-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	private chart: am4charts.XYChart;
	// displayedColumns = ['id', 'name', 'progress', 'color'];
	displayedColumns = ['COMPANY','PRICE','LOW','HIGH','ACTIONS'];
	// company = ['III','ABF','ADM','ADM','AAL','ANTO','AHT','AZN','AUTO','AVV','AV','BA.','BARC','BDEV','BKG','BHP','BP.','BATS','BLND','BT.A','BNZL','BRBY','CCL','CNA','CCH','CPG','CRH','CRDA','DCC','DGE','EZJ','EVR','EXPN','FERG','FRES','GSK','GLEN','GLEN','HLMA','HL.','HIK','HSBA','IMB','INF','ICP','IHG','ITRK','IAG','ITV','JD.','JMAT','JET','LAND','LGEN','LLOY','LSE','MNG','MGGT','MRO','MNDI','MRW','NG.','NXT','NMC','OCDO','PSON','PNN','PSN','PHNX','POLY','PRU','RDSA','RDSB','RB.','REL','RTO','RMV','RIO','RR.','RBS','RSA','SGE','SBRY','SDR','SMT','SGRO','SVT','SN.','SMDS','SMIN','SKG','SPX','SSE','STJ','STAN','SLA','TW.','TSCO','ULVR','UU.','VOD','WTB','WPP'];
	// company = ['III'];
	company=[
		{symbol:'AAL.L',companyName:'ANGLO AMERICAN'},
		{symbol:'ABF.L',companyName:'ASSOCIAT BRIT FOODS'},
		{symbol:'ADM.L',companyName:'ADMIRAL GROUP'},
		{symbol:'ADN.L',companyName:'ABERDEEN ASSET MGMT'},
		{symbol:'AGK.L',companyName:'AGGREKO'},
		{symbol:'AMEC.L',companyName:'AMEC'},
		{symbol:'ANTO.L',companyName:'ANTOFAGASTA'},
		{symbol:'ARM.L',companyName:'ARM HOLDINGS'},
		{symbol:'ASHM.L',companyName:'ASHMORE GRP'},
		{symbol:'AV.L',companyName:'AVIVA'},
		{symbol:'AZN.L',companyName:'ASTRAZENECA'},
		{symbol:'BA.L',companyName:'BAE SYSTEMS	'},
		{symbol:'BARC.L',companyName:'BARCLAYS'},
		{symbol:'BATS.L',companyName:'BRIT AMER TOBACCO'},
		{symbol:'BG.L',companyName:'BG GROUP'},
		{symbol:'BLND.L',companyName:'BRIT LAND CO REIT'},
		{symbol:'BLT.L',companyName:'BHP BILLITON'},
		{symbol:'BNZL.L',companyName:'BUNZL'},
		{symbol:'BP.L',companyName:'BP'},
		{symbol:'BRBY.L',companyName:'BURBERRY GROUP'},
		{symbol:'BSY.L',companyName:'B SKY B GROUP'},
		{symbol:'BT-A.L',companyName:'BT GROUP'},
		{symbol:'CCL.L',companyName:'CARNIVAL'},
		{symbol:'CNA.L',companyName:'CENTRICA'},
		{symbol:'CPG.L',companyName:'COMPASS GROUP'},
		{symbol:'CPI.L',companyName:'CAPITA'},
		{symbol:'CRDA.L',companyName:'CRODA INTL PLC'},
		{symbol:'CRH.L',companyName:'CRH PLC'},
		{symbol:'CSCG.L',companyName:'CAP SHOP CENTRES'},
		{symbol:'DGE.L',companyName:'DIAGEO'},
		{symbol:'EMG.L',companyName:'MAN GROUP'},
		{symbol:'ENRC.L',companyName:'EURASIAN NATURAL'},
		{symbol:'EVR.L',companyName:'EVRAZ'},
		// {symbol:'EXPN.L',companyName:'EXPERIAN'},
		// {symbol:'FRES.L',companyName:'FRESNILLO'},
		// {symbol:'GFS.L',companyName:'G4S'},
		// {symbol:'GKN.L',companyName:'GKN'},
		// {symbol:'GLEN.L',companyName:'GLENCORE INTL'},
		// {symbol:'GSK.L',companyName:'GLAXOSMITHKLINE'},
		// {symbol:'HL.L',companyName:'HARGREAVES LANS'},
		// {symbol:'HMSO.L',companyName:'HAMMERSON REIT'},
		// {symbol:'HSBA.L',companyName:'HSBC HLDG'},
		// {symbol:'IAG.L',companyName:'INTL. CONS. AIR GRP'},
		// {symbol:'IAP.L',companyName:'ICAP'},
		// {symbol:'IHG.L',companyName:'INTERCONT HOTELS'},
		// {symbol:'IMI.L',companyName:'IMI PLC'},
		// {symbol:'IMT.L',companyName:'IMPERIAL TOBACCO'},
		// {symbol:'IPR.L',companyName:'INTERNATIONAL POWER'},
		// {symbol:'ITRK.L',companyName:'INTERTEK GROUP'},
		// {symbol:'ITV.L',companyName:'ITV'},
		// {symbol:'JMAT.L',companyName:'JOHNSON MATTHEY PLC'},
		// {symbol:'KAZ.L',companyName:'KAZAKHMYS'},
		// {symbol:'KGF.L',companyName:'KINGFISHER'},
		// {symbol:'LAND.L',companyName:'LAND SEC R.E.I.T.'},
		// {symbol:'LGEN.L',companyName:'LEGAL & GENERAL'},
		// {symbol:'LLOY.L',companyName:'LLOYDS BANKING GRP'},
		// {symbol:'MGGT.L',companyName:'MEGGITT'},
		// {symbol:'MKS.L',companyName:'MARKS & SPENCER'},
		// {symbol:'MRW.L',companyName:'MORRISON SUPERMKTS'},
		// {symbol:'NG.L',companyName:'NATIONAL GRID'},
		// {symbol:'NXT.L',companyName:'NEXT'},
		// {symbol:'OML.L',companyName:'OLD MUTUAL'},
		// {symbol:'PFC.L',companyName:'PETROFAC'},
		// {symbol:'POLY.L',companyName:'POLYMETAL INTL'},
		// {symbol:'PRU.L',companyName:'PRUDENTIAL'},
		// {symbol:'PSON.L',companyName:'PEARSON'},
		// {symbol:'RB.L',companyName:'RECKITT BENCK GRP'},
		// {symbol:'RBS.L',companyName:'ROYAL BK SCOTL GR'},
		// {symbol:'RDSB.L',companyName:'ROYAL DUTCH SHELL-B'},
		// {symbol:'REL.L',companyName:'REED ELSEVIER PLC'},
		// {symbol:'REX.L',companyName:'REXAM'},
		// {symbol:'RIO.L',companyName:'RIO TINTO'},
		// {symbol:'RR.L',companyName:'ROLLS-ROYCE HLDGS'},
		// {symbol:'RRS.L',companyName:'RANDGOLD RESOURCES'},
		// {symbol:'RSA.L',companyName:'RSA INSUR GRP'},
		// {symbol:'RSL.L',companyName:'RESOLUTION NPV'},
		// {symbol:'SAB.L',companyName:'SABMILLER'},
		// {symbol:'SBRY.L',companyName:'SAINSBURY'},
		// {symbol:'SDR.L',companyName:'SCHRODERS'},
		// {symbol:'SDRC.L',companyName:'SCHRODERS NVTG'},
		// {symbol:'SGE.L',companyName:'SAGE GRP'},
		// {symbol:'SHP.L',companyName:'SHIRE'},
		// {symbol:'SL.L',companyName:'STANDARD LIFE'},
		// {symbol:'SMIN.L',companyName:'SMITHS GROUP'},
		// {symbol:'SN.L',companyName:'SMITH & NEPHEW'},
		// {symbol:'SRP.L',companyName:'SERCO GROUP'},
		// {symbol:'SSE.L',companyName:'SSE'},
		// {symbol:'STAN.L',companyName:'STANDARD CHARTERED'},
		// {symbol:'SVT.L',companyName:'SEVERN TRENT'},
		// {symbol:'TATE.L',companyName:'TATE & LYLE'},
		// {symbol:'TLW.L',companyName:'TULLOW OIL'},
		// {symbol:'TSCO.L',companyName:'TESCO PLC'},
		// {symbol:'ULVR.L',companyName:'UNILEVER'},
		// {symbol:'UU.L',companyName:'UNITED UTILITIES GR'},
		// {symbol:'VED.L',companyName:'VEDANTA RESOURCES'},
		// {symbol:'VOD.L',companyName:'VODAFONE GRP'},
		// {symbol:'WEIR.L',companyName:'WEIR GROUP'},
		// {symbol:'WOS.L',companyName:'WOLSELEY'},
		// {symbol:'WPP.L',companyName:'WPP'},
		// {symbol:'WTB.L',companyName:'WHITBREAD'},
		// {symbol:'XTA.L',companyName:'XSTRATA'}
		]
	dataSource: MatTableDataSource<UserData>;
	user$: Observable<User>;
	dataSourceAll:UsersDataSource;
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;
	usersResult: User[] = [];
	chartOptions1: SparklineChartOptions;
	chartOptions2: SparklineChartOptions;
	chartOptions3: SparklineChartOptions;
	chartOptions4: SparklineChartOptions;
	data = [];
	value = 50;
			// widget4_1: Widget4Data;
	// widget4_2: Widget4Data;
	// widget4_3: Widget4Data;
	// widget4_4: Widget4Data;
	ftseArr = [];
	reqResult:RequestsModel[];
	totalEquity = 0.0;
	totalBond   = 0.0;
	totalGilt   = 0.0;
	totalFund   = 0.0;
	format = new Intl.NumberFormat('en-GB', { 
		style: 'currency', 
		currency: 'GBP', 
		minimumFractionDigits: 2, 
	}); 
	private subscriptions: Subscription[] = [];

	constructor(private zone: NgZone,private layoutConfigService: LayoutConfigService,private element: ElementRef,private authservice:AuthService, private rservice:RequestsService, private dataservice:DataTableService,private store: Store<AppState>) {
		// for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }
		
		
		
	
	}

	ngOnInit(): void {
		// console.log(KTamChartsChartsDemo.init);
		// setData('sdfdsf');
		if(localStorage.getItem('ReqInfo')){
			this.reqResult= JSON.parse(localStorage.getItem('ReqInfo'))
			this.reqResult.forEach(element => {
				console.log('====== req result ========')
				console.log(element)
				console.log(this.totalEquity)
				console.log(this.totalBond)
				this.totalEquity += element.equity;
				if(element.bankId.type =='Bond')
					this.totalBond += element.equity;
				else if(element.bankId.type =='Gilt')
					this.totalGilt += element.equity;
				else if(element.bankId.type =='Fund')
					this.totalFund += element.equity;
			});
		}
		if(localStorage.getItem('UserInfo')){
			this.usersResult= JSON.parse(localStorage.getItem('UserInfo'))
		}
		this.dataservice.getGraph('BA.L').subscribe((res)=>{
			if(res['s'] == 'ok'){
				var openArr = res['c'];
				userGraph = [];
				console.log('aaaaaaaa')
				console.log(res)
				for(let i = 0; i< openArr.length ;i ++){
					var tempDate:Date = new Date(res['t'][i] * 1000);
					userGraph.push({value:openArr[i],date:tempDate})
				}	
			}
			console.log('userGHram')
			console.log(userGraph)
			this.zone.runOutsideAngular(() => {
				let chart = am4core.create("chartdiv", am4charts.XYChart);
				chart.paddingRight = 20;
				chart.data = userGraph;
				let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
				dateAxis.renderer.grid.template.location = 0;
		
				let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
				valueAxis.tooltip.disabled = true;
				valueAxis.renderer.minWidth = 35;
		
				let series = chart.series.push(new am4charts.LineSeries());
				series.dataFields.dateX = "date";
				series.dataFields.valueY = "value";
				series.tooltipText = "{valueY.value}";
				chart.cursor = new am4charts.XYCursor();
		
				let scrollbarX = new am4charts.XYChartScrollbar();
				scrollbarX.series.push(series);
				chart.scrollbarX = scrollbarX;
			
				this.chart = chart;
				});
		})
		this.company.forEach(subCompany =>{
			this.dataservice.getJSON(subCompany.symbol).subscribe((res)=>{
				if(res && res.o)
				{
					users.push({id:users.length + 1, o:res.o, l:res.l, h:res.h, c:res.c,pc:res.pc,name:subCompany.companyName,symbol:subCompany.symbol});
					this.dataSource = new MatTableDataSource(users);
				}		
			});
		})
	
		console.log('usergram')

		console.log(userGraph)
		// $(document).ready(function() {
			// var settings = {
			// 	"async": true,
			// 	"crossDomain": true,
			// 	"url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts?comparisons=%255EGDAXI%252C%255EFCHI&region=US&lang=en&symbol=HYDR.ME&interval=5m&range=1d",
			// 	"method": "GET",
			// 	"headers": {
			// 		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
			// 		"x-rapidapi-key": "a563eccf62msh20b56a4564bb46ep134e3bjsn1cb936c23bbb"
			// 	}
			// }
			
			// $.ajax(settings).done(function (response) {
			// 	console.log('dsfsdf')
			// 	console.log(response);
			// });

			// var chart = AmCharts.makeChart("kt_amcharts_6", {
			// 	"type": "serial",
			// 	"theme": "light",
			// 	"marginRight":5,
			// 	"marginLeft": 5,
			// 	"autoMarginOffset": 10,
			// 	"mouseWheelZoomEnabled": true,
			// 	"dataDateFormat": "YYYY-MM-DD",
			// 	"valueAxes": [{
			// 		"id": "v1",
			// 		"axisAlpha": 0,
			// 		"position": "left",
			// 		"ignoreAxisWidth": true
			// 	}],
			// 	"balloon": {
			// 		"borderThickness": 1,
			// 		"shadowAlpha": 0
			// 	},
			// 	"graphs": [{
			// 		"id": "g1",
			// 		"balloon": {
			// 			"drop": true,
			// 			"adjustBorderColor": false,
			// 			"color": "#ffffff"
			// 		},
			// 		"bullet": "round",
			// 		"bulletBorderAlpha": 1,
			// 		"bulletColor": "#FFFFFF",
			// 		"bulletSize": 5,
			// 		"hideBulletsCount": 50,
			// 		"lineThickness": 2,
			// 		"title": "red line",
			// 		"useLineColorForBulletBorder": true,
			// 		"valueField": "value",
			// 		"balloonText": "<span style='font-size:18px;'>[[value]]</span>"
			// 	}],
			// 	"chartScrollbar": {
			// 		"graph": "g1",
			// 		"oppositeAxis": false,
			// 		"offset": 30,
			// 		"scrollbarHeight": 80,
			// 		"backgroundAlpha": 0,
			// 		"selectedBackgroundAlpha": 0.1,
			// 		"selectedBackgroundColor": "#888888",
			// 		"graphFillAlpha": 0,
			// 		"graphLineAlpha": 0.5,
			// 		"selectedGraphFillAlpha": 0,
			// 		"selectedGraphLineAlpha": 1,
			// 		"autoGridCount": true,
			// 		"color": "#AAAAAA"
			// 	},
			// 	"chartCursor": {
			// 		"pan": true,
			// 		"valueLineEnabled": true,
			// 		"valueLineBalloonEnabled": true,
			// 		"cursorAlpha": 1,
			// 		"cursorColor": "#258cbb",
			// 		"limitToGraph": "g1",
			// 		"valueLineAlpha": 0.2,
			// 		"valueZoomable": true
			// 	},
			// 	"valueScrollbar": {
			// 		"oppositeAxis": false,
			// 		"offset": 50,
			// 		"scrollbarHeight": 10
			// 	},
			// 	"categoryField": "date",
			// 	"categoryAxis": {
			// 		"parseDates": true,
			// 		"dashLength": 1,
			// 		"minorGridEnabled": true
			// 	},
			// 	"export": {
			// 		"enabled": true
			// 	},
			// 	"dataProvider":userGraph
			// });
		// });
		this.dataSourceAll = new UsersDataSource(this.store);
		this.user$ = this.store.pipe(select(currentUser));
		this.user$.subscribe((res)=>{
			if(res && res.roles[0] == 1 && !localStorage.getItem('ReqInfo')){
				this.rservice.getAllRequests().subscribe((reqRes)=>{
					localStorage.setItem('ReqInfo',JSON.stringify(reqRes))
					this.reqResult = reqRes;
					this.reqResult.forEach(element => {
					this.totalEquity += element.equity;
					if(element.bankId.type =='Bond')
						this.totalBond += element.equity;
					else if(element.bankId.type =='Gilt')
						this.totalGilt += element.equity;
					else if(element.bankId.type =='Fund')
						this.totalFund += element.equity;
				});
				});
		
			}
			if(res && res.roles[0] == 1 && !localStorage.getItem('UserInfo')){
				this.authservice.getAllUsers().subscribe((reqRes)=>{
					localStorage.setItem('UserInfo',JSON.stringify(reqRes))
					this.usersResult = reqRes;
				});
		
			}
		})
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
	
	}
	ngAfterViewInit() {
		// this.dataSource.paginator = this.paginator;
		// this.dataSource.sort = this.sort;
		
	}

	ngOnDestroy() {
		this.zone.runOutsideAngular(() => {
		  if (this.chart) {
			this.chart.dispose();
		  }
		});
	  }
	  onSelCompany(symbol){
		  console.log('select')
		  console.log(symbol)
		this.dataservice.getGraph(symbol).subscribe((res)=>{
			if(res['s'] == 'ok'){
				userGraph = [];
				var openArr = res['c'];
				for(let i = 0; i< openArr.length ;i ++){
					var tempDate:Date = new Date(res['t'][i] * 1000);
					userGraph.push({value:openArr[i],date:tempDate})
				}	
			}
			this.zone.runOutsideAngular(() => {
				let chart = am4core.create("chartdiv", am4charts.XYChart);
				chart.paddingRight = 20;
				
				// let dataaa = [];
				// let visits = 10;
				// for (let i = 1; i < 366; i++) {
				// 	visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
				// 	dataaa.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
				// }
		
				// chart.data = dataaa;
					chart.data = userGraph;
				let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
				dateAxis.renderer.grid.template.location = 0;
		
				let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
				valueAxis.tooltip.disabled = true;
				valueAxis.renderer.minWidth = 35;
		
				let series = chart.series.push(new am4charts.LineSeries());
				series.dataFields.dateX = "date";
				series.dataFields.valueY = "value";
				series.tooltipText = "{valueY.value}";
				chart.cursor = new am4charts.XYCursor();
		
				let scrollbarX = new am4charts.XYChartScrollbar();
				scrollbarX.series.push(series);
				chart.scrollbarX = scrollbarX;
			
				this.chart = chart;
				});
		})
	  }
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
}

/** Builds and returns a new User. */
// function createNewUser(id: number, date,value): UserData {
// const name =
// 	NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
// 	  NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
	//   return {
	// 	id: id.toString(),
	// 	name: name,
	// 	progress:'d',
	// 	color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
	//    };
// 	   return {
// 		id: id.toString(),
// 		date:date,
// 		value:value
// 	   };
//   }
/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: number;
//   updated:string;
  o:number;
  h:number;
  l:number;
  c:number;
  pc:number;
  name:string;
  symbol:string;
//   price: string;
//   change: string;
//   progress:string;
//   price: string;
//   change: string;
//   color: string;
}