import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListingComponent } from './components/user-listing/user-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../shared/material.module';
import { UserService } from './services/user.service';
import { EditUserResolverService } from './services/edit.user-resolver.service';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';

@NgModule({
	imports: [ CommonModule, FormsModule, HttpClientModule, MaterialModule, ReactiveFormsModule ],
	declarations: [ UserFormComponent, UserListingComponent, UserFormDialogComponent ],
	exports: [ UserListingComponent, UserFormComponent, ReactiveFormsModule ],
	providers: [ UserService, EditUserResolverService ],
	entryComponents: [ UserFormDialogComponent ]
})
export class UsersModule {}