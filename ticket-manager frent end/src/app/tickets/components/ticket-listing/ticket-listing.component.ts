import { DataSource } from '@angular/cdk/table';
import { Component, OnInit, AfterViewInit, AfterViewChecked, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { Client } from '../../../clients/models/client';
import { ClientService } from '../../../clients/services/client.service';
import { ModelService } from './../../../models/services/model.service';
import { BrandService } from './../../../brands/services/brand.service';
import { remove } from 'lodash';
import { Router } from '@angular/router';
import {
	MatSnackBar,
	MatPaginator,
	MatSort,
	MatTableDataSource,
	MatDialog,
	MAT_DIALOG_DATA,
	MatDialogRef,
	Sort
} from '@angular/material';
import { Ticket } from '../../models/ticket';

import { merge } from 'rxjs/observable/merge';
import 'rxjs/Rx';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { SelectionModel } from '@angular/cdk/collections';
import { trigger, state, animate, transition, style } from '@angular/animations';



@Component({
	selector: 'app-ticket-listing',
	templateUrl: './ticket-listing.component.html',
	styleUrls: ['./ticket-listing.component.scss'],
})
export class TicketListingComponent implements OnInit, AfterViewChecked {

	ticketvisible = false;
	newTicket() {
		this.ticketvisible = !this.ticketvisible;
	}
	clientvisible = false;
	newClient() {
		this.clientvisible = !this.clientvisible;
	}
	categoryvisible = false;
	newCategory() {
		this.categoryvisible = !this.categoryvisible;
	}
	// @ViewChild('myBrand') myBrand;
	// clickBrand() {
	// 	this.myBrand.open();
	//   }
	//   @ViewChild('myModel') myModel;
	// clickModel() {
	// 	this.myModel.open();
	//   }
	ticketsList: Ticket[] = [];
	ticketSearchForm = new FormGroup({
		client:new FormControl(''),
		serial:new FormControl(''),
		reception_date: new FormControl('')
	});
	selectedBrand = "";
	selectedModel = "";
	brands;
	models;
	constructor(
		private clientService: ClientService,
		private ticketService: TicketService,
		private brandsService: BrandService,
		private modelService: ModelService,
		private router: Router,
		private snackBar: MatSnackBar,
		private ref: ChangeDetectorRef,
		public dialog: MatDialog
	) { }
	displayedColumns = [
		'select',
		'reception_date',
		'delivery_date',
		'category',
		'brand',
		'model',
		'task',
		'usercode',
		'price',
		'serial',
		'missing',
		'status',
		'client',
		'user',
		'action'
	];
	dataSource = new MatTableDataSource<Ticket>();
	selection = new SelectionModel<Ticket>(true, []);
	resultsLength = 0;
	isResultsLoading = false;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	saveBtnHanlder() {
		this.router.navigate(['dashboard', 'tickets', 'new']);
	}
	editBtnHandler(id) {
		this.router.navigate(['dashboard', 'tickets', id]);
	}




	deleteBtnHandler(id) {
		this.ticketService.deleteTicket(id).subscribe(
			(data) => {
				const removedItems = remove(this.dataSource.data, (item) => {
					return item._id === data._id;
				});
				this.dataSource.data = [...this.dataSource.data];
				this.snackBar.open('Ticket deleted', 'Success', {
					duration: 2000
				});
			},
			(err) => this.errorHandler(err, 'Failed to delete Ticket')
		);
	}
	ngOnInit() {
		this.setBrands();
		this.setModels();

	}
	
	// filterText
// 	filterText(filterValue: string,filtertype:string) {
// 		this.isResultsLoading = true;
// 		filterValue = filterValue.slice();
// 		this.paginator.pageIndex = 0;
// 		const searchData:any = {}
		
// 		if(filtertype == "serialNumFilter"){
// 			searchData.serial = filterValue;
// 		}

// 		if(filtertype == "receptionDateFilter"){
// 			searchData.receptionDate = filterValue;
// 		}
// console.log(searchData)
	
// 	}

	

	// onSelectBrand(brandName: string) {
	// 	this.selectedBrand = brandName;
	// 	this.selectedModel = "";
	// 	this.isResultsLoading = true;
	// 	this.paginator.pageIndex = 0;
	// 	console.log(this.selectedBrand)
	// 	this.ticketService
	// 		.getTickets({
	// 			page: this.paginator.pageIndex,
	// 			perPage: this.paginator.pageSize,
	// 			sortField: this.sort.active,
	// 			sortDir: this.sort.direction,
	// 			filter: "",
	// 			filtertype: "Brand",
	// 			searchData: this.selectedBrand
	// 		})
	// 		.subscribe(
	// 			(data) => {

	// 				this.dataSource.data = data.docs;
	// 				this.resultsLength = data.total;
	// 				this.isResultsLoading = false;
	// 			},
	// 			(err) => this.errorHandler(err, 'Failed to filter Tickets')
	// 		);
	// }

	// onSelectModel(modelName: string) {
	// 	this.selectedModel = modelName;
	// 	this.selectedBrand = "";
	// 	this.isResultsLoading = true;
	// 	this.paginator.pageIndex = 0;
	// 	console.log(this.selectedModel)
	// 	this.ticketService
	// 		.getTickets({
	// 			page: this.paginator.pageIndex,
	// 			perPage: this.paginator.pageSize,
	// 			sortField: this.sort.active,
	// 			sortDir: this.sort.direction,
	// 			filter: "",
	// 			filtertype: "Model",
	// 			searchData: this.selectedModel
	// 		})
	// 		.subscribe(
	// 			(data) => {
	// 				this.dataSource.data = data.docs;
	// 				this.resultsLength = data.total;
	// 				this.isResultsLoading = false;
	// 			},
	// 			(err) => this.errorHandler(err, 'Failed to filter Tickets')
	// 		);
	// }

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
					return this.ticketService.getTickets({
						page: this.paginator.pageIndex,
						perPage: this.paginator.pageSize,
						sortField: this.sort.active,
						sortDir: 'desc',
						filter: "",
						searchData :""
					});
				}),
				map((data) => {
					this.isResultsLoading = false;
					this.resultsLength = data.total;
					return data.docs;
				}),
				catchError(() => {
					this.isResultsLoading = false;
					this.errorHandler('Failed to fetch Tickets', 'Error');
					return observableOf([]);
				})
			)
			.subscribe((data) => {
				// this.dataSource.data.push(data);
				this.dataSource.data = [...this.dataSource.data];
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

	filterList(){
		let filterValues = this.ticketSearchForm.value;
	if(filterValues){
			this.ticketService
			.getTickets({
				page: this.paginator.pageIndex,
				perPage: this.paginator.pageSize,
				sortField: this.sort.active,
				sortDir: 'desc',
				filter: "",
				searchData :filterValues
				// searchData: ""


			})
			.subscribe(
				(data) => {

					this.dataSource.data = data.docs;
					this.resultsLength = data.total;
					this.isResultsLoading = false;
				},
				(err) => this.errorHandler(err, 'Failed to filter Tickets')
			);
		}
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

	private setBrands() {
		this.brandsService.findBrands().subscribe(
			(brands) => {
				this.brands = brands;
			},
			(err) => this.errorHandler(err, 'Failed to get Brands')
		);

	}

	private setModels() {
		this.modelService.findModels().subscribe(
			(models) => {
				this.models = models;
			},
			(err) => this.errorHandler(err, 'Failed to get Models')
		);
	}


	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
	}
}

