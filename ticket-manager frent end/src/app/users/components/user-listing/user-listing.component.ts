import { UserFormDialogComponent } from './../user-form-dialog/user-form-dialog.component';
import { Component, OnInit, AfterViewInit, AfterViewChecked, ChangeDetectorRef, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user-model';
import { remove } from 'lodash';
import { Router } from '@angular/router';
import {
	MatSnackBar,
	MatPaginator,
	MatSort,
	MatTableDataSource,
	MatDialog,
	MAT_DIALOG_DATA,
	MatDialogRef
} from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent implements OnInit {
	users: User[] = [];
	uservisible = false;
	newUser() {
		this.uservisible = !this.uservisible;
	}
  
  
	constructor(
		private userService: UserService,
		private router: Router,
		public dialog: MatDialog, 
		private snackBar: MatSnackBar,
		private ref: ChangeDetectorRef
	) {}
	displayedColumns = [ 'id',  'email','name', 'phone','address','action' ];
	dataSource = new MatTableDataSource<User>();
	resultsLength = 0;
	isResultsLoading = false;
	user: User;
	errorHandler :any;


	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	saveBtnHanlder() {
		this.router.navigate([ 'dashboard', 'users', 'new' ]);
	}

	deleteBtnHandler(id) {
		this.userService.deleteUser(id).subscribe(
			(data) => {
				const removedItems = remove(this.dataSource.data, (item) => {
					return item._id === data._id;
				});
				this.dataSource.data = [ ...this.dataSource.data ];
				this.snackBar.open('User deleted', 'Success', {
					duration: 2000
				});
			},
			(err) => this.errorHandler(err, 'Failed to delete User')
		);
	}
	ngOnInit() {
		this.isResultsLoading = true;
		this.userService.findAll().subscribe(
			(data) => {
				this.dataSource.data = data;
			},
			(err) => console.error(err),
			() => (this.isResultsLoading = false)
		);
		}

		openDialog(userId: string): void {
			const options = {
				width: '400px',
				height: '600px',
				data: {}
			};
			if (userId) {
				options.data = { userId: userId };
			}
			let dialogRef = this.dialog.open(UserFormDialogComponent, options);
			dialogRef
				.afterClosed()
				.filter((userParam) => typeof userParam === 'object')
				.flatMap((result) => {
					return userId
						? this.userService.updateUser(userId, result)
						: this.userService.createUser(result);
				})
				.subscribe(
					(user) => {
						let successMsg = '';
						if (userId) {
							const index = this.dataSource.data.findIndex((user) => user._id === userId);
							this.dataSource.data[index] = user;
							successMsg = 'User updated';
						} else {
							this.dataSource.data.push(user);
							successMsg = 'user created';
						}
						this.dataSource.data = [ ...this.dataSource.data ];
						this.snackBar.open(successMsg, 'Success', {
							duration: 2000
						});
					},
					
				);
				this.dataSource.sort = this.sort;
		}
	
	// filterText(filterValue: string) {
	// 	this.isResultsLoading = true;
	// 	filterValue = filterValue.trim();
	// 	this.paginator.pageIndex = 0;
	// 	this.userService
	// 		.getUsers({
	// 			page: this.paginator.pageIndex,
	// 			perPage: this.paginator.pageSize,
	// 			sortField: this.sort.active,
	// 			sortDir: this.sort.direction,
	// 			filter: filterValue
	// 		})
	// 		.subscribe(
	// 			(data) => {
	// 				this.dataSource.data = data.docs;
	// 				this.resultsLength = data.total;
	// 				this.isResultsLoading = false;
	// 			},
	// 			(err) => this.errorHandler(err, 'Failed to filter Users')
	// 		);
	// }
	// applyFilter(filterValue: string) {
	// 	this.dataSource.filter = filterValue.trim().toLowerCase();
	//   }
	// ngAfterViewChecked() {
	// 	//Called after every check of the component's view. Applies to components only.
	// 	//Add 'implements AfterViewChecked' to the class.
	// 	this.ref.detectChanges();
	// }
	// ngAfterViewInit() {
	// 	//Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
	// 	this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
	// 	merge(this.paginator.page, this.sort.sortChange)
	// 		.pipe(
	// 			startWith({}),
	// 			switchMap(() => {
	// 				this.isResultsLoading = true;
	// 				return this.userService.getUsers({
	// 					page: this.paginator.pageIndex,
	// 					perPage: this.paginator.pageSize,
	// 					sortField: this.sort.active,
	// 					sortDir: this.sort.direction,
	// 					filter: ''
	// 				});
	// 			}),
	// 			map((data) => {
	// 				this.isResultsLoading = false;
	// 				this.resultsLength = data.total;
	// 				console.log(data);
	// 				return data.docs;
					
	// 			}),
	// 			catchError(() => {
	// 				this.isResultsLoading = false;
	// 				this.errorHandler('Failed to fetch Users', 'Error');
	// 				return observableOf([]);
	// 			})
	// 		)
	// 		.subscribe((data) => {
	// 			this.dataSource.data = data;
	// 			console.log(this.dataSource)
	// 		});
	// }
	// private errorHandler(error, message) {
	// 	this.isResultsLoading = false;
	// 	console.error(error);
	// 	this.snackBar.open(message, 'Error', {
	// 		duration: 2000
	// 	});
	// }

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
	// filter(val) {
	// 	if (this.clients) {
	// 		return this.clients.filter((option) => option.name.toLowerCase().includes(val.toLowerCase()));
	// 	}
	// }
}

