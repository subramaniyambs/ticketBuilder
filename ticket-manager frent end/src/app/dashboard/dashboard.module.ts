
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InvoicesModule } from '../invoices/invoices.module';
import { CategoriesModule } from '../categories/categories.module';
import { ClientsModule } from '../clients/clients.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from '../core';
import { TicketsModule } from '../tickets/tickets.module';
import { dateFormatPipe } from '../time.pipe';
import { NgxBarcodeModule } from 'ngx-barcode';
import { BrandsModule } from '../brands/brands.module';
import { TasksModule } from '../tasks/tasks.module';
import { ModelsModule } from '../models/models.module';
import { UsersModule } from '../users/users.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { HomeComponent } from './components/home/home.component';
import {DatePipe} from '@angular/common';
import { RouterOutlet } from '@angular/router';



@NgModule({
	imports: [
		CommonModule,
		DashboardRoutingModule,
		InvoicesModule,
		ClientsModule,
        UsersModule,
		CategoriesModule,
		BrandsModule,
		TicketsModule,
		ModelsModule,
		TasksModule,
		UsersModule,
		MaterialModule,
		NgxBarcodeModule,
		HttpClientModule,
		NgxMatSelectSearchModule
	],
	declarations: [ DashboardComponent, SideNavComponent, ToolbarComponent, dateFormatPipe, HomeComponent ],
	providers: [
		HttpClientModule,DatePipe,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptorService,
			multi: true
		}
	]
})
export class DashboardModule {

	prepareRoute(outlet: RouterOutlet) {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
	  }
}
