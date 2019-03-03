import { ModelsModule } from './../models/models.module';
import { BrandsModule } from './../brands/brands.module';
import { CategoriesModule } from './../categories/categories.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketListingComponent } from './components/ticket-listing/ticket-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { TicketService } from './services/ticket.service';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { ClientFormComponent } from '../clients/components/client-form/client-form.component';
import { ClientsModule } from '../clients/clients.module';
import { TicketViewComponent } from './components/ticket-view/ticket-view.component';
import { RouterModule } from '@angular/router';
import { EditTicketResolverService } from './services/edit-ticket-resolver.service';
import { ClientService } from '../clients/services/client.service';
import { NgxBarcodeModule } from 'ngx-barcode';
import { FilterPipe } from './filter.pipe';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		MaterialModule,
		ReactiveFormsModule,
		ClientsModule,
		CategoriesModule,
		BrandsModule,
		ModelsModule,
		RouterModule,
		NgxBarcodeModule,
		NgxMatSelectSearchModule,
		NgMultiSelectDropDownModule.forRoot()
		
		
		
	],
	
	declarations: [ TicketListingComponent, TicketFormComponent, TicketViewComponent, FilterPipe ],
	exports: [ TicketListingComponent, TicketFormComponent ],
	providers: [ TicketService, HttpClientModule, ClientService, EditTicketResolverService ]
})
export class TicketsModule {}
