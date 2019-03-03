import { CategoryService } from './../../services/category.service';
import { Component, OnInit, AfterViewInit, AfterViewChecked, ChangeDetectorRef, ViewChild } from '@angular/core';

import { Category } from '../../models/category';
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

import { merge } from 'rxjs/observable/merge';
import 'rxjs/Rx';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

@Component({
	selector: 'app-category-listing',
	templateUrl: './category-listing.component.html',
	styleUrls: [ './category-listing.component.scss' ]
})
export class CategoryListingComponent implements OnInit {
	categoryvisible = false;
	newCategory() {
		this.categoryvisible = !this.categoryvisible;
	}


	displayedColumns = [ 'id', 'name',  'action' ];
	dataSource = new MatTableDataSource<Category>();
	isResultsLoading = false;
	constructor(private categoryService: CategoryService,  private snackBar: MatSnackBar) {}

	ngOnInit() {
		this.isResultsLoading = true;
		this.categoryService.getAllCategories().subscribe(
			(data) => {
				this.dataSource.data = data;
			},
			(err) => console.error(err),
			() => (this.isResultsLoading = false)
		);
	}
	
	saveBtnHanlder() {}

	deleteBtnHandler(categoryId) {
		this.categoryService.deleteCategory(categoryId).subscribe(
			(data) => {
				const removedItems = remove(this.dataSource.data, (item) => {
					return item._id === data._id;
				});
				this.dataSource.data = [ ...this.dataSource.data ];
				this.snackBar.open('Category deleted', 'Success', {
					duration: 2000
				});
			},
			(err) => this.errorHandler(err, 'Failed to delete Category')
		);
	}

	private errorHandler(error, message) {
		console.error(error);
		this.snackBar.open(message, 'Error', {
			duration: 2000
		});
	}

}
