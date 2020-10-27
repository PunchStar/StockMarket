// Angular
import { AfterViewInit,ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import { AuthNoticeService, AuthService, Register, User } from '../../../../core/auth/';
import { Subject, Observable } from 'rxjs';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from '../../../../../environments/environment';

declare var $: any;
var fileUploader:any = [];
@Component({
	selector: 'kt-register',
	templateUrl: './register.component.html',
	styleUrls: ['register.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit, OnDestroy {
	registerForm: FormGroup;
	loading = false;
	errors: any = [];
	country_real: any = [];
	country_key: any = [];
	accountTypeFlag = 1;
	employmentFlag = 0;
	selected ="Individual Account";
	selectedEmployment = '';
	stepFlag = 0;
	// submitFlag = false;
	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param router: Router
	 * @param auth: AuthService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 */
	constructor(
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private router: Router,
		private auth: AuthService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private storage:AngularFireStorage,

		private cdr: ChangeDetectorRef
	) {
		this.unsubscribe = new Subject();
	}

	/*
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
    */

	/**
	 * On init
	 */
	ngOnInit() {
		this.initRegisterForm();
		$(document).ready(function() {
			$('#kt_dropzone_21').dropzone({
				// url: "upload", // Set the url for your upload script location
				url: environment.authURL + "upload", // Set the url for your upload script location
				paramName: "file", // The name that will be used to transfer the file
				maxFiles: 10,
				maxFilesize: 10, // MB
				addRemoveLinks: true,
				accept: (file, done)=> {
					if (file) {
						fileUploader.push(file);
						// done("Naha, you don't.");
					} else {
						console.log(file)
						done();
					}
				}
			});
		});
		
	}

	/*
    * On destroy
    */
	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initRegisterForm() {
		this.registerForm = this.fb.group({
			nameCompany: ['', Validators.compose([
				Validators.required,
			])
			],
			companyDirector: ['', Validators.compose([
				Validators.required,
			])
			],
			natureBusiness: ['', Validators.compose([
				Validators.required,
			])
			],
			firstName: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			lastName: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			firstNameTwo: ['', Validators.compose([
				Validators.required,
			])
			],
			lastNameTwo: ['', Validators.compose([
				Validators.required,
			])
			],
			emailAddress: ['', Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				// https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
				Validators.maxLength(320)
			]),
			],
			phoneNumber: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			]),
			],
			hash: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			confirmPassword: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			]),
			],
			employmentStatus:[''],
			nameEmployer:['', Validators.compose([
				Validators.required,
			])
			,],
			nameCompanyEm:['', Validators.compose([
				Validators.required,
			])
			,],
			investmentKnowledge:[''],
			netWorth:[''],
			accountType:['Individual Account'],
			countryCitizenship:[''],
			countryResidence:[''],
			// addFieldControl1:[''],
			// addFieldControl2:[0],
			// addFieldControl3:[''],
			agree: [false, Validators.compose([Validators.required])]
		}, {
			validator: ConfirmPasswordValidator.MatchPassword
		});
	}

	/**
	 * Form Submit
	 */
	submit() {
		const controls = this.registerForm.controls;

		// check form
		// if (this.registerForm.invalid) {
		// 	Object.keys(controls).forEach(controlName =>
		// 		controls[controlName].markAsTouched()
		// 	);
		// 	return;
		// }
		this.loading = true;
		// alert(controls.addFieldControl1.value );
		// alert(controls.addFieldControl3.value );
		// if(controls.addFieldControl1.value == '' || controls.addFieldControl3.value  == ''){
		// 	alert('Please complete all required fields');
		// 	this.loading = false;
		// 	return;
		//  }
		//  alert('ererer' );
		if (!controls.agree.value) {
			// you must agree the terms and condition
			// checkbox cannot work inside mat-form-field https://github.com/angular/material2/issues/7891
			this.authNoticeService.setNotice('You must agree the terms and condition', 'danger');
			this.loading = false;
			return;
		}
	
		
		const _user: User = new User();
		_user.clear();
		_user.companyDirector = controls.companyDirector.value;
		_user.natureBusiness = controls.natureBusiness.value;
		_user.nameCompany = controls.nameCompany.value;
		_user.emailAddress = controls.emailAddress.value;
		_user.phoneNumber = controls.phoneNumber.value;
		_user.firstName = controls.firstName.value;
		_user.lastName = controls.lastName.value;
		_user.firstNameTwo = controls.firstNameTwo.value;
		_user.lastNameTwo = controls.lastNameTwo.value;
		_user.hash = controls.hash.value;
		_user.countryCitizenship = controls.countryCitizenship.value;
		_user.countryResidence = controls.countryResidence.value;
		// _user.addField1 = controls.addFieldControl1.value;
		// _user.addField2 = controls.addFieldControl2.value.toString();
		// _user.addField3 = controls.addFieldControl3.value;
		_user.accountType = controls.accountType.value;
		_user.employmentStatus = controls.employmentStatus.value;
		_user.nameEmployer = controls.nameEmployer.value;
		_user.nameCompanyEm = controls.nameCompanyEm.value;
		_user.investmentKnowledge = controls.investmentKnowledge.value;
		_user.netWorth = controls.netWorth.value;
		_user.roles = [];
		this.auth.register(_user).pipe(
			tap(user => {
				if (user) {
					this.store.dispatch(new Register({authToken: user.accessToken}));
					if(fileUploader.length > 0){
						fileUploader.forEach(element => {
							var fileName = element.name.split('.').slice(0,-1).join('.') + '_' +  new Date().getTime();
							var filePath = `Stock/${user._id}/${fileName}`;
							const fileRef = this.storage.ref(filePath)
							this.storage.upload(filePath, element).snapshotChanges().pipe(
							finalize(()=>{  
								fileRef.getDownloadURL().subscribe((url)=>{
									this.auth.addFiles(user._id,fileName, url).subscribe((res11)=>{
									console.log(res11);
								})
							})
						})
					).subscribe();
						});
					}
					// pass notice message to the login page
					this.authNoticeService.setNotice(this.translate.instant('AUTH.REGISTER.SUCCESS'), 'success');
					this.router.navigateByUrl('/auth/login');
				} else {
					this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
				}
			}),
			takeUntil(this.unsubscribe),
			finalize(() => {
				this.loading = false;
				this.cdr.markForCheck();
			})
		).subscribe();
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.registerForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
	onAccountChange(ob){
		if(ob.value == 'Individual Account'){
			this.accountTypeFlag = 1;
		}else if(ob.value == 'Joint Account'){
			this.accountTypeFlag = 2;
		}else if(ob.value == 'Corporate Account'){
			this.accountTypeFlag = 3;
		}
	}
	onEmploymentChange(ob){
		if(ob.value == 'Employed'){
			this.employmentFlag = 1;
		}else if(ob.value == 'Self-employed'){
			this.employmentFlag = 2;
		}else{
			this.employmentFlag = 0;
		}
	}
	stepBtn(value){
		const controls = this.registerForm.controls;
		if(this.stepFlag == 0){
			if(this.selected == 'Joint Account'){
				if(controls.firstNameTwo.value == '' || controls.lastNameTwo.value == '')
				{
					alert('Please complete all required fields');
					return;
				}	
			}if(this.selected == 'Corporate Account'){
				if(controls.companyDirector.value == '' ||
				controls.natureBusiness.value== '' ||
				controls.nameCompany.value== ''){
					alert('Please complete all required fields');
					return;
				}
			}
			if(
			controls.emailAddress.value == '' ||
			controls.phoneNumber.value == '' ||
			controls.firstName.value == '' ||
			controls.lastName.value == '' ||
			controls.hash.value == '' ||
			controls.countryCitizenship.value == '' ||
			controls.countryResidence.value== ''){
				alert('Please complete all required fields');
				return;
			}
		}else if(this.stepFlag == 1){
			if(controls.employmentStatus.value == '' || controls.netWorth.value == '' || controls.investmentKnowledge.value == ''){
				alert('Please complete all required fields');
				return;
			}
			if(controls.employmentStatus.value == 'Employed' && controls.nameEmployer.value == ''){
				alert('Please complete all required fields');
				return;
			}
			if(controls.employmentStatus.value == 'Self-employed' && controls.nameCompanyEm.value == ''){
				alert('Please complete all required fields');
				return;
			}
		}
		this.stepFlag += value;
	}
}
