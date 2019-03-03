import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-task-form',
	templateUrl: './task-form.component.html',
	styleUrls: [ './task-form.component.scss' ]
})
export class TaskFormComponent implements OnInit {
	visible = false;
	pro() {
		this.visible = !this.visible;
	}
	private task: Task;
	taskForm: FormGroup;

	title = 'New Task';
	constructor(
		private fb: FormBuilder,
		private taskService: TaskService,
		public snackBar: MatSnackBar,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.createForm();
		this.setTaskToForm();
	}
	onSubmit() {
		//user wants to edit the Task
		if (this.task) {
			this.taskService.updateTask(this.task._id, this.taskForm.value).subscribe(
				(data) => {
					this.snackBar.open('Task updated', 'Success', {
						duration: 2000
					});
					this.router.navigate([ 'dashboard', 'tasks' ]);
				},
				(err) => this.errorHandler(err, 'Failed to update Task')
			);
		} else {
			this.taskService.createTask(this.taskForm.value).subscribe(
				(data) => {
					this.snackBar.open('Task created!', 'Success', {
						duration: 2000
					});
					this.taskForm.reset();
					this.router.navigate([ 'dashboard', 'tasks' ]);
				},
				(err) => this.errorHandler(err, 'Failed to create Task')
			);
		}
	}
	private setTaskToForm() {
		//get the id of the task
		this.route.params.subscribe((params) => {
			let id = params['id'];
			if (!id) {
				return;
			}
			this.title = 'Edit Task';
			this.route.data.subscribe((data: { task: Task }) => {
				this.task = data.task;
				this.taskForm.patchValue(this.task);
			});
		});
	}

	private createForm() {
		this.taskForm = this.fb.group({
			name: [ '', Validators.required ]
		});
	}
	private errorHandler(error, message) {
		console.error(error);
		this.snackBar.open(message, 'Error', {
			duration: 2000
		});
	}
}
