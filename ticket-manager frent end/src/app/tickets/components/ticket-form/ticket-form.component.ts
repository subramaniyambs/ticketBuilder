import { BrandsModule } from './../../../brands/brands.module';
import { ModelListingComponent } from './../../../models/components/model-listing/model-listing.component';
import { Ticket } from './../../models/ticket';
import { TicketListingComponent } from './../ticket-listing/ticket-listing.component';
import { filter } from 'rxjs/operator/filter';
import { Model } from './../../../models/models/model';
import { Brand } from './../../../brands/models/brand';

import { ModelService } from './../../../models/services/model.service';
import { BrandService } from './../../../brands/services/brand.service';
import { Category } from './../../../categories/models/category';
import { CategoryService } from './../../../categories/services/category.service';


import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { MatSnackBar, ICON_REGISTRY_PROVIDER, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientService } from '../../../clients/services/client.service';
import { Client } from '../../../clients/models/client';
import { TaskService } from '../../../tasks/services/task.service';
import { ReplaySubject } from 'rxjs';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DataSource } from '@angular/cdk/table';



@Component({
	selector: 'app-ticket-form',
	templateUrl: './ticket-form.component.html',
	styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent implements OnInit {

	// multiselect
	dropdowntaskList = [];
	dropdownMissingList = [];
	selectedItems: Array = [];
	selectedmissing: Array = [];
	dropdownSettings = {};

	dataSource = new MatTableDataSource<Ticket>();
	clientvisible = false;
	newClient() {
		this.clientvisible = !this.clientvisible;
	}

	brandvisible = false;
	newBrand() {
		this.brandvisible = !this.brandvisible;
	}
	categoryvisible = false;
	newCategory() {
		this.categoryvisible = !this.categoryvisible;
	}

	modelvisible = false;
	newModel() {
		this.modelvisible = !this.modelvisible;
	}
	private ticket: Ticket;
	ticketForm: FormGroup;
	clients: Client[] = [];


	title = 'New Ticket';
	mydate = Date.now();
	value: string;
	viewValue: string;
	missings = ['Chargeur', 'Carte sim', 'Carte SD', 'Batterie', 'cache arièrre '];
	statuses = ['En Cours', 'En Attente de pièces', 'Réparé', 'Livré', 'Retour en cour '];

	@ViewChild('myCategory') myCategory;
	clickCategory() {
		this.myCategory.open();
	}
	@ViewChild('myBrand') myBrand;
	clickBrand() {
		this.myBrand.open();
	}
	@ViewChild('myModel') myModel;
	clickModel() {
		this.myModel.open();
	}
	@ViewChild('myTask') myTask;
	clickTask() {
		// this.myTask.open();
	}
	@ViewChild('myMissing') myMissing;
	clickMissing() {
		// this.myMissing.open();
	}
	@ViewChild('myStatus') myStatus;
	clickStatus() {
		this.myStatus.open();
	}

	selectedBrand = "";
	selectedModel = "";

	customers: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
	categories;
	brands;
	models;
	tasks;
	constructor(
		private fb: FormBuilder,
		private ticketService: TicketService,
		public snackBar: MatSnackBar,
		private router: Router,
		private route: ActivatedRoute,
		private clientService: ClientService,
		private catService: CategoryService,
		private brandsService: BrandService,
		private modelService: ModelService,
		private taskService: TaskService,
		private ref: ChangeDetectorRef,

	) { }

	ngOnInit() {
		this.createForm();
		this.setTicketToForm();
		this.setClients();
		this.setCats();
		this.setBrands();
		this.setModels();
		this.setTasks();
		this.setMisingMultiselect();

	}

	onSelectBrand(_id: string) {
		this.selectedBrand = _id;
		this.selectedModel = "";
		// this.models = this.modelService.getModel('id').filter((item) => {
		// 	console.log(item)
		// 	return item._id === String(_id);
		// })

	}

	getModels() {
		return this.modelService.getModels;
	}
	onSubmit() {
		//user wants to edit the ticket
		if (this.ticket) {
			const clientName = this.clients.filter((item) => {
				return item._id == this.ticketForm.value.client;
			})
			this.ticketForm.value.clientName = clientName ? clientName[0].name : "";
			this.ticketForm.value.reception_date = new Date();
			this.ticketForm.value.missing = this.ticketForm.value.missing.toString();
			this.ticketService.updateTicket(this.ticket._id, this.ticketForm.value).subscribe(
				(data) => {

					this.snackBar.open('Ticket updated', 'Success', {
						duration: 5000
					});

					this.router.navigate(['dashboard', 'tickets']);
				},
				(err) => this.errorHandler(err, 'Failed to update Ticket')
			);

		} else {
			const clientName = this.clients.filter((item) => {
				return item._id == this.ticketForm.value.client;
			})
			this.ticketForm.value.clientName = clientName ? clientName[0].name : "";
			this.ticketForm.value.reception_date = new Date();
			this.ticketForm.value.missing = this.ticketForm.value.missing.toString();
			this.ticketService.createTicket(this.ticketForm.value).subscribe(
				(data) => {

					this.snackBar.open('Ticket created!', 'Success', {
						duration: 5000

					});
					this.dataSource.data = [...this.dataSource.data];
					this.ticketForm.reset();
					this.router.navigate(['dashboard', 'tickets']);
				},
				(err) => this.errorHandler(err, 'Failed to create Ticket')
			);
			this.dataSource.data = [...this.dataSource.data];

		}

	}

	choosedBranch(selectBrand: string) {
		this.selectedBrand = selectBrand;
		this.selectedModel = "";
		let brandsList = this.brands;
		let selectedBrand;
		if (brandsList) {
			selectedBrand = brandsList.filter(function (brandData) {
				return brandData.name == selectBrand;
			})
			console.log("selectedBrand", selectBrand)
		}
		let brand = selectedBrand[0]._id;
		this.modelService.findByBrand(brand).subscribe(
			(data) => {
				this.models = data;
				console.log(this.models)
			},
			(err) => this.errorHandler(err, 'Failed to Choose Model')
		);
	}



	private setTicketToForm() {
		//get the id of the ticket
		this.route.params.subscribe((params) => {
			let id = params['id'];
			if (!id) {
				return;
			}
			this.title = 'Edit Ticket';
			this.route.data.subscribe((data: { ticket: Ticket }) => {
				this.ticket = data.ticket;
				this.ticketForm.patchValue({
					category: this.ticket.category,
					brand: this.ticket.brand,
					model: this.ticket.model,
					task: this.ticket.task,
					missings: this.ticket.missing,
					statuses: this.ticket.statuses,
					usercode: this.ticket.usercode,
					price: this.ticket.price,
					serial: this.ticket.serial,
					// reception_date: this.mydate,
					delivery_date: this.ticket.delivery_date,
					client: this.ticket.client._id,
					status: this.ticket.status,

				});
			});
		});
	}
	private setClients() {
		this.clientService.getClients().subscribe(
			(clients) => {
				this.clients = clients;
			},
			(err) => this.errorHandler(err, 'Failed to get Clients')
		);
	}


	private setCats() {
		this.catService.getAllCategories().subscribe(
			(categories) => {
				this.categories = categories;
			},
			(err) => this.errorHandler(err, 'Failed to get Clients')
		);
	}
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
	private setTasks() {
		this.taskService.findTasks().subscribe(
			(tasks) => {
				this.tasks = tasks;
				this.setTaskMultiselect(tasks);
			},
			(err) => this.errorHandler(err, 'Failed to get Tasks')
		);
	}

	private setTaskMultiselect(task:any) {
		this.dropdowntaskList = task;
		console.log(this.ticket)
		this.selectedmissing = this.title == "Edit Ticket" ? this.ticket.missing.split(",") : [];
		this.dropdownSettings = {
			singleSelection: false,
			idField: '_id',
			textField: 'name',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			itemsShowLimit: 3,
			allowSearchFilter: true
		};
		
	}

	private setMisingMultiselect() {
		this.dropdownMissingList = this.missings;
		this.selectedItems = this.title == "Edit Ticket" ? this.ticket.task : [];
		this.dropdownSettings = {
			singleSelection: false,
			// idField: '_id',
			textField: 'name',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			itemsShowLimit: 3,
			allowSearchFilter: true
		};
		
	}
	private createForm() {
		this.ticketForm = this.fb.group({
			category: ['', Validators.required],
			brand: ['', Validators.required],
			model: ['', Validators.required],
			task: [[], Validators.required],
			missing: ['', Validators.required],
			status: ['',Validators.required],
			usercode: ['', Validators],
			price: ['', Validators],
			serial: ['', Validators],
			// reception_date: ['', Validators],
			delivery_date: ['', Validators],
			client: ['', Validators.required]
		});
	}
	private errorHandler(error, message) {
		console.error(error);
		this.snackBar.open(message, 'Error', {
			duration: 2000
		});
	}

	onItemSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    OnItemDeSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any){
        console.log(items);
    }
    onDeSelectAll(items: any){
        console.log(items);
    }
    onDropdownCloseTask(items: any){
		console.log(items);
    }
}
