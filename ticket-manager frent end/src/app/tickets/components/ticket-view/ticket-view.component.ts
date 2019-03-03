import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../../models/ticket';
import { saveAs } from 'file-saver';
import { EditTicketResolverService } from '../../services/edit-ticket-resolver.service';
import { TicketService } from '../../services/ticket.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/throw';


@Component({
	selector: 'app-ticket-view',
	templateUrl: './ticket-view.component.html',
	styleUrls: [ './ticket-view.component.scss' ]
})
export class TicketViewComponent implements OnInit {
	ticket: Ticket;
	val: any;
	isResultsLoading: any;

	constructor(private httpClient: HttpClient, private route: ActivatedRoute, private ticketService: TicketService) {}

	ngOnInit() {
		this.route.data.subscribe((data: { ticket: Ticket }) => {
			this.ticket = data.ticket;
			console.log(this.ticket);
		});

		this.route.data.subscribe((data: { ticket: Ticket }) => {
			this.ticket = data.ticket;
			// console.log(this.invoice);
		});
	}
	downloadHandler(id) {
		this.isResultsLoading = true;
		this.ticketService.downloadTicket(id).subscribe(
			(data) => {
				// console.log(data);
				saveAs(data, this.ticket.client.name);
			},
			(err) => {
				console.error(err);
				//this.errorHandler(err, 'Error while downloading invoice');
			}
		);
	}
	printHandler(id) {
		this.isResultsLoading = true;
		this.ticketService.downloadTicket(id).subscribe((res) => {
			this.val = this.ticketService.getTicket(id);
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
	height = 40;
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
		return this.ticket._id.split('\n');
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
