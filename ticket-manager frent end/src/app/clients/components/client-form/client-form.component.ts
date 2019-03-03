import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-client-form',
	templateUrl: './client-form.component.html',
	styleUrls: [ './client-form.component.scss' ]
})
export class ClientFormComponent implements OnInit {
	visible = false;
	pro() {
		this.visible = !this.visible;
	}
	private client: Client;
	clientForm: FormGroup;
	clients: Client[] = [];
	title = 'New Client';
	constructor(
		private fb: FormBuilder,
		private clientService: ClientService,
		public snackBar: MatSnackBar,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.createForm();
		this.setClientToForm();
		this.setClients();
	}
	onSubmit() {
		//user wants to edit the client
		if (this.client) {
			this.clientService.updateClient(this.client._id, this.clientForm.value).subscribe(
				(data) => {
					this.snackBar.open('Client updated', 'Success', {
						duration: 2000
					});
					this.router.navigate([ 'dashboard', 'clients' ]);
				},
				(err) => this.errorHandler(err, 'Failed to update client')
			);
		} else {
			this.clientService.createClient(this.clientForm.value).subscribe(
				(data) => {
					this.snackBar.open('Client created!', 'Success', {
						duration: 2000
					});
					this.clientForm.reset();
					this.router.navigate([ 'dashboard', 'clients' ]);
				},
				(err) => this.errorHandler(err, 'Failed to create Client')
			);
		}
	}
	private setClientToForm() {
		//get the id of the client
		this.route.params.subscribe((params) => {
			let id = params['id'];
			if (!id) {
				return;
			}
			this.title = 'Edit Client';
			this.route.data.subscribe((data: { client: Client }) => {
				this.client = data.client;
				this.clientForm.patchValue(this.client);
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
	private createForm() {
		this.clientForm = this.fb.group({
			name: [ '', Validators.required ],
			address: '',
			post: '',
			city: '',
			phone: [ '', Validators.required ],
			email: '',
			siren: '',
			tva: ''
		});
	}
	private errorHandler(error, message) {
		console.error(error);
		this.snackBar.open(message, 'Error', {
			duration: 2000
		});
	}
}
