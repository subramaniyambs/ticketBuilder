import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '../../models/invoice';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import { InvoiceService } from '../../services/invoice.service';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-invoice-view',
	templateUrl: './invoice-view.component.html',
	styleUrls: [ './invoice-view.component.scss' ]
})
export class InvoiceViewComponent implements OnInit {
	invoice: Invoice;
	subtotal: number;
	invoicetax = 20;
	total: number;
	totalTax : number;
	salesTax : number;
	isResultsLoading = false;

	constructor(private route: ActivatedRoute, private invoiceService: InvoiceService, private snackBar: MatSnackBar) {}

	ngOnInit() {
		this.route.data.subscribe((data: { invoice: Invoice }) => {
			this.invoice = data.invoice;
			console.log(this.invoice);
			if (
			  typeof this.invoice.qty !== 'undefined' &&
			  typeof this.invoice.rate !== 'undefined'
			) {
			  this.subtotal = this.invoice.qty * this.invoice.price;
			}
			let salesTax = 0;
			if (typeof this.invoice.tax !== 'undefined') {
			  salesTax = this.subtotal * this.invoice.tax / 100;
			}
			this.totalTax = salesTax;
			this.total = this.subtotal + salesTax;
		  });
	}
	downloadHandler(id) {
		this.isResultsLoading = true;
		this.invoiceService.downloadInvoice(id).subscribe(
			(data) => {
				// console.log(data);
				saveAs(data, this.invoice.item);

				// saveAs(data, this.invoice.item);
			},
			(err) => {
				console.error(err);
				//this.errorHandler(err, 'Error while downloading invoice');
			}
		);
	}
	printHandler(id) {
		this.isResultsLoading = true;
		this.invoiceService.downloadInvoice(id).subscribe((res) => {
			// console.log(this.printHandler);
			this.isResultsLoading = true;
			var fileURL = URL.createObjectURL(res);
			window.open(fileURL);
		});
	}
	elementType = 'svg';
	format = 'CODE128';
	lineColor = '#000000';
	width = 0.8;
	height = 30;
	displayValue = true;
	fontOptions = '';
	font = 'monospace';
	textAlign = 'center';
	textPosition = 'bottom';
	textMargin = 2;
	fontSize = 14;
	background = '#ffffff';
	margin = 5;
	marginTop = 10;
	marginBottom = 10;
	marginLeft = 0;
	marginRight = 5;

	get values(): string[] {
		return this.invoice._id.split('\n');
	}
	codeList: string[] = [
		'',
		'CODE128',
		'CODE128A',
		'CODE128B',
		'CODE128C',
		'UPC',
		'EAN8',
		'EAN5',
		'EAN2',
		'CODE39',
		'ITF14',
		'MSI',
		'MSI10',
		'MSI11',
		'MSI1010',
		'MSI1110',
		'pharmacode',
		'codabar'
	];
}
