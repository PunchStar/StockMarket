// Angular
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {MatTableDataSource, MatSort, MatDialog} from '@angular/material';
	// RxJS
declare var $: any;

import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
// NGRX
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AppState } from '../../../../../core/reducers';
// Layout
import { SubheaderService, LayoutConfigService } from '../../../../../core/_base/layout';
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../../../core/_base/crud';
import { environment } from '../../../../../../environments/environment';

import { shuffle } from 'lodash';

// Services and Models
import {
	User,
	UserUpdated,
	Address,
	SocialNetworks,
	selectHasUsersInStore,
	selectUserById,
	UserOnServerCreated,
	selectLastCreatedUserId,
	selectUsersActionLoading,
	AuthService
} from '../../../../../core/auth';
import {
	ProductModel,
	ProductsDataSource,
	ProductsService,
} from '../../../../../core/e-commerce';
export interface Widget4Data {
	icon?: string;
	pic?: string;
	title?: string;
	username?: string;
	desc?: string;
	url?: string;
}
import { skip, distinctUntilChanged, finalize } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { RequestsService } from '../../../../../core/e-commerce';
import { RequestsModel } from   '../../../../../core/e-commerce';
import { RequestEditDialogComponent } from '../request-edit/request-edit.dialog.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
var globaluserId;
var globalstorage:AngularFireStorage;
var globalservice:AuthService;
var newUploadingDataOut: any[] = [];

export class PasswordValidation {
	/**
	 * MatchPassword
	 *
	 * @param AC: AbstractControl
	 */
		static MatchPassword(AC: AbstractControl) {
				const password = AC.get('newpassword').value; // to get value in input tag
				const confirmPassword = AC.get('newconfirmPassword').value; // to get value in input tag
				if (password !== confirmPassword) {
			AC.get('newconfirmPassword').setErrors( {MatchPassword: true} );
				} else {
						return null;
				}
		}
}
@Component({
	selector: 'kt-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['user-edit.component.scss'],

})
export class UserEditComponent implements OnInit, OnDestroy , AfterViewInit {
	data: any = [];
	newUploadingData: any[] = [];
	format = new Intl.NumberFormat('en-GB', { 
		style: 'currency', 
		currency: 'GBP', 
		minimumFractionDigits: 2, 
	}); 
	dataSource: ProductsDataSource;
	productsResult: ProductModel[] = [];
	requestResult: RequestsModel[] = [];
	productsResultTemp: ProductModel[] = [];
	
	// Public properties
	displayedColumns = ['id', 'type', 'topic', 'equity','date','option'];
	dataSourceTB = new MatTableDataSource(this.requestResult);
	@ViewChild(MatSort, {static: true}) sort: MatSort;

	user: User;
	assignNewModel ={
		type:'',
		topic:'',
		equity:0,
		date:new Date('01/01/20')
	}
	selectedAccount = 'Individual Account';
	userId$: Observable<number>;
	oldUser: User;
	selectedTab = 0;
	loading$: Observable<boolean>;
	rolesSubject = new BehaviorSubject<number[]>([]);
	// addressSubject = new BehaviorSubject<Address>(new Address());
	citizenship = new BehaviorSubject<string>('');
	rediance = new BehaviorSubject<string>('');

	employmentstatus = new BehaviorSubject<string>('');
	namecompanyEm = new BehaviorSubject<string>('');
	nameemployer = new BehaviorSubject<string>('');
	investmentknowledge = new BehaviorSubject<string>('');
	networth = new BehaviorSubject<string>('');

	soicialNetworksSubject = new BehaviorSubject<SocialNetworks>(new SocialNetworks());
	userForm: FormGroup;
	hasFormErrors = false;
	addNewForm:FormGroup;
	hasFormErrors1 = false;
	hasFormErrors2 = false;
	// Private properties
	private subscriptions: Subscription[] = [];
	changePassForm: FormGroup;

	/**
	 * Component constructor
	 *
	 * @param activatedRoute: ActivatedRoute
	 * @param router: Router
	 * @param userFB: FormBuilder
	 * @param subheaderService: SubheaderService
	 * @param layoutUtilsService: LayoutUtilsService
	 * @param store: Store<AppState>
	 * @param layoutConfigService: LayoutConfigService
	 */
	constructor(private activatedRoute: ActivatedRoute,
				   private router: Router,
					public dialog: MatDialog,
		           private userFB: FormBuilder,
		           private subheaderService: SubheaderService,
				   private layoutUtilsService: LayoutUtilsService,
				   private pservice: ProductsService,
					private storage:AngularFireStorage,
					private rservice: RequestsService,
					private store: Store<AppState>,
				   private auth:AuthService,
		           private layoutConfigService: LayoutConfigService) {
					   	globalstorage = this.storage;
					globalservice= this.auth;
					this.loadProductsList() }

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	loadProductsList() {
		 this.pservice.getAllProducts().subscribe((res)=> this.productsResult = res)
		
		 
		// this.dataSource = new ProductsDataSource(this.store);
		// const entitiesSubscription = this.dataSource.entitySubject.pipe(
		// 	skip(1),
		// 	distinctUntilChanged()
		// ).subscribe(res => {
		// 	this.productsResult = res;
		// 	console.log('product result')
		// 	console.log(this.productsResult)
		// });
		// this.subscriptions.push(entitiesSubscription);
		// const queryParams = new QueryParamsModel(
		// 	{},
		// 	'asc','',
		// 	0,
		// 	500
		// );
		// // Call request from server
		// this.store.dispatch(new ProductsPageRequested({ page: queryParams }));
	}

	/**
	 * Returns object for filter
	 */
	// filterConfiguration(): any {
	// 	const filter: any = {};
	// 	if (this.filterStatus && this.filterStatus.length > 0) {
	// 		filter.type = +this.filterStatus;
	// 	}
	// 	return filter;
	// }
	ngOnInit() {
		this.loading$ = this.store.pipe(select(selectUsersActionLoading));
		// this.loadProductsList();
		Dropzone.autoDiscover = false;
	   this.dataSourceTB = new MatTableDataSource(this.requestResult);
		const routeSubscription =  this.activatedRoute.params.subscribe(params => {
			const id = params.id;
			if (id && id > 0) {
				this.store.pipe(select(selectUserById(id))).subscribe(res => {
					if (res) {
						this.user = res;
						globaluserId = res._id;
						$(document).ready(function() {
							$('#kt_dropzone_1').dropzone({

								// url: "upload", // Set the url for your upload script location
								url: environment.authURL+ "upload", // Set the url for your upload script location
								paramName: "file", // The name that will be used to transfer the file
								maxFiles: 10,
								maxFilesize: 10, // MB
								addRemoveLinks: true,
								accept: (file, done)=> {
							if (file) {
										console.log('file')
										console.log(file)
										var fileName = file.name.split('.').slice(0,-1).join('.') + '_' +  new Date().getTime();
										var filePath = `Stock/${globaluserId}/${fileName}`;
										const fileRef = globalstorage.ref(filePath)
										newUploadingDataOut.push({'name':file.name,'size':file.size});
										globalstorage.upload(filePath, file).snapshotChanges().pipe(
											finalize(()=>{  
												fileRef.getDownloadURL().subscribe((url)=>{
													globalservice.addFiles(globaluserId,fileName, url).subscribe((res11)=>{
													console.log(res11);
												})
												})
											})
										).subscribe();
									} else {
										console.log(file)
										done();
									}
								}
							});
						});	
						this.rolesSubject.next(this.user.roles);
						this.citizenship.next( this.user.countryCitizenship);
						this.rediance.next(this.user.countryResidence);

						this.nameemployer.next(this.user.nameEmployer);
						this.namecompanyEm.next(this.user.nameCompanyEm);
						this.investmentknowledge.next(this.user.investmentKnowledge);
						this.employmentstatus.next(this.user.employmentStatus);
						this.networth.next(this.user.netWorth);

						this.rservice.getAllRequestId(this.user._id).subscribe((res)=> {
							this.requestResult = res;
				  			 console.log('loadproduct');
								console.log(res)
							this.dataSourceTB.data = this.requestResult;
						})
						// this.addressSubject.next(this.user.address);
						// this.soicialNetworksSubject.next(this.user.socialNetworks);
						this.oldUser = Object.assign({}, this.user);
						this.initUser();
						this.auth.getDatas(globaluserId).subscribe((resData) =>{
							var arr:any = [];
							if(resData){
								console.log('arr')
								resData.forEach(element => {
								var pic ='./assets/media/files/javascript.svg';
								if(element.type == 'doc')
									 pic = './assets/media/files/doc.svg';
								if(element.type == 'jpg')
									pic = './assets/media/files/jpg.svg';
								arr.push({'pic':pic, 'title':element.name, 'url':element.src});
							});
							if(arr.length > 0)
								this.data = shuffle(arr)
							}
							console.log('arr')
							console.log(arr)
						})
						
					}
				});
			
			} else {
				this.user = new User();
				this.user.clear();
				this.rolesSubject.next(this.user.roles);
				this.citizenship.next( this.user.countryCitizenship);
				this.rediance.next(this.user.countryResidence);

				this.networth.next(this.user.netWorth);
				this.nameemployer.next(this.user.nameEmployer);
				this.namecompanyEm.next(this.user.nameCompanyEm);
				this.employmentstatus.next(this.user.employmentStatus);
				this.investmentknowledge.next(this.user.investmentKnowledge);
				// this.addressSubject.next(this.user.address);
				// this.soicialNetworksSubject.next(this.user.socialNetworks);
				this.oldUser = Object.assign({}, this.user);
				this.initUser();
			}
		});
		this.subscriptions.push(routeSubscription);
	}
	ngAfterViewInit() {
		this.dataSourceTB.sort = this.sort;
	  }
	ngOnDestroy() {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}

	/**
	 * Init user
	 */
	initUser() {
		this.createForm();
		this.createNewForm();
		if (!this.user.id) {
			this.subheaderService.setTitle('Create user');
			this.subheaderService.setBreadcrumbs([
				{ title: 'User Management', page: `user-management` },
				{ title: 'Users',  page: `user-management/users` },
				{ title: 'Create user', page: `user-management/users/add` }
			]);
			return;
		}
		this.subheaderService.setTitle('Edit user');
		this.subheaderService.setBreadcrumbs([
			{ title: 'User Management', page: `user-management` },
			{ title: 'Users',  page: `user-management/users` },
			{ title: 'Edit user', page: `user-management/users/edit`, queryParams: { id: this.user.id } }
		]);
	}

	/**
	 * Create form
	 */
	createForm() {
	this.userForm = this.userFB.group({
			// username: [this.user.username, Validators.required],
			accountType: [this.user.accountType, Validators.required],
			companyDirector: [this.user.companyDirector, Validators.required],
			natureBusiness: [this.user.natureBusiness, Validators.required],
			nameCompany: [this.user.nameCompany, Validators.required],
			firstNameTwo: [this.user.firstNameTwo, Validators.required],
			lastNameTwo: [this.user.lastNameTwo, Validators.required],
			firstName: [this.user.firstName, Validators.required],
			lastName: [this.user.lastName, Validators.required],
			emailAddress: [this.user.emailAddress, Validators.email],
			phoneNumber: [this.user.phoneNumber],
			// companyName: [this.user.companyName],
			// occupation: [this.user.occupation]
		});
		this.changePassForm = this.userFB.group({
			newpassword: ['',Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])],
			newconfirmPassword: ['',Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])],
		}, {
			validator: PasswordValidation.MatchPassword
		});
	}
	createNewForm() {
		this.addNewForm = this.userFB.group({
			// username: [this.user.username, Validators.required],
			newType: ['', Validators.required],
			newTopic: ['', Validators.required],
			newEquity: [0, Validators.required],
			newDate: [formatDate(new Date('01/01/2020'), 'yyyy-MM-dd', 'en'), Validators.required],
			// companyName: [this.user.companyName],
			// occupation: [this.user.occupation]
		});
	}
	/**
	 * Redirect to list
	 *
	 */
	goBackWithId() {
		const url = `/user-management/users`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	/**
	 * Refresh user
	 *
	 * @param isNew: boolean
	 * @param id: number
	 */
	refreshUser(isNew: boolean = false, id = 0) {
		let url = this.router.url;
		if (!isNew) {
			this.router.navigate([url], { relativeTo: this.activatedRoute });
			return;
		}

		url = `/user-management/users/edit/${id}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	/**
	 * Reset
	 */
	reset() {
		this.user = Object.assign({}, this.oldUser);
		this.createForm();
		this.createNewForm();
		this.hasFormErrors = false;
		this.userForm.markAsPristine();
  this.userForm.markAsUntouched();
  this.userForm.updateValueAndValidity();
	}
	a(){
		// alert('1')
	}
	/**
	 * Save data
	 *
	 * @param withBack: boolean
	 */
	onSumbit(withBack: boolean = false) {
		// alert('submit')
		this.hasFormErrors = false;
		const controls = this.userForm.controls;
		/** check form */
		if (this.tvalidCheck()) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			this.selectedTab = 0;
			return;
		}

		const editedUser = this.prepareUser();

		if (editedUser.id > 0) {
			this.updateUser(editedUser, withBack);
			return;
		}

		this.addUser(editedUser, withBack);
	}

	/**
	 * Returns prepared data for save
	 */
	prepareUser(): User {
		const controls = this.userForm.controls;
		const _user = new User();
		_user.clear();
		_user.roles = this.rolesSubject.value;
		// _user.address = this.addressSubject.value;
		// _user.socialNetworks = this.soicialNetworksSubject.value;
		_user.accessToken = this.user.accessToken;
		_user.refreshToken = this.user.refreshToken;
		_user.date = this.user.date;
		_user.pic = this.user.pic;
		_user.id = this.user.id;
		// _user.username = controls.username.value;
		_user.emailAddress = controls.emailAddress.value;
		_user.firstName = controls.firstName.value;
		_user.lastName = controls.lastName.value;
		// _user.occupation = controls.occupation.value;
		_user.phoneNumber = controls.phoneNumber.value;
		// _user.companyName = controls.companyName.value;
		// _user.password = this.user.password;
		_user._id = this.user._id;
		// _user.hash = this.user.hash;
		// _user.salt = this.user.salt;
		_user.addField1 = this.user.addField1;
		_user.addField2 = this.user.addField2;
		_user.addField3 = this.user.addField3;
		_user.addField4 = this.user.addField4;
		_user.userStatus = this.user.userStatus;

		_user.companyDirector = controls.companyDirector.value;
		_user.accountType = controls.accountType.value;
		_user.natureBusiness = controls.natureBusiness.value;
		_user.nameCompany = controls.nameCompany.value;
		_user.firstNameTwo = controls.firstNameTwo.value;
		_user.lastNameTwo = controls.lastNameTwo.value;

		return _user;
	}

	/**
	 * Add User
	 *
	 * @param _user: User
	 * @param withBack: boolean
	 */
	addUser(_user: User, withBack: boolean = false) {
		// alert('addUser')
		this.store.dispatch(new UserOnServerCreated({ user: _user }));
		this.auth.getAllUsers().subscribe((reqRes)=>{
			localStorage.setItem('UserInfo',JSON.stringify(reqRes))
		});
		const addSubscription = this.store.pipe(select(selectLastCreatedUserId)).subscribe(newId => {
			const message = `New user successfully has been added.`;
			this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
			if (newId) {
				if (withBack) {
					this.goBackWithId();
				} else {
					this.refreshUser(true, newId);
				}
			}
		});
		this.subscriptions.push(addSubscription);
	}

	/**
	 * Update user
	 *
	 * @param _user: User
	 * @param withBack: boolean
	 */
	updateUser(_user: User, withBack: boolean = false) {
		// Update User
		// tslint:disable-next-line:prefer-const
		_user.countryCitizenship = this.citizenship.getValue();
		_user.countryResidence = this.rediance.getValue();
		const updatedUser: Update<User> = {
			id: _user.id,
			changes: _user
		};
		this.store.dispatch(new UserUpdated( { partialUser: updatedUser, user: _user }));
		this.auth.getAllUsers().subscribe((reqRes)=>{
			localStorage.setItem('UserInfo',JSON.stringify(reqRes))
		});
		const message = `User successfully has been saved.`;
		this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
		if (withBack) {
			this.goBackWithId();
		} else {
			this.refreshUser(false);
		}
	}

	/**
	 * Returns component title
	 */
	getComponentTitle() {
		let result = 'Create user';
		if (!this.user || !this.user.id) {
			return result;
		}

		result = `Edit user - ${this.user.firstName}`;
		return result;
	}

	/**
	 * Close Alert
	 *
	 * @param $event: Event
	 */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}
	onChangeType(event){
		console.log('onchangetype')
		const controls = this.addNewForm.controls;

		this.productsResultTemp = this.productsResult.filter((element)=> (element.type == controls.newType.value))
	}
	onSumbit1(userId:string) {
		this.hasFormErrors1 = false;
		const controls = this.addNewForm.controls;
		/** check form */
		if (this.addNewForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.hasFormErrors1 = true;
			return;
		}
		this.rservice.createRequest({
			userId:userId,
			bankId:controls.newTopic.value,
			date:controls.newDate.value,
			equity:controls.newEquity.value,
			status:'Allow'
		}).subscribe((res)=>{
			this.rservice.getAllRequests().subscribe((sres)=>{
				localStorage.setItem('ReqInfo',JSON.stringify(sres));
				this.dataSourceTB.data = sres
			});
		})
		const message = `New Investment successfully has been added.`;
		this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
		this.refreshUser(false);
	}
	onSumbit2() {
		this.hasFormErrors2 = false;
		const controls = this.changePassForm.controls;
		/** check form */
		if (this.changePassForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.hasFormErrors2 = true;
			return;
		}
		var tempUser:any={};
		Object.assign(tempUser, this.user)
		tempUser.hash = controls.newpassword.value;
		// this.user.hash = controls.newpassword.value;
		const updatedUser: Update<User> = {
			id: tempUser.id,
			changes: tempUser
		};

		this.store.dispatch(new UserUpdated({
			partialUser: updatedUser,
			user: tempUser
		}));
		const message = `Changed Password Successfully`;
		this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, true);
		this.refreshUser(false);
	}
	editRequests(req){
		console.log('1')
		const dialogRef = this.dialog.open(RequestEditDialogComponent, { data: { 'req':req,'product':this.productsResult } });
		console.log('2')
		const _messageType = MessageType.Update;
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			this.layoutUtilsService.showActionNotification('Updated successfully', _messageType);
			this.rservice.getAllRequests().subscribe((sres)=>{
				localStorage.setItem('ReqInfo',JSON.stringify(sres));
				this.dataSourceTB.data = sres});
			// this.loadCustomersList();
		});
	}	
	delRequests(req){
		const _title = 'User Delete';
		const _description = 'Are you sure to permanently delete this Investment?';
		const _waitDesciption = 'Investment is deleting...';
		const _deleteMessage = `Investment has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			this.rservice.deleteRequest(req.id).subscribe((res)=>{
				this.rservice.getAllRequests().subscribe((sres)=>{
				localStorage.setItem('ReqInfo',JSON.stringify(sres));
				this.dataSourceTB.data = sres}
				);
				this.layoutUtilsService.showActionNotification('Deleted successfully', MessageType.Delete);
			})
		});
	}
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.changePassForm.controls[controlName];
		if (!control) {
			return false;
		}
		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
	changeAccountType(ev){
		this.selectedAccount = ev;
	}
	tvalidCheck(){
		const controls = this.userForm.controls;
		if(controls.firstName.value == '' || controls.lastName.value == '' || controls.emailAddress.value == '' || controls.phoneNumber.value == '')
			return true;
		if(controls.accountType.value == 'Joint Account'){
			if(controls.firstNameTwo.value == '' || controls.lastNameTwo.value == '')
			return true;
		}
		if(controls.accountType.value == 'Corporate Account'){
			if(controls.nameCompany.value == '' || controls.companyDirector.value == '' || controls.natureBusiness.value == '')
				return true;
		}
		return false;
	}

}
