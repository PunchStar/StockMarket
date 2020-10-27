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
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { finalize, takeUntil, tap } from 'rxjs/operators';

import {
	UserUpdated,
} from '../../../core/auth';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
	selector: 'kt-uploadmanage',
	templateUrl: './uploadmanage.component.html',
	styleUrls: ['uploadmanage.component.scss'],
})
export class UploadmanageComponent implements OnInit, AfterViewInit {
	displayedColumns = ['userId', 'emailAddress', 'name', 'date','actions'];
	dataSource: MatTableDataSource<FileData>;
  
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;
	// @ViewChild('wizard', {static: true}) el: ElementRef;
	arrResult$: Observable<FileData[]>;
	submitted = false;
	constructor(private activatedRoute: ActivatedRoute,
		private router: Router,
		private auth: AuthService,
		private store: Store<AppState>,
		 private layoutUtilsService: LayoutUtilsService,) {
	}

	ngOnInit() {
		this.auth.getAllDatas().subscribe((res)=>{
			this.dataSource = new MatTableDataSource(res);
		});		
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	  }
	  applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	  }
	  deleteFile(data:FileData){
			const _title = 'File Delete';
			const _description = 'Are you sure to permanently delete this file?';
			const _waitDesciption = 'File is deleting...';
			const _deleteMessage = `File has been deleted`;
			const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
			dialogRef.afterClosed().subscribe(res => {
				if (!res) {
					return;
				}
			})
			this.auth.delFile(data._id).subscribe((resN)=>{
				this.auth.getAllDatas().subscribe((res)=>{
					this.dataSource = new MatTableDataSource(res);
				});	
			})
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
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
  export interface FileData {
	userId:User;
	date:Date;
	src:string;
	name:string;
	_id:string;
}