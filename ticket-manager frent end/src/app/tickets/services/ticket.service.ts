import { Brand } from './../../brands/models/brand';
import { Category } from './../../categories/models/category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Ticket, TicketPaginationRsp } from '../models/ticket';
import { Task } from '../../tasks/models/task';

const BASE_URL = 'http://localhost:3000/api';

@Injectable()
export class TicketService {

	length: number;
	constructor(private httpClient: HttpClient) { }

	getTickets({ page, perPage, sortField, sortDir, filter, searchData }): Observable<TicketPaginationRsp> {
		let queryString = `${BASE_URL}/tickets?page=${page + 1}&perPage=${perPage}`;
		if (sortField && sortDir) {
			queryString = `${queryString}&sortField=${sortField}&sortDir=${sortDir}`;
		}
		if (filter) {
			queryString = `${queryString}&filter=${filter}`;
		}
		if(searchData){
			if (searchData.client) {
				queryString = `${queryString}&clientName=${searchData.client}`;
			}
			if (searchData.serial) {
				queryString = `${queryString}&serial=${searchData.serial}`;
			}
			if (searchData.reception_date) {
				var dateFormat = searchData.reception_date.toISOString()
				queryString = `${queryString}&reception_date=${dateFormat}`;
			}
		}
		
		// if(searchData){
		// 	queryString = `${queryString}&searchData=${searchData}`;
		// }
		return this.httpClient.get<TicketPaginationRsp>(queryString);

	}

	findALL(): Observable<Ticket[]> {
		return this.httpClient.get<Ticket[]>(`${BASE_URL}/tickets`);
	}

	createTicket(body: Ticket): Observable<Ticket> {
		return this.httpClient.post<Ticket>(`${BASE_URL}/tickets`, body);

	}
	deleteTicket(id: string): Observable<Ticket> {
		return this.httpClient.delete<Ticket>(`${BASE_URL}/tickets/${id}`);
	}
	getTicket(id: string): Observable<Ticket> {

		return this.httpClient.get<Ticket>(`${BASE_URL}/tickets/${id}`);
	}
	updateTicket(id: string, body: Ticket) {
		return this.httpClient.put<Ticket>(`${BASE_URL}/tickets/${id}`, body);
	}

	downloadTicket(id: string) {
		return this.httpClient.get(`${BASE_URL}/tickets/${id}/download`, { responseType: 'blob' }).map((res) => {
			return new Blob([res], { type: 'application/pdf' });
			// window.open(`${BASE_URL}/invoices/${id}/download`);
		});
	}
	printTicket(id: string) {
		this.httpClient.get('${BASE_URL}/invoices/${id}', { responseType: 'blob' as 'json' }).subscribe((res) => {
			const ticket: Ticket = <Ticket>res;
			const file = new Blob([ticket], { type: 'html' });
			const fileURL = URL.createObjectURL(file);
			console.log(fileURL);
			window.open(fileURL);
		});
	}

	
}
