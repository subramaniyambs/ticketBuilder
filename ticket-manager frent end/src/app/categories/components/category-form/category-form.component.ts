import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-category-form',
	templateUrl: './category-form.component.html',
	styleUrls: [ './category-form.component.scss' ]
})
export class CategoryFormComponent implements OnInit {
	visible = false;
	pro() {
		this.visible = !this.visible;
	}
	private category: Category;
	categoryForm: FormGroup;

	title = 'New Category';
	constructor(
		private fb: FormBuilder,
		private categoryService: CategoryService,
		public snackBar: MatSnackBar,
		private router: Router,
		private route: ActivatedRoute,
	
	) {}

	ngOnInit() {
		this.createForm();
		this.setCategoryToForm();
	}
	onSubmit() {
		//user wants to edit the Category
		if (this.category) {
			this.categoryService.updateCategory(this.category._id, this.categoryForm.value).subscribe(
				(data) => {
					this.snackBar.open('Category updated', 'Success', {
						duration: 2000
					});
					this.router.navigate([ 'dashboard', 'tasks' ]);
				},
				(err) => this.errorHandler(err, 'Failed to update category')
			);
		} else {
			this.categoryService.createCategory(this.categoryForm.value).subscribe(
				(data) => {
					this.snackBar.open('Category created!', 'Success', {
						duration: 2000
					});
					this.categoryForm.reset();
					this.router.navigate([ 'dashboard', 'categories' ]);	
				},
				(err) => this.errorHandler(err, 'Failed to create Category')
			);
		}
	}

	
	private setCategoryToForm() {
		//get the id of the category
		this.route.params.subscribe((params) => {
			let id = params['id'];
			if (!id) {
				return;
			}
			this.title = 'Edit Category';
			this.route.data.subscribe((data: { category: Category }) => {
				this.category = data.category;
				this.categoryForm.patchValue(this.category);
			});
		});
	}

	private createForm() {
		this.categoryForm = this.fb.group({
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
