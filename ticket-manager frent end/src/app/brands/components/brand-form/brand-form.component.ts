import { Component, OnInit } from '@angular/core';
import { Brand } from '../../models/brand';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrandService } from '../../services/brand.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-brand-form',
	templateUrl: './brand-form.component.html',
	styleUrls: [ './brand-form.component.scss' ]
})
export class BrandFormComponent implements OnInit {
	visible = false;
	pro() {
		this.visible = !this.visible;
	}
	private brand: Brand;
	brandForm: FormGroup;

	title = 'New Brand';
	constructor(
		private fb: FormBuilder,
		private brandService: BrandService,
		public snackBar: MatSnackBar,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.createForm();
		this.setBrandToForm();
	}
	onSubmit() {
		//user wants to edit the Brand
		if (this.brand) {
			this.brandService.updateBrand(this.brand._id, this.brandForm.value).subscribe(
				(data) => {
					this.snackBar.open('Brand updated', 'Success', {
						duration: 2000
					});
					this.router.navigate([ 'dashboard', 'brands' ]);
				},
				(err) => this.errorHandler(err, 'Failed to update Brand')
			);
		} else {
			this.brandService.createBrand(this.brandForm.value).subscribe(
				(data) => {
					this.snackBar.open('Brand created!', 'Success', {
						duration: 2000
					});
					this.brandForm.reset();
					this.router.navigate([ 'dashboard', 'brands' ]);
				},
				(err) => this.errorHandler(err, 'Failed to create Brand')
			);
		}
	}
	private setBrandToForm() {
		//get the id of the brand
		this.route.params.subscribe((params) => {
			let id = params['id'];
			if (!id) {
				return;
			}
			this.title = 'Edit Brand';
			this.route.data.subscribe((data: { brand: Brand }) => {
				this.brand = data.brand;
				this.brandForm.patchValue(this.brand);
			});
		});
	}

	private createForm() {
		this.brandForm = this.fb.group({
			name: [ '', Validators.required ]
		});
	}
	private errorHandler(error, message) {
		console.error(error);
		this.snackBar.open(message, 'Error', {
			duration: 2000
		});
	}
}
