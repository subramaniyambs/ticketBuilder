import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Brand } from '../../models/brand';
import { BrandService } from '../../services/brand.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { remove } from 'lodash';

import { merge } from 'rxjs/observable/merge';
import 'rxjs/Rx';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

@Component({
	selector: 'app-brand-listing',
	templateUrl: './brand-listing.component.html',
	styleUrls: [ './brand-listing.component.scss' ]
})
export class BrandListingComponent implements OnInit {
	brandvisible = false;
	newBrand() {
		this.brandvisible = !this.brandvisible;
	}

	brands: Brand[] = [];
	constructor(
		private brandService: BrandService,
		private router: Router,
		private snackBar: MatSnackBar,
		private ref: ChangeDetectorRef
	) {}
	displayedColumns = [ 'id', 'name', 'action' ];
	dataSource = new MatTableDataSource<Brand>();

	resultsLength = 0;
	isResultsLoading = false;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	saveBtnHanlder() {
		this.router.navigate([ 'dashboard', 'brands', 'new' ]);
	}
	editBtnHandler(id) {
		this.router.navigate([ 'dashboard', 'brands', id ]);
	}
	deleteBtnHandler(id) {
		this.brandService.deleteBrand(id).subscribe(
			(data) => {
				const removedItems = remove(this.dataSource.data, (item) => {
					return item._id === data._id;
				});
				this.dataSource.data = [ ...this.dataSource.data ];
				this.snackBar.open('Brand deleted', 'Success', {
					duration: 2000
				});
			},
			(err) => this.errorHandler(err, 'Failed to delete Brand')
		);
	}
	ngOnInit() {}
	filterText(filterValue: string) {
		this.isResultsLoading = true;
		filterValue = filterValue.slice();
		this.paginator.pageIndex = 0;
		this.brandService
			.getBrands({
				page: this.paginator.pageIndex,
				perPage: this.paginator.pageSize,
				sortField: this.sort.active,
				sortDir: this.sort.direction,
				filter: filterValue
			})
			.subscribe(
				(data) => {
					this.dataSource.data = data.docs;
					this.resultsLength = data.total;
					this.isResultsLoading = false;
				},
				(err) => this.errorHandler(err, 'Failed to filter Brands')
			);
		this.dataSource.sort = this.sort;
	}
	// applyFilter(filterValue: string) {
	// 	this.dataSource.filter = filterValue.trim().toLowerCase();
	//   }
	ngAfterViewChecked() {
		//Called after every check of the component's view. Applies to components only.
		//Add 'implements AfterViewChecked' to the class.
		this.ref.detectChanges();
	}
	ngAfterViewInit() {
		//Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
		this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
		merge(this.paginator.page, this.sort.sortChange)
			.pipe(
				startWith({}),
				switchMap(() => {
					this.isResultsLoading = true;
					return this.brandService.getBrands({
						page: this.paginator.pageIndex,
						perPage: this.paginator.pageSize,
						sortField: this.sort.active,
						sortDir: this.sort.direction,
						filter: ''
					});
				}),
				map((data) => {
					this.isResultsLoading = false;
					this.resultsLength = data.total;
					return data.docs;
				}),
				catchError(() => {
					this.isResultsLoading = false;
					this.errorHandler('Failed to fetch Brands', 'Error');
					return observableOf([]);
				})
			)
			.subscribe((data) => {
				this.dataSource.data = data;
			});
	}
	private errorHandler(error, message) {
		this.isResultsLoading = false;
		console.error(error);
		this.snackBar.open(message, 'Error', {
			duration: 2000
		});
	}

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
