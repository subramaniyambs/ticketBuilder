import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelFormComponent } from './components/model-form/model-form.component';
import { ModelListingComponent } from './components/model-listing/model-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../shared/material.module';
import { ModelService } from './services/model.service';
import { EditModelResolverService } from './services/edit-model-resolver.service';

@NgModule({
	imports: [ CommonModule, FormsModule, HttpClientModule, MaterialModule, ReactiveFormsModule ],
	declarations: [ ModelFormComponent, ModelListingComponent ],
	exports: [ ModelListingComponent, ModelFormComponent, ReactiveFormsModule ],
	providers: [ ModelService, EditModelResolverService ],
	entryComponents: [ ModelFormComponent ]
})
export class ModelsModule {}
