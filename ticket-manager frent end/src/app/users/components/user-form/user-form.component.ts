import { UserService } from './../../services/user.service';
import { JwtService } from './../../../core/services/jwt.service';
import { AuthService } from './../../../core/services/auth.service';



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  authForm: FormGroup;
  title = '';
  isResultsLoading = false;
  constructor(private fb: FormBuilder,
    private userService : UserService,
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router,
    private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.initForm();
  }
  ngSignup() {
    //if title is Signup
    //we need to send the request for Signup
   
      this.isResultsLoading = true
      this.authService.signup(this.authForm.value)
        .subscribe(data => {
          console.log(data);
          this.router.navigate(['/dashboard', 'home']);
        }, err => this.errorHandler(err, 'Opps, something went wrong'),
          () => this.isResultsLoading = false);
      
  }

  private initForm() {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
     // name: ['', Validators.required],
      // phone: ['', Validators.required],
      // address: ['', Validators.required]
    })
  }
  private errorHandler(error, message) {
    this.isResultsLoading = false;
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }

}
