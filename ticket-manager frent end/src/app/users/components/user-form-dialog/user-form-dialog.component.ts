
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { FormDialogComponent } from './../../../clients/components/form-dialog/form-dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent implements OnInit {
  userForm: FormGroup;
	title = 'New User';

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private userService: UserService,
		private snackBar: MatSnackBar
  ) {}
	onNoClick(): void {
		this.dialogRef.close();
	}
	updateSize() {
		this.dialogRef.updateSize('750px', '500px');
	}
  ngOnInit() {
    this.initUserForm();
		console.log(this.data);
		if (this.data && this.data.userId) {
			this.setUserToForm(this.data.usertId);
		}
  }

 
  private setUserToForm(userId) {
		this.title = 'Edit User';
		this.userService.getUser(userId).subscribe(
			(user) => {
				this.userForm.patchValue(user);
			},
			(err) => this.errorHandler(err, 'Failed to load user')
		);
  }

  
  private initUserForm() {
		this.userForm = this.fb.group({
      email: [ '', Validators.required ],
      password: [ '', Validators.required ],
      name: [ '', Validators.required ],
      phone: [ '', Validators.required ],
			address: [ '', Validators.required ],
		
		});
	}
	private errorHandler(error, message) {
		console.error(error);
		this.snackBar.open(message, 'Error', {
			duration: 2000
		});
	}

}
