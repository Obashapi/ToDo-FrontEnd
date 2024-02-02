import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
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
import { ViewTaskComponent } from 'src/app/pages/view-task/view-task.component';
import { debounceTime } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SearchFilterPipe } from '../../components/searchFilter.pipe';


@Component({
  selector: 'app-default',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    SearchFilterPipe,
    
  ],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  addToggle() {
    throw new Error('Method not implemented.');
  }

  inprogressCount :number= 0;
  completedCount:number = 0;
  pendingCount:number = 0;
  status: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onNextPage = new EventEmitter<any>();
  searchText:any;
  totalPages: number = 0;
  total: number = 0;
  pageSize: number = 0;
  totalElements: number = 0;
  tasksList: Array<Tasks> = [];
  event: any = {};
  searchKeyWord = '';

  dataSource: MatTableDataSource<Tasks> = new MatTableDataSource<Tasks>();

  displayedColumns: string[] = ['title', 'priority', 'status', 'actions'];

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService

  ) {}

  ngOnInit(): void {
    const request: any = {};
    request['page'] = 0;
    request['size'] = 5;
    this.pageSize = 5;
    this.event = request;
   

    this.fetchTasks(request);

  } 
  fetchTasks(request:any) {
  
    this.taskService.getTasks(request).subscribe(
      (res) => {
        let tasks = res as any[];
        this.totalPages = res.pages;
        this.total = res.total;
        this.tasksList = tasks;
        this.dataSource.data = res['content'];
        this.totalElements = res['total'];

        this.dataSource.paginator = this.paginator;

        this.countStatusStats();
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
    const dialogRef = this.dialog.open(CreateTaskComponent, <MatDialogConfig>{
      width: '1200px',
    });

    dialogRef.afterClosed().subscribe((_res) => {
      this.fetchTasks(this.event);
    });
  }

  openEdit(data: any) {
    const createRef = this.dialog.open(CreateTaskComponent, <MatDialogConfig>{
      hasBackdrop: true,
      closeOnNavigation: true,
      disableClose: true,
      data: data,
      width: '1200px',
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
    this.router.navigate(['/view-task/', id]);
  }

  //  viewDetails(task:any){
  //   const id = task.id;
  //     const dialogRef = this.dialog.open(ViewTaskComponent, <MatDialogConfig>{
  //       width: '1200px',
  //       data: {id}
  //     });
  
  //     dialogRef.afterClosed().subscribe((_res) => {
  //       this.fetchTasks(this.event);
  //     });
  //   }
   

  deleteTask(task: any) {
    const id = task.id;
    this.taskService.deleteTask(id).subscribe(
      () => {
        this.toastr.success('Task deleted succesfully!');
        this.reloadData();
      },
      (error) => {
        this.toastr.error('Error deleting task', error);
      }
    );
  }

  countStatusStats() {
    this.taskService
      .getTasks({ page: '0', size: this.totalElements.toString() })
      .subscribe((response: { content: Tasks[] }) => {
        const fullDataset = response.content;

        let statuses = Object.values(Status);
        for (let key of statuses) {
          if (key == 'COMPLETED') {
            this.completedCount = fullDataset.filter(
              (obj) => obj.status === key
            ).length;
          } else if (key == 'PENDING') {
            this.pendingCount = fullDataset.filter(
              (obj) => obj.status === key
            ).length;
          } else if (key == 'INPROGRESS') {
            this.inprogressCount = fullDataset.filter(
              (obj) => obj.status === key
            ).length;
          }
        }
      });
      
  }


  searchTasks() {
    const finalFilter: Array<SearchCriteria> = [];

    if (this.searchKeyWord) {
      finalFilter.push({
        keyType: 'STRING',
        objType: 'FREE',
        val: this.searchKeyWord,
      });
    }
    this.dataSource.filter = JSON.stringify(finalFilter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  searchTasksList(){
    const finalFilter: Array<SearchCriteria> = [];

    if (this.searchKeyWord) {
      finalFilter.push({
        keyType: 'STRING',
        objType: 'FREE',
        val: this.searchKeyWord,
      });
    }

    this.dataSource.filter = JSON.stringify(finalFilter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchKeyWord = filterValue;
    this.searchTasksList();
    this.dataSource.filterPredicate = this.filterPredicate;

    
  }

  private filterPredicate(data: any, filter: string) {
    const objVal: Array<SearchCriteria> = JSON.parse(filter);

    if (objVal.length <= 0) {
      return true;
    }

    let finalFilter = true;
    const searchKeyWord: { exist: boolean; found: boolean } = {
      exist: false,
      found: false,
    };
   
    const COLUMNS: string[] = [
      'title',
      'status',
      'priority'
    ];
    objVal.forEach((v) => {
      switch (v.objType) {
        case 'FREE':
          searchKeyWord.exist = true;
          COLUMNS.forEach((c) => {
            if (c === 'title') {
              searchKeyWord.found =
                searchKeyWord.found ||
                (data?.title
                  ? data?.title
                    .trim()
                    .toLowerCase()
                    .includes(v.val.trim().toLowerCase())
                  : searchKeyWord.found);
            } else if (c === 'status') {
              searchKeyWord.found =
                searchKeyWord.found ||
                (data?.status
                  ? data?.status
                    .trim()
                    .toLowerCase()
                    .includes(v.val.trim().toLowerCase())
                  : searchKeyWord.found);

               
            }else if (c === 'priority') {
              searchKeyWord.found =
                searchKeyWord.found ||
                (data?.priority
                  ? data?.priority
                    .trim()
                    .toLowerCase()
                    .includes(v.val.trim().toLowerCase())
                  : searchKeyWord.found);  
               
            }
            else if(c==='status'){
              searchKeyWord.found=searchKeyWord.found||
              (data?.status? data?.status.trim().toLowerCase().includes(v.val.trim().toLowerCase())
              :searchKeyWord.found);

            }
          });
          break;
      }
    });

    finalFilter =
      finalFilter && searchKeyWord.exist ? searchKeyWord.found : finalFilter;
    return finalFilter;
  }



  getStatusColorClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed'; 
      case 'inprogress':
        return 'status-in-progress'; 
        case 'pending':
        return 'status-pending'
      
      default:
        return ''; 
    }
  }



}