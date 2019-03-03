import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { TaskPaginationRsp, Task } from '../models/task';
const BASE_URL = 'http://localhost:3000/api';
@Injectable()
export class TaskService {
	constructor(private httpClient: HttpClient) {}
	getTasks({ page, perPage, sortField, sortDir, filter }): Observable<TaskPaginationRsp> {
		let queryString = `${BASE_URL}/tasks?page=${page + 1}&perPage=${perPage}`;
		if (sortField && sortDir) {
			queryString = `${queryString}&sortField=${sortField}&sortDir=${sortDir}`;
		}
		if (filter) {
			queryString = `${queryString}&filter=${filter}`;
		}
		return this.httpClient.get<TaskPaginationRsp>(queryString);
	}
	findTasks(): Observable<Task[]> {
		return this.httpClient.get<Task[]>(`${BASE_URL}/tasks`);
		
	  }
	createTask(body: Task): Observable<Task> {
		return this.httpClient.post<Task>(`${BASE_URL}/tasks`, body);
	}
	getTask(id: string): Observable<Task> {
		return this.httpClient.get<Task>(`${BASE_URL}/tasks/${id}`);
	}
	updateTask(id: string, body: Task): Observable<Task> {
		return this.httpClient.put<Task>(`${BASE_URL}/tasks/${id}`, body);
	}
	deleteTask(id: string): Observable<Task> {
		return this.httpClient.delete<Task>(`${BASE_URL}/tasks/${id}`);
	}
}
