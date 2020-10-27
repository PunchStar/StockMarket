// Angular
import { Injectable } from '@angular/core';
// RxJS
import { BehaviorSubject } from 'rxjs';
// Object path
import * as objectPath from 'object-path';
// Services
import { MenuConfigService } from './menu-config.service';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../core/reducers';
import { currentUser, Logout, User } from '../../../../core/auth';
@Injectable()
export class MenuHorizontalService {
	// Public properties
	menuList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	user$: Observable<User>;

	/**
	 * Service constructor
	 *
	 * @param menuConfigService: MenuConfigService
	 */
	constructor(private menuConfigService: MenuConfigService,private store: Store<AppState>) {
		this.loadMenu();
	}

	/**
	 * Load menu list
	 */
	loadMenu() {
				// get menu list
		// 
		// this.store.dispatch(new Logout());
		this.user$ = this.store.pipe(select(currentUser));
		this.user$.subscribe(res=>{
			// if(res.roles )
		// this.store.dispatch(new Logout());
			console.log('*****')
			console.log(res)
			console.log('*****')
			if(res){
				if(res.roles[0] == 2)
				{
					const menuItems: any[] = objectPath.get(this.menuConfigService.getMenus(), 'header.items');
							this.menuList$.next(menuItems);
				}
				else{
					const menuItems: any[] = objectPath.get(this.menuConfigService.getMenus(), 'headerAdmin.items');
							this.menuList$.next(menuItems);
				}
			}
		
		})
	}
}
