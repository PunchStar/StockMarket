// Angular
import { Component, Input, OnInit } from '@angular/core';
// Lodash
import { shuffle } from 'lodash';
import { RequestsService, RequestsModel, ProductsService, ProductModel } from '../../../../../core/e-commerce';
import { Observable } from 'rxjs';
import { SplashScreenService } from '../../../../../core/_base/layout';

export interface Widget1Data {
	title: string;
	desc: string;
	value: string;
	valueClass?: string;
}

@Component({
	selector: 'kt-widget1',
	templateUrl: './widget1.component.html',
	styleUrls: ['./widget1.component.scss']
})
export class Widget1Component implements OnInit {
	// Public properties
	@Input() data: Widget1Data[];
	@Input() userId:string;
	requestResult$:Observable<RequestsModel[]>;
	format = new Intl.NumberFormat('en-GB', { 
		style: 'currency', 
		currency: 'GBP', 
		minimumFractionDigits: 2, 
	}); 
	constructor(private rservice:RequestsService,private splashScreenService: SplashScreenService){}
	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 * format.format(_user.totalEquity)
	 */
	ngOnInit() {
		this.requestResult$ = this.rservice.getAllRequestId(this.userId)
		// if (!this.data) {
		// 	this.data = shuffle([
		// 		{
		// 			title: 'Bond information',
		// 			desc: '6.00% - 01/01/2020',
		// 			value: this.format.format(2000),
		// 			valueClass: 'kt-font-brand'
		// 		}, {
		// 			title: 'Bond information',
		// 			desc: '6.00% - 01/01/2020',
		// 			value: this.format.format(3000),
		// 			valueClass: 'kt-font-danger'
		// 		}, {
		// 			title: 'Bond information',
		// 			desc: '6.00% - 01/01/2020',
		// 			value: this.format.format(3000),
		// 			valueClass: 'kt-font-success'
		// 		}
		// 	]);
		// }
	}

}
