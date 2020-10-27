// Angular
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
// Services and Models
import { finalize, takeUntil, tap } from 'rxjs/operators';

import {
	UserUpdated,
} from '../../../core/auth';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
	selector: 'kt-settingsadmin',
	templateUrl: './settingsadmin.component.html',
	styleUrls: ['settingsadmin.component.scss'],
})
export class SettingsadminComponent implements OnInit, AfterViewInit {

	// @ViewChild('wizard', {static: true}) el: ElementRef;
	user$: Observable<User>;
	oldUser:User;
	model: any = {
		fname: '',
		lname: '',
		phone: '',
		email: '',
		hash:'',
	};
	submitted = false;
	constructor(private activatedRoute: ActivatedRoute,
		private router: Router,
		private auth: AuthService,
		private store: Store<AppState>,
		 private layoutUtilsService: LayoutUtilsService,) {
	}

	ngOnInit() {
		this.user$ = this.store.pipe(select(currentUser));
		this.user$.subscribe(res=>{
			
			if(res && res['firstName']){
				this.oldUser = res
				this.model.fname= res.firstName;
				this.model.lname= res.lastName;
				this.model.phone= res.phoneNumber;
				this.model.email= res.emailAddress;
			// 	if(res['countryCitizenship'])
			// 		this.model.citizenship= res.countryCitizenship;
			// 	if(res['countryResidence'])
			// 		this.model.residence = res.countryResidence;
			// if(res['addField1'])
			// 	this.model.addField1 = res['addField1'];
			// if(res['addField2'])
			// 	this.model.addField2 = res['addField2'];
			// if(res['addField3'])
			// 	this.model.addField3 = res['addField3'];
			// if(res['addField4'])
			// 	this.model.addField4 = res['addField4'];
			console.log('aa')
		}})

		
	}

	ngAfterViewInit(): void {
		// Initialize form wizard
		// const wizard = new KTWizard(this.el.nativeElement, {
		// 	startStep: 1
		// });

		// // Validation before going to next page
		// wizard.on('beforeNext', (wizardObj) => {
		// 	// https://angular.io/guide/forms
		// 	// https://angular.io/guide/form-validation

		// 	// validate the form and use below function to stop the wizard's step
		// 	// wizardObj.stop();
		// });

		// // Change event
		// wizard.on('change', () => {
		// 	setTimeout(() => {
		// 		KTUtil.scrollTop();
		// 	}, 500);
		// });
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
		newUser.hash = this.model['hash'];
		newUser.userStatus = 'Verified';
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
}
