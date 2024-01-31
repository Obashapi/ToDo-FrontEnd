import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterOutlet } from '@angular/router';
import { SearchCriteria, Status, Tasks } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { PageEvent } from '@angular/material/paginator';
import { CreateTaskComponent } from 'src/app/pages/create-task/create-task.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogConfig,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  addToggle() {
    throw new Error('Method not implemented.');
  }

  inProgressCount = 0;
  completedCount = 0;
  pendingCount = 0;
  status: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchCriteria!: SearchCriteria;

  totalPages: number = 0;
  total: number = 0;
  pageSize: number = 0;
  totalElements: number = 0;
  // tasks: any[] = [];
  tasksList: Array<Tasks> = [];
  event: any = {};

  dataSource: MatTableDataSource<Tasks> = new MatTableDataSource<Tasks>();

  displayedColumns: string[] = ['title', 'priority', 'status', 'actions'];

  constructor(private taskService: TaskService, 
    public dialog: MatDialog,  
     private router: Router,
     private toastr: ToastrService,) {}

  ngOnInit(): void {
    const request: any = {};
    request['page'] = 0;
    request['size'] = 5;
    this.pageSize = 5;
    this.event = request;
    this.fetchTasks(request);
    this.countStatusStats();
  }

  fetchTasks(request: any) {
    this.taskService.getTasks(request).subscribe(
      (res) => {
        let tasks = res as any[];
        this.totalPages = res.pages;
        this.total = res.total;
        this.tasksList = tasks;
        this.dataSource.data = res['content'];
        this.totalElements = res['total'];

        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );
  }

  nextPage(event: PageEvent) {
    const request: any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.fetchTasks(request);
  }

  createTasks() {
    const dialogRef = this.dialog.open(CreateTaskComponent,<MatDialogConfig> {
      width: '1800px' });

    dialogRef.afterClosed().subscribe((_res) => {
     this.fetchTasks(this.event);
    });
  }

  openEdit(data: any) {
    const createRef = this.dialog.open(CreateTaskComponent, <
      MatDialogConfig
      >{
      hasBackdrop: true,
      closeOnNavigation: true,
      disableClose: true,
      data: data,
      width: '800px',
    });

    createRef.afterClosed().subscribe((_res) => {
      this.reloadData();
    });
  }

  reloadData() {
    const request: any = {};
    this.fetchTasks(request);
    this.dataSource.paginator = this.paginator;
  }
  
  viewDetails(task: any) {
    const id = task.id;
    this.router.navigate([
      '/view-task/',
      id,
    ]);
  }

deleteTask(task:any){
const id=task.id;
this.taskService.deleteTask(id).subscribe(()=>{
this.toastr.success('Task deleted succesfully!')
this.reloadData();

},(error)=>{
  this.toastr.error('Error deleting task',error)
})

}


  countStatusStats() {
    this.taskService
      .getTasks({ page: '0', size: this.totalElements.toString() })
      .subscribe(
        (response: { content: Tasks[] }) => {
          const fullDataset = response.content;

          fullDataset.forEach((task: Tasks) => {
            
            switch (task?.status) {
            
              case Status.INPROGRESS:
                this.inProgressCount++;
                break;
              case Status.COMPLETED:
                this.completedCount++;
                break;

              case Status.PENDING:
                this.pendingCount++;
                break;

              default:
                break;
            }
          });
        },
        (error) => {
          console.error('Error fetching tasks for status stats', error);
        }
      );
  }

 

}
