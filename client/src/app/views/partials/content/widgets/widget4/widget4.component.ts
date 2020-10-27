// Angular
import { Component, Input, OnInit } from '@angular/core';
// Lodash.
import { shuffle } from 'lodash';
import { ChangeDetectionStrategy,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestsService, RequestsModel, ProductsService, ProductModel } from '../../../../../core/e-commerce';
import Swal from 'sweetalert2';
export interface Widget1Data {
	title: string;
	desc: string;
	value: string;
	valueClass?: string;
}
export interface DialogData {
	animal: string;
	name: string;
}
@Component({
	selector: 'kt-widget4',
	templateUrl: './widget4.component.html',
	styleUrls: ['./widget4.component.scss']
})
export class Widget4Component implements OnInit {
	// Public properties
	animal: string;
	name: string;
	@Input() data: Widget1Data[];
	@Input() flag:string;
	requestResult:ProductModel[] = [];
	animalSubject = new BehaviorSubject<string>('');
	format = new Intl.NumberFormat('en-GB', { 
		style: 'currency', 
		currency: 'GBP', 
		minimumFractionDigits: 2, 
	}); 
		constructor(public dialog: MatDialog,private rservice:ProductsService){
	
	}
	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 * format.format(_user.totalEquity)
	 */
	ngOnInit() {
		console.log('widget4')
		this.rservice.getAllProducts().subscribe((res)=>{
			console.log(this.requestResult)
			this.requestResult = res;
			this.requestResult = this.requestResult.filter((res1)=>(res1.type == this.flag))
		})
		// this.rservice.getAllRequestId(this.userId).subscribe((res)=>{
		// 	console.log(this.requestResult)
		// 	this.requestResult = res;
		// 	this.requestResult = this.requestResult.filter((res1)=>(res1.bankId.type == this.flag))
		// })
		// if (!this.data) {
		// 	this.data = shuffle([
		// 		{
		// 			title: `${this.flag} information`,
		// 			desc: '6.00% - 01/01/2020',
		// 			value: this.format.format(2000),
		// 			valueClass: 'kt-font-brand'
		// 		}, {
		// 			title: `${this.flag} information`,
		// 			desc: '6.00% - 01/01/2020',
		// 			value: this.format.format(3000),
		// 			valueClass: 'kt-font-danger'
		// 		}, {
		// 			title: `${this.flag} information`,
		// 			desc: '6.00% - 01/01/2020',
		// 			value: this.format.format(3000),
		// 			valueClass: 'kt-font-success'
		// 		}
		// 	]);
		// }
	}
	openViewDialog(item){
		// console.log('1')
		// item.IssuePrice = item.IssuePrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
		item.CouponPaymentDate = item.CouponPaymentDate.toString().slice(0,10);
		item.IssueDate = item.IssueDate.toString().slice(0,10);
		item.CouponStartDate = item.CouponStartDate.toString().slice(0,10);
		item.MaturityDate = item.MaturityDate.toString().slice(0,10);
		item.FinalCouponDate = item.FinalCouponDate.toString().slice(0,10);
		// const dialogRef = this.dialog.open(ViewEquityComponent, { data: { 'req':item } });
		// console.log('2')
		// const _messageType = MessageType.Update;
		// dialogRef.updateSize('100%','100%')
		// dialogRef.afterClosed().subscribe(res => {
		// 	if (!res) {
		// 		return;
		// 	}
		// 	// this.loadCustomersList();
		// });
		var subTemp = `<div class="kt-form__group">
		<div class="row">
			<div class="col-md-4 kt-margin-bottom-10-mobile"></div>
			<div class="col-md-4 kt-margin-bottom-10-mobile">
			<div class="kt-widget12__info">
				<a style="margin:20px 0px;width: 80%;" class="btn btn-primary" target="_blank" href="${item.uploadUrl}">
					View
				</a>
			</div>
			</div>
		</div>
	</div>`;
	if(item.type == 'Bond')
		subTemp =``;
	var tempHTML = `
		<div class="kt-form__group">
			<div class="row">
				<div class="col-md-4 kt-margin-bottom-10-mobile">
					<div class="kt-widget12__info">
						<span class="kt-widget12__desc">ISIN</span>
						<span class="kt-widget12__value" style="font-size: 1.4rem;    font-weight: 600;">${item.ISIN}</span>
					</div>
				</div>
				<div class="col-md-4 kt-margin-bottom-10-mobile">
					<div class="kt-widget12__info">
						<span class="kt-widget12__desc">Issuer</span>
						<span class="kt-widget12__value" style="font-size: 1.4rem;    font-weight: 600;">${item.Issuer}</span>
					</div>
				</div>
				<div class="col-md-4 kt-margin-bottom-10-mobile">
					<div class="kt-widget12__info">
						<span class="kt-widget12__desc">Issue Volume</span>
						<span class="kt-widget12__value" style="font-size: 1.4rem;    font-weight: 600;">${item.IssueVolume.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="kt-separator kt-separator--dashed"></div>
		<div class="kt-form__group">
			<div class="row">
				<div class="col-md-4 kt-margin-bottom-10-mobile">
					<div class="kt-widget12__info">
						<span class="kt-widget12__desc">Currency</span>
						<span class="kt-widget12__value" style="font-size: 1.4rem;    font-weight: 600;">${item.Currency}</span>
					</div>
				</div>
				<div class="col-md-4 kt-margin-bottom-10-mobile">
					<div class="kt-widget12__info">
						<span class="kt-widget12__desc">Issue Price</span>
						<span class="kt-widget12__value" style="font-size: 1.4rem;    font-weight: 600;">${item.IssuePrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
					</div>
				</div>
				<div class="col-md-4 kt-margin-bottom-10-mobile">
					<div class="kt-widget12__info">
						<span class="kt-widget12__desc">Issue Date</span>
						<span class="kt-widget12__value" style="font-size: 1.4rem;    font-weight: 600;">${item.IssueDate}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="kt-separator kt-separator--dashed"></div>
		<div class="kt-form__group">
			<div class="row">
				<div class="col-md-4 kt-margin-bottom-10-mobile">
					<div class="kt-widget12__info">
						<span class="kt-widget12__desc">Coupon</span>
						<span class="kt-widget12__value" style="font-size: 1.4rem;    font-weight: 600;">${item.Coupon} %</span>
					</div>
				</div>
				<div class="col-md-4 kt-margin-bottom-10-mobile">
					<div class="kt-widget12__info">
						<span class="kt-widget12__desc">Denomination</span>
						<span class="kt-widget12__value" style="font-size: 1.4rem;    font-weight: 600;">${item.Denomination.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
					</div>
				</div>
				<div class="col-md-4 kt-margin-bottom-10-mobile">
					<div class="kt-widget12__info">
						<span class="kt-widget12__desc">Payment Type</span>
						<span class="kt-widget12__value" style="font-size: 1.4rem;    font-weight: 600;">${item.PaymentType}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="kt-separator kt-separator--dashed"></div>
		<div class="kt-form__group">
			<div class="row">
				<div class="col-md-4 kt-margin-bottom-10-mobile">
					<div class="kt-widget12__info">
						<span class="kt-widget12__desc">Maturity Date</span>
						<span class="kt-widget12__value" style="font-size: 1.4rem;    font-weight: 600;">${item.MaturityDate}</span>
					</div>
				</div>
				<div class="col-md-4 kt-margin-bottom-10-mobile">
					<div class="kt-widget12__info">
						<span class="kt-widget12__desc">Coupon Payment Date</span>
						<span class="kt-widget12__value" style="font-size: 1.4rem;    font-weight: 600;">${item.CouponPaymentDate}</span>
					</div>
				</div>
				<div class="col-md-4 kt-margin-bottom-10-mobile">
					<div class="kt-widget12__info">
						<span class="kt-widget12__desc">Coupon Start Date</span>
						<span class="kt-widget12__value" style="font-size: 1.4rem;    font-weight: 600;">${item.CouponStartDate}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="kt-separator kt-separator--dashed"></div>
		<div class="kt-form__group">
			<div class="row">
				<div class="col-md-4 kt-margin-bottom-10-mobile">
					<div class="kt-widget12__info">
						<span class="kt-widget12__desc">Final Coupon Date</span>
						<span class="kt-widget12__value" style="font-size: 1.4rem;    font-weight: 600;">${item.FinalCouponDate}</span>
					</div>
				</div>
				<div class="col-md-4 kt-margin-bottom-10-mobile">
					<div class="kt-widget12__info">
						<span class="kt-widget12__desc">Floater</span>
						<span class="kt-widget12__value" style="font-size: 1.4rem;    font-weight: 600;">${item.Floater}</span>
					</div>
				</div>
			</div>
		</div>
		`+subTemp+`
	</div>
</div>`;
		if(item.type == 'Fund')
			tempHTML = `
			<div class="kt-form__group">
				<div class="row">
					<div class="col-md-4 kt-margin-bottom-10-mobile">
						<div class="kt-widget12__info">
							<span class="kt-widget12__desc">Fund name:</span>
							<span class="kt-widget12__value" style="font-size: 1.4rem;    font-weight: 600;">${item.Issuer}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="kt-separator kt-separator--dashed"></div>
			<div class="kt-form__group">
				<div class="row">
					<div class="col-md-4 kt-margin-bottom-10-mobile"></div>
					<div class="col-md-4 kt-margin-bottom-10-mobile">
					<div class="kt-widget12__info">
						<a style="margin:20px 0px;width: 80%;" class="btn btn-primary" target="_blank" href="${item.uploadUrl}">
							View
						</a>
					</div>
					</div>
				</div>
			</div>
		</div>
</div>`;
		Swal.fire({
			width:'98em',
			showCancelButton:false,
			showCloseButton:true,
			showConfirmButton:false,
			title: '<strong  style="font-size: 2.4rem;    font-weight: 600;">View Investment Info</strong>',
			html:
		`	<div class="kt-portlet__body"style="max-height: 90vh!important">
				<div class="kt-form__section kt-form__section--first" >
					<div class="kt-form__group">
						<div class="row">
							<div class="col-md-4 kt-margin-bottom-10-mobile">
								<div class="kt-widget12__info">
									<span class="kt-widget12__desc">Type:</span>
									<span class="kt-widget12__value" style="font-size: 1.4rem;    font-weight: 600;">${item.type}</span>
								</div>
							</div>
							
						</div>
					</div>
					<div class="kt-separator kt-separator--dashed"></div>`
					+tempHTML
		})
	}
	openDialog() {
		Swal.fire({
			title: `Do you wish to make an enquiry about this ${this.flag}?`,
			text: '',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Confirm Enquiry',
			cancelButtonText: 'Cancel'
		  }).then((result) => {
			if (result.value) {
			  Swal.fire(
				'Confirmed',
				'Thank you for your enquiry.',
				'success'
			  )
			// For more information about handling dismissals please visit
			// https://sweetalert2.github.io/#handling-dismissals
			} 
			// else if (result.dismiss === Swal.DismissReason.cancel) {
			//   Swal.fire(
			// 	'Cancelled',
			// 	'Your imaginary file is safe :)',
			// 	'error'
			//   )
			// }
		  })
	}
}