import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserPaginationRsp } from '../models/user-model';
import { Observable } from 'rxjs/Observable';
const BASE_URL = 'http://localhost:3000/api';
@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }
  getUsers({ page, perPage, sortField, sortDir, filter }): Observable<UserPaginationRsp> {
	let queryString = `${BASE_URL}/users?page=${page + 1}&perPage=${perPage}`;
	if (sortField && sortDir) {
		queryString = `${queryString}&sortField=${sortField}&sortDir=${sortDir}`;
	}
	if (filter) {
		queryString = `${queryString}&filter=${filter}`;
	}
	return this.httpClient.get<UserPaginationRsp>(queryString);
}
findAll(): Observable<User[]> {
	return this.httpClient.get<User[]>(`${BASE_URL}/users`);
	
	}
	// getUsers(): Observable<User[]> {
	// 	return this.httpClient.get<User[]>(`${BASE_URL}/users`);
  // }
	createUser(body: User): Observable<User> {
		return this.httpClient.post<User>(`${BASE_URL}/users`, body);
	}
	deleteUser(id: string): Observable<User> {
		return this.httpClient.delete<User>(`${BASE_URL}/users/${id}`);
	}
	getUser(id: string): Observable<User> {
		return this.httpClient.get<User>(`${BASE_URL}/users/${id}`);
	}
	updateUser(id: string, body: User) {
		return this.httpClient.put<User>(`${BASE_URL}/users/${id}`, body);
	}
}
