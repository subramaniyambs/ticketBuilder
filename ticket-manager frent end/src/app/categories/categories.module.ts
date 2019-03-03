import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListingComponent } from './components/category-listing/category-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './services/category.service';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { EditCategoryResolverService } from './services/edit.category-resolver.services';

@NgModule({
	imports: [ CommonModule, FormsModule, HttpClientModule, MaterialModule, ReactiveFormsModule ],
	declarations: [ CategoryListingComponent, CategoryFormComponent ],
	exports: [ CategoryListingComponent, CategoryFormComponent, ReactiveFormsModule ],
	providers: [ CategoryService, EditCategoryResolverService ],
	entryComponents: [ CategoryFormComponent ]
})
export class CategoriesModule {}
