import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Category } from '../models/category';

const BASE_URL = 'http://localhost:3000/api';
@Injectable()
export class CategoryService {
	constructor(private httpClient: HttpClient) {}

	getCategories({ page, perPage, sortField, sortDir, filter }): Observable<Category> {
		let queryString = `${BASE_URL}/categories?page=${page + 1}&perPage=${perPage}`;
		if (sortField && sortDir) {
			queryString = `${queryString}&sortField=${sortField}&sortDir=${sortDir}`;
		}
		if (filter) {
			queryString = `${queryString}&filter=${filter}`;
		}
		return this.httpClient.get<Category>(queryString);
	}

	getAllCategories(): Observable<Category[]> {
		return this.httpClient.get<Category[]>(`${BASE_URL}/categories`);
	  }
	  
	createCategory(body: Category): Observable<Category> {
		return this.httpClient.post<Category>(`${BASE_URL}/categories`, body);
	}
	deleteCategory(id: string): Observable<Category> {
		return this.httpClient.delete<Category>(`${BASE_URL}/categories/${id}`);
	}
	getCategory(id: string): Observable<Category> {
		return this.httpClient.get<Category>(`${BASE_URL}/categories/${id}`);
	}
	updateCategory(id: string, body: Category) {
		return this.httpClient.put<Category>(`${BASE_URL}/categories/${id}`, body);
	}
	// downloadCategory(id: string) {
	// 	return this.httpClient.get(`${BASE_URL}/Categorys/${id}/download`, {
	// 		responseType: 'blob' // response type used to read binar data
	// 	});
	// }
	
}
