// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
import { currentUser, Logout, User } from '../../../../../core/auth';

@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html',
	providers: [NgbPopoverConfig] // add NgbPopoverConfig to the component providers
})
export class UserProfileComponent implements OnInit {
	// Public properties
	user$: Observable<User>;

	@Input() avatar = true;
	@Input() greeting = true;
	@Input() badge: boolean;
	@Input() icon: boolean;

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(private store: Store<AppState>,config: NgbPopoverConfig) {
		config.placement = 'bottom';
		config.triggers = 'hover';
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.user$ = this.store.pipe(select(currentUser));
	}

	/**
	 * Log out
	 */
	logout() {
		this.store.dispatch(new Logout());
		localStorage.removeItem('ReqInfo')
		localStorage.removeItem('UserInfo')
	}
	gotoSetting(){
		alert('1')
	}
}
