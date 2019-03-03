import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListingComponent } from './components/task-listing/task-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../shared/material.module';
import { TaskService } from './services/task.service';
import { EditTaskResolverService } from './services/edit.task-resolver.services';

@NgModule({
	imports: [ CommonModule, FormsModule, HttpClientModule, MaterialModule, ReactiveFormsModule ],
	declarations: [ TaskListingComponent, TaskFormComponent ],
	exports: [ TaskListingComponent, TaskFormComponent, ReactiveFormsModule ],
	providers: [ TaskService, EditTaskResolverService ],
	entryComponents: [ TaskFormComponent ]
})
export class TasksModule {}
