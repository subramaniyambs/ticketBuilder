import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Task } from '../models/task';
import { TaskService } from './task.service';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EditTaskResolverService implements Resolve<Task> {
	constructor(private taskService: TaskService, private router: Router) {}
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task> {
		let id = route.paramMap.get('id');
		return this.taskService.getTask(id).pipe(
			take(1),
			map((task) => {
				if (task) {
					return task;
				} else {
					this.router.navigate([ '/dashboard', 'tasks' ]);
					return null;
				}
			})
		);
	}
}
