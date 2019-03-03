import { Component, OnInit } from '@angular/core';
import { Brand } from '../../../brands/models/brand';
import { BrandService } from '../../../brands/services/brand.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Model } from '../../models/model';
import { ModelService } from '../../services/model.service';

@Component({
	selector: 'app-model-form',
	templateUrl: './model-form.component.html',
	styleUrls: [ './model-form.component.scss' ]
})
export class ModelFormComponent implements OnInit {
	private model: Model;
	modelForm: FormGroup;
	brands: Brand[] = [];
	title = 'New Model';
	constructor(
		private fb: FormBuilder,
		private modelService: ModelService,
		public snackBar: MatSnackBar,
		private router: Router,
		private route: ActivatedRoute,
		private brandService: BrandService
	) {}

	ngOnInit() {
		this.createForm();
		this.setModelToForm();
		this.setBrands();
	}
	onSubmit() {
		//user wants to edit the model
		if (this.model) {
			this.modelService.updateModel(this.model._id, this.modelForm.value).subscribe(
				(data) => {
					this.snackBar.open('Model updated', 'Success', {
						duration: 2000
					});
					this.router.navigate([ 'dashboard', 'models' ]);
				},
				(err) => this.errorHandler(err, 'Failed to update model')
			);
		} else {
			this.modelService.createModel(this.modelForm.value).subscribe(
				(data) => {
					this.snackBar.open('Model created!', 'Success', {
						duration: 2000
					});
					this.modelForm.reset();
					this.router.navigate([ 'dashboard', 'models' ]);
				},
				(err) => this.errorHandler(err, 'Failed to create model')
			);
		}
	}
	private setModelToForm() {
		//get the id of the model
		this.route.params.subscribe((params) => {
			let id = params['id'];
			if (!id) {
				return;
			}
			this.title = 'Edit Model';
			this.route.data.subscribe((data: { model: Model }) => {
				this.model = data.model;
				this.modelForm.patchValue({
					name: this.model.name,
					brand: this.model.brand
				});
			});
		});
	}
	private setBrands() {
		this.brandService.getBrands(this.modelForm.value).subscribe(
			(brands) => {
				brands = brands;
			},
			(err) => this.errorHandler(err, 'Failed to get Clients')
		);
	}
	private createForm() {
		this.modelForm = this.fb.group({
			name: [ '', Validators.required ],

			brand: [ '', Validators.required ]
		});
	}
	private errorHandler(error, message) {
		console.error(error);
		this.snackBar.open(message, 'Error', {
			duration: 2000
		});
	}
}
