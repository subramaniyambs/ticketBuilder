import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-invpdf',
	templateUrl: './invpdf.component.html',
	styleUrls: [ './invpdf.component.scss' ]
})
export class InvpdfComponent implements OnInit {
	page: number = 1;
	totalPages: number;
	isLoaded: boolean = false;

	afterLoadComplete(pdfData: any) {
		this.totalPages = pdfData.numPages;
		this.isLoaded = true;
	}
	nextPage() {
		this.page++;
	}

	prevPage() {
		this.page--;
	}
	constructor() {}

	ngOnInit() {}
}
