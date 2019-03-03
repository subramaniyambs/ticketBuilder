import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ModelPaginationRsp, Model } from '../models/model';
const BASE_URL = 'http://localhost:3000/api';
@Injectable()
export class ModelService {
	constructor(private httpClient: HttpClient) {}

	getModels({ page, perPage, sortField, sortDir, filter }): Observable<ModelPaginationRsp> {
		let queryString = `${BASE_URL}/models?page=${page + 1}&perPage=${perPage}`;
		if (sortField && sortDir) {
			queryString = `${queryString}&sortField=${sortField}&sortDir=${sortDir}`;
		}
		if (filter) {
			queryString = `${queryString}&filter=${filter}`;
		}
		return this.httpClient.get<ModelPaginationRsp>(queryString);
	}
	
	findModels(): Observable<Model[]> {
		return this.httpClient.get<Model[]>(`${BASE_URL}/models`);
		
	  }
	createModel(body: Model): Observable<Model> {
		return this.httpClient.post<Model>(`${BASE_URL}/models`, body);
	}
	deleteModel(id: string): Observable<Model> {
		return this.httpClient.delete<Model>(`${BASE_URL}/models/${id}`);
	}
	findByBrand(id: string): Observable<Model> {
		return this.httpClient.get<Model>(`${BASE_URL}/models/${id}`);
	}
	getModel(id: string): Observable<Model> {
		return this.httpClient.get<Model>(`${BASE_URL}/models/${id}`);
	}
	updateModel(id: string, body: Model) {
		return this.httpClient.put<Model>(`${BASE_URL}/models/${id}`, body);
	}


	
	// downloadInvoice(id: string) {
	// 	return this.httpClient.get(`${BASE_URL}/invoices/${id}/download`, {
	// 		responseType: 'blob' // response type used to read binar data
	// 	});
	// }
}
