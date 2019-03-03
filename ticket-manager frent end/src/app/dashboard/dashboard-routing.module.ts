import { HomeComponent } from './components/home/home.component';
import { EditUserResolverService } from './../users/services/edit.user-resolver.service';
import { UserFormComponent } from './../users/components/user-form/user-form.component';
import { UserListingComponent } from './../users/components/user-listing/user-listing.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InvoiceListingComponent } from '../invoices/components/invoice-listing/invoice-listing.component';
import { ClientListingComponent } from '../clients/components/client-listing/client-listing.component';
import { InvoiceFormComponent } from '../invoices/components/invoice-form/invoice-form.component';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { EditInvoiceResolverService } from '../invoices/services/edit-invoice-resolver.service';
import { TicketListingComponent } from '../tickets/components/ticket-listing/ticket-listing.component';
import { TicketFormComponent } from '../tickets/components/ticket-form/ticket-form.component';
import { ClientFormComponent } from '../clients/components/client-form/client-form.component';
import { EditClientResolverService } from '../clients/services/edit-client-resolver.service';
import { TicketViewComponent } from '../tickets/components/ticket-view/ticket-view.component';
import { EditTicketResolverService } from '../tickets/services/edit-ticket-resolver.service';
import { InvoiceViewComponent } from '../invoices/components/invoice-view/invoice-view.component';
import { InvpdfComponent } from '../invoices/components/invpdf/invpdf.component';
import { CategoryListingComponent } from '../categories/components/category-listing/category-listing.component';
import { CategoryFormComponent } from '../categories/components/category-form/category-form.component';
import { EditCategoryResolverService } from '../categories/services/edit.category-resolver.services';
import { BrandFormComponent } from '../brands/components/brand-form/brand-form.component';
import { EditBrandResolverService } from '../brands/services/edit.brand-resolver.services';
import { BrandListingComponent } from '../brands/components/brand-listing/brand-listing.component';
import { TaskListingComponent } from '../tasks/components/task-listing/task-listing.component';
import { TaskFormComponent } from '../tasks/components/task-form/task-form.component';
import { EditTaskResolverService } from '../tasks/services/edit.task-resolver.services';
import { ModelListingComponent } from '../models/components/model-listing/model-listing.component';
import { ModelFormComponent } from '../models/components/model-form/model-form.component';
import { EditModelResolverService } from '../models/services/edit-model-resolver.service';


const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		canActivate: [ AuthGuardService ],
		children: [
			{
				path: 'invoices',
				component: InvoiceListingComponent,
				canActivateChild: [ AuthGuardService ]
			},
			{
				path: 'invoices/new',
				component: InvoiceFormComponent,
				canActivateChild: [ AuthGuardService ]
			},
			{
				path: 'invoices/:id',
				component: InvoiceFormComponent,
				canActivateChild: [ AuthGuardService ],
				resolve: {
					invoice: EditInvoiceResolverService
				}
			},
			{
				path: 'invoices/:id/view',
				component: InvoiceViewComponent,
				canActivateChild: [ AuthGuardService ],
				resolve: {
					invoice: EditInvoiceResolverService
				}
			},

			// category
			{
				path: 'categories',
				component: CategoryListingComponent,
				canActivateChild: [ AuthGuardService ]
			},
			{
				path: 'categories/new',
				component: CategoryFormComponent,
				canActivateChild: [ AuthGuardService ]
			},
			{
				path: 'categories/:id',
				component: CategoryFormComponent,
				canActivateChild: [ AuthGuardService ],
				resolve: {
					category: EditCategoryResolverService
				}
			},
			// Brand
			{
				path: 'brands',
				component: BrandListingComponent,
				canActivateChild: [ AuthGuardService ]
			},
			{
				path: 'brands/new',
				component: BrandFormComponent,
				canActivateChild: [ AuthGuardService ]
			},
			{
				path: 'brands/:id',
				component: BrandFormComponent,
				canActivateChild: [ AuthGuardService ],
				resolve: {
					brand: EditBrandResolverService
				}
			},

			// Model
			{
				path: 'models',
				component: ModelListingComponent,
				canActivateChild: [ AuthGuardService ]
			},
			{
				path: 'models/new',
				component: ModelFormComponent,
				canActivateChild: [ AuthGuardService ]
			},
			{
				path: 'models/:id',
				component: ModelFormComponent,
				canActivateChild: [ AuthGuardService ],
				resolve: {
					model: EditModelResolverService
				}
			},
			// Task
			{
				path: 'tasks',
				component: TaskListingComponent,
				canActivateChild: [ AuthGuardService ]
			},
			{
				path: 'tasks/new',
				component: TaskFormComponent,
				canActivateChild: [ AuthGuardService ]
			},
			{
				path: 'tasks/:id',
				component: TaskFormComponent,
				canActivateChild: [ AuthGuardService ],
				resolve: {
					task: EditTaskResolverService
				}
			},
           //client
			{
				path: 'clients',
				component: ClientListingComponent,
				canActivateChild: [ AuthGuardService ]
			},
			{
				path: 'PDF',
				component: InvpdfComponent,
				canActivateChild: [ AuthGuardService ]
			},
			{
				path: 'clients/new',
				component: ClientFormComponent,
				canActivateChild: [ AuthGuardService ]
			},
			{
				path: 'clients/:id',
				component: ClientFormComponent,
				canActivateChild: [ AuthGuardService ],
				resolve: {
					client: EditClientResolverService
				}
			},
			// User
			{
				path: 'users',
				component: UserListingComponent,
				canActivateChild: [ AuthGuardService ]
			},
			{
				path: 'users/new',
				component: UserFormComponent,
				canActivateChild: [ AuthGuardService ]
			},
			{
				path: 'users/:id',
				component: UserFormComponent,
				canActivateChild: [ AuthGuardService ],
				resolve: {
					user: EditUserResolverService
				}
			},


			//ticket
			{
				path: 'tickets',
				component: TicketListingComponent,
				canActivateChild: [ AuthGuardService ]
			},
			{
				path: 'tickets/new',
				component: TicketFormComponent,
				canActivateChild: [ AuthGuardService ]
			},
			{
				path: 'tickets/:id/view',
				component: TicketViewComponent,
				canActivateChild: [ AuthGuardService ],
				resolve: {
					ticket: EditTicketResolverService
				}
			},
			{
				path: 'tickets/:id',
				component: TicketFormComponent,
				canActivateChild: [ AuthGuardService ],
				resolve: {
					ticket: EditTicketResolverService
				}
			},
			{
				path: '**',
				redirectTo: 'home',
				canActivateChild: [ AuthGuardService ]
			},
			//home 

			{
				path: 'home',
				component: HomeComponent,
				canActivateChild: [ AuthGuardService ]
			},


			
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class DashboardRoutingModule {}
