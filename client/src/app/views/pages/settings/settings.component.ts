// Angular
import { AfterViewInit, Input,Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../core/reducers';
import { currentUser,  User, AuthService } from '../../../core/auth';
import { Update } from '@ngrx/entity';
// Layout
import { SubheaderService, LayoutConfigService } from '../../../core/_base/layout';
import { LayoutUtilsService, MessageType } from '../../../core/_base/crud';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from '../../../../environments/environment';
import { shuffle } from 'lodash';

declare var $: any;
export interface Widget4Data {
	icon?: string;
	pic?: string;
	title?: string;
	username?: string;
	desc?: string;
	url?: string;
}
// Services and Models
import { finalize, takeUntil, tap } from 'rxjs/operators';

import {
	UserUpdated,
} from '../../../core/auth';
import { ActivatedRoute, Router } from '@angular/router';
var userId;
var globalstorage:AngularFireStorage;
var globalservice:AuthService;
var newUploadingDataOut: any[] = [];

@Component({
	selector: 'kt-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['settings.component.scss'],
})
export class SettingsComponent implements OnInit, AfterViewInit {
	 data: any = [];
	 newUploadingData: any[] = [];

	@ViewChild('wizard', {static: true}) el: ElementRef;
	user$: Observable<User>;
	oldUser:User;
	model: any = {
		atype:'',
		cdirector:'',
		nbusiness:'',
		namecompany:'',
		estatus: '',
		nemployer: '',
		ncompanyEm: '',
		iknowledge: '',
		nworth: '',
		fname1: '',
		lname1: '',
		fname: '',
		lname: '',
		phone: '',
		email: '',
		citizenship: '',
		residence: '',
		addField1:'',
		addField2:'',
		addField3:'',
		addField4:'',
		newPass:'',
	};
	submitted = false;
	constructor(private activatedRoute: ActivatedRoute,
		private router: Router,
		private auth: AuthService,
		private store: Store<AppState>,
		private storage:AngularFireStorage,
		private layoutUtilsService: LayoutUtilsService,) {
			globalstorage = this.storage;
			globalservice= this.auth;
	}

	ngOnInit() {
	// if (!this.data) {
	// 					this.data= [
	// 						{
	// 							pic: './assets/media/files/doc.svg',
	// 							title: 'Metronic Documentation',
	// 							url: 'https://keenthemes.com.my/metronic',
	// 						}, {
	// 							pic: './assets/media/files/jpg.svg',
	// 							title: 'Project Launch Evgent',
	// 							url: 'https://keenthemes.com.my/metronic',
	// 						}, {
	// 							pic: './assets/media/files/pdf.svg',
	// 							title: 'Full Developer Manual For 4.7',
	// 							url: 'https://keenthemes.com.my/metronic',
	// 						}, {
	// 							pic: './assets/media/files/javascript.svg',
	// 							title: 'Make JS Development',
	// 							url: 'https://keenthemes.com.my/metronic',
	// 						}, {
	// 							pic: './assets/media/files/zip.svg',
	// 							title: 'Download Ziped version OF 5.0',
	// 							url: 'https://keenthemes.com.my/metronic',
	// 						}, {
	// 							pic: './assets/media/files/pdf.svg',
	// 							title: 'Finance Report 2016/2017',
	// 							url: 'https://keenthemes.com.my/metronic',
	// 						},
	// 					];
	// 				}
		Dropzone.autoDiscover = false;
		this.user$ = this.store.pipe(select(currentUser));
		this.user$.subscribe(res=>{
		
			if(res && res['firstName']){
				userId = res._id;
				this.auth.getDatas(userId).subscribe((resData) =>{
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
			
				$(document).ready(function() {
					$('#kt_dropzone_2').dropzone({
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
								var filePath = `Stock/${userId}/${fileName}`;
								const fileRef = globalstorage.ref(filePath)
								newUploadingDataOut.push({'name':file.name,'size':file.size});
								globalstorage.upload(filePath, file).snapshotChanges().pipe(
									finalize(()=>{  
										fileRef.getDownloadURL().subscribe((url)=>{
											globalservice.addFiles(userId,fileName, url).subscribe((res11)=>{
											console.log(res11);
										})
										})
									})
								).subscribe();
								// done("Naha, you don't.");
							} else {
								console.log(file)
								done();
							}
						}
					});
				});
				this.oldUser = res
				this.model.fname= res.firstName;
				this.model.lname= res.lastName;
				this.model.phone= res.phoneNumber;
				this.model.email= res.emailAddress;
			
				this.model.fname1= res.firstNameTwo;
				this.model.lname1= res.lastNameTwo;
				this.model.atype= res.accountType;
				this.model.cdirector= res.companyDirector;
				this.model.nbusiness= res.natureBusiness;
				this.model.namecompany= res.nameCompany;
				this.model.estatus= res.employmentStatus;
				this.model.nemployer= res.nameEmployer;
				this.model.ncompanyEm= res.nameCompanyEm;
				this.model.iknowledge= res.investmentKnowledge;
				this.model.nworth= res.netWorth;
				
			
				if(res['countryCitizenship'])
					this.model.citizenship= res.countryCitizenship;
				if(res['countryResidence'])
					this.model.residence = res.countryResidence;
			if(res['addField1'])
				this.model.addField1 = res['addField1'];
			if(res['addField2'])
				this.model.addField2 = res['addField2'];
			if(res['addField3'])
				this.model.addField3 = res['addField3'];
			if(res['addField4'])
				this.model.addField4 = res['addField4'];
			console.log('aa')
			console.log(res)
		}})

		
	}

	ngAfterViewInit(): void {
		// $('#kt_dropzone_2').dropzone({
        //     url: "https://keenthemes.com/scripts/void.php",
        //     paramName: "file",
        //     maxFiles: 10,
        //     maxFilesize: 10,
        //     addRemoveLinks: true,
        //     accept: function (file, done) {
        //         if (file.name == "justinbieber.jpg") {
        //             done("Naha, you don't.");
        //         }
        //         else {
        //             done();
        //         }
        //     }
        // });
		// Initialize form wizard
		const wizard = new KTWizard(this.el.nativeElement, {
			startStep: 1
		});

		// Validation before going to next page
		wizard.on('beforeNext', (wizardObj) => {
			// https://angular.io/guide/forms
			// https://angular.io/guide/form-validation

			// validate the form and use below function to stop the wizard's step
			// wizardObj.stop();
		});

		// Change event
		wizard.on('change', () => {
			setTimeout(() => {
				KTUtil.scrollTop();
			}, 500);
		});
	}
	completed(){
		this.newUploadingData = newUploadingDataOut;
		console.log('complted')
		console.log(this.newUploadingData)
	}
	onSubmit() {
		this.submitted = true;
		var newUser:any = {id:0,_id:'sdfsd'};
		console.log(this.oldUser)
		if(this.oldUser.id)
			newUser.id = this.oldUser.id;
		if(this.oldUser._id)
			newUser._id = this.oldUser._id;
		if(this.oldUser.accessToken)
			newUser.accessToken = this.oldUser.accessToken
		if(this.oldUser.refreshToken)
			newUser.refreshToken = this.oldUser.refreshToken
		if(this.oldUser.date)
			newUser.date = this.oldUser.date;
		if(this.oldUser.roles)
			newUser.roles = this.oldUser.roles
		newUser.firstName = this.model['fname'];
		newUser.lastName = this.model['lname'];
		newUser.emailAddress = this.model['email'];
		newUser.phoneNumber = this.model['phone'];
		newUser.addField1 = this.model['addField1'];
		newUser.addField2 = this.model['addField2'];
		newUser.addField3 = this.model['addField3'];
		newUser.addField4 = this.model['addField4'];

		newUser.firstNameTwo = this.model['fname1'];
		newUser.lastNameTwo = this.model['lname1'];
		newUser.accountType = this.model['atype']; 
		newUser.companyDirector = this.model['cdirector'];
		newUser.natureBusiness = this.model['nbusiness'];
		newUser.nameCompany = this.model['namecompany'];
		newUser.employmentStatus = this.model['estatus'];
		newUser.nameEmployer = this.model['nemployer'];
		newUser.nameCompanyEm = this.model['ncompanyEm'];
		newUser.investmentKnowledge = this.model['iknowledge'];
		newUser.netWorth = this.model['nworth'];

		if(this.model['newPass'])
			newUser.hash = this.model['newPass'];
		// if(newUser.addField1 != '' && newUser.addField2 != '' && newUser.addField3 != '')
		newUser.userStatus = 'Verified';
		// else
		// newUser.userStatus = 'Unverified';

		newUser.countryResidence = this.model['residence'];
		newUser.countryCitizenship = this.model['citizenship'];
		const updatedUser: Update<User> = {
			id: this.oldUser.id,
			changes: newUser
		};
		this.auth
			.updateUser(newUser)
			.pipe(
				tap(user => {
					this.store.dispatch(new UserUpdated( { partialUser: updatedUser, user: newUser }));
					const message = `User successfully has been saved.`;
					this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
					this.refreshUser(false);
				}),
				finalize(() => {
					// this.loading = false;
					// this.cdr.markForCheck();
				})
			)
			.subscribe();
		
		// if (withBack) {
		// 	this.goBackWithId();
		// } else {
		// 	this.refreshUser(false);
		// }
	}
	refreshUser(isNew: boolean = false) {
		let url = this.router.url;
		// if (!isNew) {
		// 	this.router.navigate([url], { relativeTo: this.activatedRoute });
		// 	return;
		// }

		// url = `/user-management/users/edit/${id}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}
	fileCreate(file,_id){

	}
}
