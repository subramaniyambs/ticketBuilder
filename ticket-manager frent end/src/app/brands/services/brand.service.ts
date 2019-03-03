import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BrandPaginationRsp, Brand } from '../models/brand';
const BASE_URL = 'http://localhost:3000/api';
@Injectable()
export class BrandService {
	constructor(private httpClient: HttpClient) {}

	getBrands({ page, perPage, sortField, sortDir, filter }): Observable<BrandPaginationRsp> {
		let queryString = `${BASE_URL}/brands?page=${page + 1}&perPage=${perPage}`;
		if (sortField && sortDir) {
			queryString = `${queryString}&sortField=${sortField}&sortDir=${sortDir}`;
		}
		if (filter) {
			queryString = `${queryString}&filter=${filter}`;
		}
		return this.httpClient.get<BrandPaginationRsp>(queryString);
	}
	findBrands(): Observable<Brand[]> {
		return this.httpClient.get<Brand[]>(`${BASE_URL}/brands`);
		
	  }
	createBrand(body: Brand): Observable<Brand> {
		return this.httpClient.post<Brand>(`${BASE_URL}/brands`, body);
	}
	deleteBrand(id: string): Observable<Brand> {
		return this.httpClient.delete<Brand>(`${BASE_URL}/brands/${id}`);
	}
	getBrand(id: string): Observable<Brand> {
		return this.httpClient.get<Brand>(`${BASE_URL}/brands/${id}`);
	}
	updateBrand(id: string, body: Brand) {
		return this.httpClient.put<Brand>(`${BASE_URL}/brands/${id}`, body);
	}
	// downloadBrand(id: string) {
	// 	return this.httpClient.get(`${BASE_URL}/Categorys/${id}/download`, {
	// 		responseType: 'blob' // response type used to read binar data
	// 	});
	// }
	
}
