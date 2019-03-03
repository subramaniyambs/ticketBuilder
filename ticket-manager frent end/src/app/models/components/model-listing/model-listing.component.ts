import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ModelService } from '../../services/model.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Model } from '../../models/model';

import { remove } from 'lodash';
import 'rxjs/Rx';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { merge } from 'rxjs/observable/merge';
import { Brand } from '../../../brands/models/brand';
import { BrandService } from '../../../brands/services/brand.service';

@Component({
	selector: 'app-model-listing',
	templateUrl: './model-listing.component.html',
	styleUrls: [ './model-listing.component.scss' ]
})
export class ModelListingComponent implements OnInit {
	modelvisible = false;
	newModel() {
		this.modelvisible = !this.modelvisible;
	}

	brands: Brand[] = [];
	constructor(
		private modelService: ModelService,
		private brandService: BrandService,
		private router: Router,
		private snackBar: MatSnackBar,
		private ref: ChangeDetectorRef
	) {}
	displayedColumns = [ 'id', 'brand', 'model', 'action' ];
	dataSource = new MatTableDataSource<Model>();
	resultsLength = 0;
	isResultsLoading = false;
	model: Model;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	saveBtnHanlder() {
		this.router.navigate([ 'dashboard', 'models', 'new' ]);
	}
	editBtnHandler(id) {
		this.router.navigate([ 'dashboard', 'models', id ]);
	}
	deleteBtnHandler(id) {
		this.modelService.deleteModel(id).subscribe(
			(data) => {
				const removedItems = remove(this.dataSource.data, (item) => {
					return item._id === data._id;
				});
				this.dataSource.data = [ ...this.dataSource.data ];
				this.snackBar.open('Model deleted', 'Success', {
					duration: 2000
				});
			},
			(err) => this.errorHandler(err, 'Failed to delete model')
		);
	}

	ngOnInit() {}
	filterText(filterValue: string) {
		this.isResultsLoading = true;
		filterValue = filterValue.trim();
		this.paginator.pageIndex = 0;
		this.modelService
			.getModels({
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
				(err) => this.errorHandler(err, 'Failed to filter models')
			);
	}

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
					return this.modelService.getModels({
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
					this.errorHandler('Failed to fetch models', 'Error');
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
}
