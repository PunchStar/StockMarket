// Angular
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
import { MatDialog } from '@angular/material';
// RxJS
import { Observable, BehaviorSubject, Subscription, of } from 'rxjs';
import { map, startWith, delay, first, finalize } from 'rxjs/operators';
// NGRX
import { Store, select } from '@ngrx/store';
import { Dictionary, Update } from '@ngrx/entity';
import { AppState } from '../../../../../../core/reducers';
import { formatDate } from '@angular/common';
// Layout
import { SubheaderService, LayoutConfigService } from '../../../../../../core/_base/layout';
// CRUD
import { LayoutUtilsService, TypesUtilsService, MessageType } from '../../../../../../core/_base/crud';
// Services and Models
import {
	selectLastCreatedProductId,
	selectProductById,
	SPECIFICATIONS_DICTIONARY,
	ProductModel,
	ProductOnServerCreated,
	ProductUpdated,
	ProductsService
} from '../../../../../../core/e-commerce';
import { AngularFireStorage } from '@angular/fire/storage';

const AVAILABLE_COLORS: string[] =
	['Red', 'CadetBlue', 'Gold', 'LightSlateGrey', 'RoyalBlue', 'Crimson', 'Blue', 'Sienna', 'Indigo', 'Green', 'Violet',
		'GoldenRod', 'OrangeRed', 'Khaki', 'Teal', 'Purple', 'Orange', 'Pink', 'Black', 'DarkTurquoise'];

const AVAILABLE_MANUFACTURES: string[] =
	['Pontiac', 'Subaru', 'Mitsubishi', 'Oldsmobile', 'Chevrolet', 'Chrysler', 'Suzuki', 'GMC', 'Cadillac', 'Mercury', 'Dodge',
		'Ram', 'Lexus', 'Lamborghini', 'Honda', 'Nissan', 'Ford', 'Hyundai', 'Saab', 'Toyota'];

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-product-edit',
	templateUrl: './product-edit.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditComponent implements OnInit, OnDestroy {
	// Public properties
	product: ProductModel;
	productId$: Observable<number>;
	oldProduct: ProductModel;
	selectedTab = 0;
	loadingSubject = new BehaviorSubject<boolean>(true);
	loading$: Observable<boolean>;
	productForm: FormGroup;
	hasFormErrors = false;
	availableYears: number[] = [];
	filteredColors: Observable<string[]>;
	filteredManufactures: Observable<string[]>;
	// Private password
	flagFund:boolean = true;
	private componentSubscriptions: Subscription;
	// sticky portlet header margin
	private headerMargin: number;
	uploadUrl ='';
	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 * @param activatedRoute: ActivatedRoute
	 * @param router: Router
	 * @param typesUtilsService: TypesUtilsService
	 * @param productFB: FormBuilder
	 * @param dialog: MatDialog
	 * @param subheaderService: SubheaderService
	 * @param layoutUtilsService: SubheaderService
	 * @param layoutConfigService: LayoutConfigService
	 * @param productService: ProductsService
	 * @param cdr: ChangeDetectorRef
	 */
	constructor(
		private store: Store<AppState>,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private typesUtilsService: TypesUtilsService,
		private productFB: FormBuilder,
		public dialog: MatDialog,
		private storage:AngularFireStorage,
		private subheaderService: SubheaderService,
		private layoutUtilsService: LayoutUtilsService,
		private layoutConfigService: LayoutConfigService,
		private productService: ProductsService,
		private cdr: ChangeDetectorRef) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.flagFund = true;
		for (let i = 2019; i > 1945; i--) {
			this.availableYears.push(i);
		}
		this.loading$ = this.loadingSubject.asObservable();
		this.loadingSubject.next(true);
		this.activatedRoute.params.subscribe(params => {
			const id = params.id;
			if (id && id > 0) {

				this.store.pipe(
					select(selectProductById(id))
				).subscribe(result => {
					if (!result) {
						this.loadProductFromService(id);
						return;
					}

					this.loadProduct(result);
				});
			} else {
				const newProduct = new ProductModel();
				newProduct.clear();
				this.loadProduct(newProduct);
			}
		});

		// sticky portlet header
		window.onload = () => {
			const style = getComputedStyle(document.getElementById('kt_header'));
			this.headerMargin = parseInt(style.height, 0);
		};
	}

	loadProduct(_product, fromService: boolean = false) {
		if (!_product) {
			this.goBack('');
		}
		this.product = _product;
		this.productId$ = of(_product.id);
		this.oldProduct = Object.assign({}, _product);
		this.initProduct();
		if (fromService) {
			this.cdr.detectChanges();
		}
	}

	// If product didn't find in store
	loadProductFromService(productId) {
		this.productService.getProductById(productId).subscribe(res => {
			this.loadProduct(res, true);
		});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy() {
		if (this.componentSubscriptions) {
			this.componentSubscriptions.unsubscribe();
		}
	}

	/**
	 * Init product
	 */
	initProduct() {
		this.createForm();
		this.loadingSubject.next(false);
		if (!this.product.id) {
			this.subheaderService.setBreadcrumbs([
				{ title: 'eCommerce', page: `/ecommerce` },
				{ title: 'Stock', page: `/ecommerce/products` },
				{ title: 'Create Stock', page: `/ecommerce/products/add` }
			]);
			return;
		}
		this.subheaderService.setTitle('Edit product');
		if(this.product.type == 'Fund')
			this.flagFund = false;
		this.subheaderService.setBreadcrumbs([
			{ title: 'eCommerce', page: `/ecommerce` },
			{ title: 'Stock', page: `/ecommerce/products` },
			{ title: 'Edit Stock', page: `/ecommerce/products/edit`, queryParams: { id: this.product.id } }
		]);
	}

	/**
	 * Create form
	 */
	createForm() {
		console.log('****(*(**(*(*')
		console.log(this.product)
		console.log('****(*(**(*(*')
		this.productForm = this.productFB.group({
			// model: [this.product.model, Validators.required],
			// manufacture: [this.product.manufacture, Validators.required],
			// modelYear: [this.product.modelYear.toString(), Validators.required],
			// mileage: [this.product.mileage, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
			// description: [this.product.description],
			// color: [this.product.color, Validators.required],
			// price: [this.product.price, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
			// condition: [this.product.condition.toString(), [Validators.required, Validators.min(0), Validators.max(1)]],
			// status: [this.product.status.toString(), [Validators.required, Validators.min(0), Validators.max(1)]],
			// VINCode: [this.product.VINCode, Validators.required]
			// topic: [this.product.topic, Validators.required],
			type: [this.product.type, Validators.required],
			ISIN: [this.product.ISIN, Validators.required],
			Issuer: [this.product.Issuer, Validators.required],
			IssueVolume: [this.product.IssueVolume, Validators.required],
			IssuePrice: [this.product.IssuePrice.toString(), Validators.required],
			Currency: [this.product.Currency, Validators.required],
			IssueDate: [formatDate(this.product.IssueDate, 'yyyy-MM-dd', 'en'), Validators.required],
			Coupon: [this.product.Coupon, Validators.required],
			Denomination: [this.product.Denomination, Validators.required],
			PaymentType: [this.product.PaymentType, Validators.required],
			MaturityDate: [formatDate(this.product.MaturityDate, 'yyyy-MM-dd', 'en'), Validators.required],
			CouponPaymentDate: [formatDate(this.product.CouponPaymentDate, 'yyyy-MM-dd', 'en'), Validators.required],
			CouponStartDate: [formatDate(this.product.CouponStartDate, 'yyyy-MM-dd', 'en'), Validators.required],
			FinalCouponDate: [formatDate(this.product.FinalCouponDate, 'yyyy-MM-dd', 'en'), Validators.required],
			Floater: [this.product.Floater, Validators.required]
		});

		// this.filteredManufactures = this.productForm.controls.manufacture.valueChanges
		// 	.pipe(
		// 		startWith(''),
		// 		map(val => this.filterManufacture(val.toString()))
		// 	);
		// this.filteredColors = this.productForm.controls.color.valueChanges
		// 	.pipe(
		// 		startWith(''),
		// 		map(val => this.filterColor(val.toString()))
		// 	);
	}

	/**
	 * Filter manufacture
	 *
	 * @param val: string
	 */
	filterManufacture(val: string): string[] {
		return AVAILABLE_MANUFACTURES.filter(option =>
			option.toLowerCase().includes(val.toLowerCase()));
	}

	/**
	 * Filter color
	 *
	 * @param val: string
	 */
	filterColor(val: string): string[] {
		return AVAILABLE_COLORS.filter(option =>
			option.toLowerCase().includes(val.toLowerCase()));
	}

	/**
	 * Go back to the list
	 *
	 * @param id: any
	 */
	goBack(id) {
		this.loadingSubject.next(false);
		const url = `/ecommerce/products?id=${id}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	goBackWithoutId() {
		this.router.navigateByUrl('/ecommerce/products', { relativeTo: this.activatedRoute });
	}

	/**
	 * Refresh product
	 *
	 * @param isNew: boolean
	 * @param id: number
	 */
	refreshProduct(isNew: boolean = false, id = 0) {
		this.loadingSubject.next(false);
		let url = this.router.url;
		if (!isNew) {
			this.router.navigate([url], { relativeTo: this.activatedRoute });
			return;
		}

		url = `/ecommerce/products/edit/${id}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	/**
	 * Reset
	 */
	reset() {
		this.product = Object.assign({}, this.oldProduct);
		this.createForm();
		this.hasFormErrors = false;
		this.productForm.markAsPristine();
		this.productForm.markAsUntouched();
		this.productForm.updateValueAndValidity();
	}

	/**
	 * Save data
	 *
	 * @param withBack: boolean
	 */
	onSumbit(withBack: boolean = false) {
		this.hasFormErrors = false;
		const controls = this.productForm.controls;
		/** check form */
		if (this.productForm.invalid && controls.type.value !='Fund') {
			console.log('*****(((((((((')
			console.log(this.productForm)
			console.log(this.productForm.invalid)
			console.log('*****(((((((((')

			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			this.selectedTab = 0;
			return;
		}

		// tslint:disable-next-line:prefer-const
		let editedProduct = this.prepareProduct();

		if (editedProduct.id > 0) {
			this.updateProduct(editedProduct, withBack);
			return;
		}

		this.addProduct(editedProduct, withBack);
	}

	/**
	 * Returns object for saving
	 */
	prepareProduct(): ProductModel {
		const controls = this.productForm.controls;
		const _product = new ProductModel();
		_product.id = this.product.id;
		// _product.model = controls.model.value;
		// _product.manufacture = controls.manufacture.value;
		// _product.modelYear = +controls.modelYear.value;																																																																																																																																																							
		// _product.mileage = +controls.mileage.value;
		// _product.description = controls.description.value;
		// _product.color = controls.color.value;									
		// _product.price = +controls.price.value;
		// _product.condition = +controls.condition.value;
		// _product.status = +controls.status.value;
		// _product.VINCode = controls.VINCode.value;
		// _product.topic = controls.model.value;
		_product.type = controls.type.value;
		// _product.date = controls.date.value;
		if(controls.ISIN)
			_product.ISIN = controls.ISIN.value;
		_product.Issuer = controls.Issuer.value;
		if(controls.IssueVolume)																																																																							
			_product.IssueVolume = controls.IssueVolume.value;
		if(controls.Currency)																																																																							
			_product.Currency = controls.Currency.value;
		if(controls.IssuePrice)																																																																							
			_product.IssuePrice = controls.IssuePrice.value;
		if(controls.IssueDate)																																																																							
			_product.IssueDate = controls.IssueDate.value;
		if(controls.Coupon)																																																																							
			_product.Coupon = controls.Coupon.value;
		if(controls.Denomination)																																																																							
			_product.Denomination = controls.Denomination.value;
		if(controls.PaymentType)																																																																							
		_product.PaymentType = controls.PaymentType.value;
		if(controls.MaturityDate)																																																																							
		_product.MaturityDate = controls.MaturityDate.value;
		if(controls.CouponPaymentDate)																																																																							
		_product.CouponPaymentDate = controls.CouponPaymentDate.value;
		if(controls.CouponStartDate)																																																																							
		_product.CouponStartDate = controls.CouponStartDate.value;
		if(controls.FinalCouponDate)																																																																							
		_product.FinalCouponDate = controls.FinalCouponDate.value;
		if(controls.FinalCouponDate)																																																																							
		_product.Floater = controls.Floater.value;
		_product._userId = 1; // TODO: get version from userId
		_product._createdDate = this.product._createdDate;
		_product._updatedDate = this.product._updatedDate;
		_product._updatedDate = this.typesUtilsService.getDateStringFromDate();
		_product._createdDate = this.product.id > 0 ? _product._createdDate : _product._updatedDate;
		_product.uploadUrl = this.uploadUrl;
		return _product;
	}

	/**
	 * Add product
	 *
	 * @param _product: ProductModel
	 * @param withBack: boolean
	 */
	addProduct(_product: ProductModel, withBack: boolean = false) {
		this.loadingSubject.next(true);
		this.store.dispatch(new ProductOnServerCreated({ product: _product }));
		this.componentSubscriptions = this.store.pipe(
			delay(1000),
			select(selectLastCreatedProductId)
		).subscribe(newId => {
			if (!newId) {
				return;
			}

			this.loadingSubject.next(false);
			if (withBack) {
				this.goBack(newId);
			} else {
				const message = `New product successfully has been added.`;
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
				this.refreshProduct(true, newId);
			}
		});
	}

	/**
	 * Update product
	 *
	 * @param _product: ProductModel
	 * @param withBack: boolean
	 */
	updateProduct(_product: ProductModel, withBack: boolean = false) {
		this.loadingSubject.next(true);

		const updateProduct: Update<ProductModel> = {
			id: _product.id,
			changes: _product
		};

		this.store.dispatch(new ProductUpdated({
			partialProduct: updateProduct,
			product: _product
		}));

		of(undefined).pipe(delay(3000)).subscribe(() => { // Remove this line
			if (withBack) {
				this.goBack(_product.id);
			} else {
				const message = `Product successfully has been saved.`;
				this.layoutUtilsService.showActionNotification(message, MessageType.Update, 10000, true, true);
				this.refreshProduct(false);
			}
		}); // Remove this line
	}

	/**
	 * Returns component title
	 */
	getComponentTitle() {
		let result = 'Create product';
		if (!this.product || !this.product.id) {
			return result;
		}

		// result = `Edit product - ${this.product.manufacture} ${this.product.model}, ${this.product.modelYear}`;
		result = `Edit product - ${this.product.type} - ${this.product.Issuer}`;
		return result;
	}

	/**
	 * Close alert
	 *
	 * @param $event
	 */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}
	typeChange(event){
		// console.log(event)
		if(event == 'Fund')
			this.flagFund = false;
		else
			this.flagFund = true;
		// console.log('typechange')
	}
	fileChangeEvent(fileInput){
		if (fileInput.target.files && fileInput.target.files[0]) {
			console.log('filechange')
			console.log(fileInput.target.files[0])
			var file = fileInput.target.files[0];
			var fileName = file.name.split('.').slice(0,-1).join('.') + '_' +  new Date().getTime();
			var filePath = `Bank/${fileName}`;
			const fileRef = this.storage.ref(filePath)
			this.storage.upload(filePath, file).snapshotChanges().pipe(
				finalize(()=>{  
					fileRef.getDownloadURL().subscribe((url)=>{
						this.uploadUrl = url;
						this.layoutUtilsService.showActionNotification('Upload Sucessfully!', MessageType.Update, 5000, true, true);
					})
				})
			).subscribe();
		}
	}
}
// 