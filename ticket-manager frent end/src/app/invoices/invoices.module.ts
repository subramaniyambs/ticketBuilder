import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListingComponent } from './components/invoice-listing/invoice-listing.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceService } from './services/invoice.service';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { EditInvoiceResolverService } from './services/edit-invoice-resolver.service';
import { ClientService } from '../../app/clients/services/client.service';
import { InvoiceViewComponent } from './components/invoice-view/invoice-view.component';
import { RouterModule } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { InvpdfComponent } from './components/invpdf/invpdf.component';
import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		MaterialModule,
		ReactiveFormsModule,
		RouterModule,
		PdfViewerModule,
		NgxBarcodeModule
	],
	declarations: [ InvoiceListingComponent, InvoiceFormComponent, InvoiceViewComponent, InvpdfComponent ],
	exports: [ InvoiceListingComponent, InvoiceFormComponent ],
	providers: [ InvoiceService, ClientService, EditInvoiceResolverService ]
})
export class InvoicesModule {
	pdfSrc: string = '/pdf-test.pdf';
}
