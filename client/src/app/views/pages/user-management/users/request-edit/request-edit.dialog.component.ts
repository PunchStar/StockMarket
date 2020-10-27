// Angular
import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// RxJS
import { Subscription, of } from 'rxjs';
import { delay } from 'rxjs/operators';
// NGRX
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
// CRUD
import { TypesUtilsService } from '../../../../../core/_base/crud';
// Services and Models
import { CustomerModel, CustomerUpdated, CustomerOnServerCreated, selectLastCreatedCustomerId, selectCustomersPageLoading, selectCustomersActionLoading, RequestsModel, RequestsService, ProductModel } from '../../../../../core/e-commerce';
import { formatDate } from '@angular/common';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-request-edit-dialog',
	templateUrl: './request-edit.dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class RequestEditDialogComponent implements OnInit, OnDestroy {
	// Public properties
	customer: RequestsModel;
	ReqcustomerForm: FormGroup;
	productResult:ProductModel[];
	productResultTemp:ProductModel[];
	hasFormErrors = false;
	viewLoading = false;
	// Private properties
	private componentSubscriptions: Subscription;

	/**
	 * Component constructor
	 *
	 * @param dialogRef: MatDialogRef<CustomerEditDialogComponent>
	 * @param data: any
	 * @param fb: FormBuilder
	 * @param store: Store<AppState>
	 * @param typesUtilsService: TypesUtilsService
	 */
	constructor(public dialogRef: MatDialogRef<RequestEditDialogComponent>,
		           @Inject(MAT_DIALOG_DATA) public data: any,
		           private fb: FormBuilder,
				   private store: Store<AppState>,
				   private rservice:RequestsService,
		           private typesUtilsService: TypesUtilsService) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		// this.store.pipe(select(selectCustomersActionLoading)).subscribe(res => this.viewLoading = res);
		this.customer = this.data.req;
		this.productResult = this.data.product;
		console.log(this.productResult)
		this.createForm();
		this.onChangeType(null);

	}

	/**
	 * On destroy
	 */
	onChangeType(event){
		console.log('onchangetype')
		const controls = this.ReqcustomerForm.controls;

		this.productResultTemp = this.productResult.filter((element)=> (element.type == controls.newType.value))
	}
	ngOnDestroy() {
		if (this.componentSubscriptions) {
			this.componentSubscriptions.unsubscribe();
		}
	}

	createForm() {
		this.ReqcustomerForm = this.fb.group({
			newType: [this.customer.bankId.type, Validators.required],
			newTopic: [this.customer.bankId._id, Validators.required],
			newEquity: [this.customer.equity, Validators.required],
			newDate: [formatDate(this.customer.date, 'yyyy-MM-dd', 'en'), Validators.required],
		});
	}

	/**
	 * Returns page title
	 */
	getTitle(): string {
		if (this.customer.id > 0) {
			return `Edit customer '${this.customer.bankId.topic} - ${
				this.customer.date
			}'`;
		}

		return 'New customer';
	}

	/**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.ReqcustomerForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	/** ACTIONS */

	/**
	 * Returns prepared customer
	 */
	prepareCustomer(): RequestsModel {
		const controls = this.ReqcustomerForm.controls;
		console.log('prepare')
		console.log(this.customer)
		var _customer:any= {
			'_id' : this.customer._id,
			'id' : this.customer.id,
			'userId' : this.customer.userId._id,
			'equity' : controls.newEquity.value,
			'bankId' : controls.newTopic.value,
			'date' :controls.newDate.value,
			'status': this.customer.status
		};
		// _customer._id = this.customer._id;
		// _customer.id = this.customer.id;
		// _customer.userId = this.customer.userId._id;
		// _customer.equity = controls.newEquity.value;
		// _customer.bankId = controls.newTopic.value;
		// _customer.date = controls.newDate.value;
		// _customer.status = this.customer.status;
		return _customer;
	}

	/**
	 * On Submit
	 */
	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.ReqcustomerForm.controls;
		/** check form */
		if (this.ReqcustomerForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}

		const editedCustomer = this.prepareCustomer();
		this.updateCustomer(editedCustomer);
	}

	/**
	 * Update customer
	 *
	 * @param _customer: CustomerModel
	 */
	updateCustomer(_customer: any) {
		this.rservice.updateRequest(_customer).subscribe((res)=>{
			console.log('updatecustomer')
			console.log(res)
			of(undefined).pipe(delay(1000)).subscribe(() => this.dialogRef.close({ _customer, isEdit: true }));
		})
		// Remove this line
		// Uncomment this line
		// this.dialogRef.close({ _customer, isEdit: true }
	}


	/** Alect Close event */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}
}
