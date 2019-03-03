import { ClientPaginationRsp } from './../models/client';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client';
import { Observable } from 'rxjs/Observable';
const BASE_URL = 'http://localhost:3000/api';
@Injectable()
export class ClientService {

  constructor(private httpClient: HttpClient) { }
  getAllClients({ page, perPage, sortField, sortDir, filter }): Observable<ClientPaginationRsp> {
		let queryString = `${BASE_URL}/clients?page=${page + 1}&perPage=${perPage}`;
		if (sortField && sortDir) {
			queryString = `${queryString}&sortField=${sortField}&sortDir=${sortDir}`;
		}
		if (filter) {
			queryString = `${queryString}&filter=${filter}`;
		}
		return this.httpClient.get<ClientPaginationRsp>(queryString);
  }

	

  getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${BASE_URL}/clients`);
  }
  createClient(body: Client): Observable<Client> {
    return this.httpClient.post<Client>(`${BASE_URL}/clients`, body);
  }
  getClient(id: string): Observable<Client> {
    return this.httpClient.get<Client>(`${BASE_URL}/clients/${id}`);
  }
  updateClient(id: string, body: Client): Observable<Client> {
    return this.httpClient.put<Client>(`${BASE_URL}/clients/${id}`, body);
  }
  deleteClient(id: string): Observable<Client> {
    return this.httpClient.delete<Client>(`${BASE_URL}/clients/${id}`);
  }

}
