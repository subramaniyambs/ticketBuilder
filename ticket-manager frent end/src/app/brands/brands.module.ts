import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandFormComponent } from './components/brand-form/brand-form.component';
import { BrandListingComponent } from './components/brand-listing/brand-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../shared/material.module';
import { BrandService } from './services/brand.service';
import { EditBrandResolverService } from './services/edit.brand-resolver.services';

@NgModule({
	imports: [ CommonModule, FormsModule, HttpClientModule, MaterialModule, ReactiveFormsModule ],
	declarations: [ BrandFormComponent, BrandListingComponent ],
	exports: [ BrandListingComponent, BrandFormComponent, ReactiveFormsModule ],
	providers: [ BrandService, EditBrandResolverService ],
	entryComponents: [ BrandFormComponent ]
})
export class BrandsModule {}
