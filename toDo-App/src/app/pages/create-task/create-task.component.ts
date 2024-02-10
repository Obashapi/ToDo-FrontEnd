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
import { createTask } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';



@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
    
    
  ],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  createTaskform!: FormGroup;
  tasks!: createTask;
  submitted: boolean = false;
  mode: 'ADD' | 'EDIT' = 'ADD';
  btnText = 'Save';
  heading = 'Create Task';
  isReadonly: boolean=false;
  // isReadonly: boolean=false;
  constructor(
    private taskService: TaskService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateTaskComponent>
  ) {
    if (data) {
      this.mode = 'EDIT';
      this.initForm();
      this.isReadonly = !this.isReadonly;
    }
  }

  ngOnInit(): void {

    this.initForm();
    this.btnText = this.mode == 'ADD' ? 'Save' : 'Update';
    this.heading =
      this.mode == 'ADD'
        ? 'Create Task'
        : 'Edit Task';
if(this.data){
  this.populateForm();}
  }

  populateForm() {
    this.createTaskform.setValue({
      id: this.data.id,
      title: this.data?.title,
      priority: this.data?.priority,
      status: this.data?.status,
      description: this.data?.description,
      creationDate: this.data?.creationDate,
      dueDate: this.data?.creationDate,
    });
  }

  initForm() {
    this.createTaskform = this.fb.group({
      id: [''],
      title: [this.tasks ? this.tasks.title : null, [Validators.required]],
      priority: [
        this.tasks ? this.tasks.priority : null,
        [Validators.required],
      ],
      status: [this.tasks ? this.tasks.status : null, [Validators.required]],
      description: [this.tasks ? this.tasks.status : null,[Validators.required]],
      creationDate: [this.tasks ? this.tasks.creationDate : null],
      dueDate: [this.tasks ? this.tasks.creationDate : null],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.createTaskform.controls;
  }

  createTask(details: any) {
    this.taskService.createTasks(details).subscribe(
      (res) => {
        this.toastr.success('Task created Successfully');
        this.dialogRef.close();
      },
      (error) => {
        const message =
          error.status === 0 ? 'Cannot reach the server' : error.message;
        this.toastr.error(message, 'Task Creation Failed');
      }
    );
  }

  editTask(details: any){
    this.taskService.updateTasks(details, this.f['id'].value).subscribe(res=>{
      this.toastr.success('Task Edited Successfully');
      this.dialogRef.close(res);
    },
    (error) => {
      const message =
        error.status === 0 ? 'Cannot reach the server' : error.message;
      this.toastr.error(message, 'Editing task Error');
    
    })
  }

  onSubmit(){
    this.submitted=true;
    let task=<any>{
      id:this.f['id'].value,
      title:this.f['title'].value,
      priority:this.f['priority'].value,
      status:this.f['status'].value,
      description:this.f['description'].value,
      creationDate:this.f['creationDate'].value,
      dueDate:this.f['dueDate'].value
    }
    if(this.data){
      task.id =this.data.id;
      this.editTask(task);

    }else{
      this.createTask(task);
    }
  }
  
}
