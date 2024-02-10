import { NgStyle } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialogModule,
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { createTask, registerUser } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthenticationService } from 'src/app/authenticationService/authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  standalone:true,
  imports:[  CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerLogin!:registerUser;
  registerForm!: FormGroup;
  submitted: boolean = false;
  constructor( public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService:AuthenticationService,
    private fb: FormBuilder,
    private router: Router,) { }

  ngOnInit(): void {
  this.initForm()
  }


  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  initForm() {
    this.registerForm = this.fb.group({
      id: [''],
      firstname: [this.registerLogin? this.registerLogin.firstname : null, [Validators.required]],
     lastname: [
        this.registerLogin ? this.registerLogin.lastname : null,
        [Validators.required],
      ],
      email: [this.registerLogin ? this.registerLogin.email : null, [Validators.required]],
      password: [this.registerLogin ? this.registerLogin.email : null,[Validators.required]],
    });
  }

  // onSubmit(){
  //   this.submitted=true;
  //   let detail=<any>{
  //     id:this.f['id'].value,
  //     firstname:this.f['firstname'].value,
  //     lastname:this.f['lastname'].value,
  //     email:this.f['email'].value,
  //     password:this.f['password'].value,
  //   }
   
  //     this.register();
    
  // }

  register(): void {
    if (this.registerForm.valid) 
    return;
    this.submitted=true;
    let detail=<any>{
      id:this.f['id'].value,
      firstname:this.f['firstname'].value,
      lastname:this.f['lastname'].value,
      email:this.f['email'].value,
      password:this.f['password'].value,
    }

      this.authService.register(detail).subscribe(
        (_res) => {
          this.router.navigate(['']);
        },
        (error) => {
          console.error('Registration failed', error);
        }
      );
    
  }

}
