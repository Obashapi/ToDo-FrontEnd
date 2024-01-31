import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig ,MatDialogModule, MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,} from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [MatFormFieldModule,MatDialogModule],
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
})
export class ViewTaskComponent implements OnInit {
  taskId!: string;
  selectedTask!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.taskId = res['id'];
      this.getTaskById(this.taskId);
    });
  }

  getTaskById(taskId: string) {
    this.taskService.getTaskById(taskId).subscribe(
      (res) => {
        this.selectedTask = res;

      },
      (err) => {
        this.toastr.error(err.message, 'Failed to get the task');
      }
    );
  }

  editTask(block: any) {
    const dialogRef = this.dialog.open(CreateTaskComponent, <MatDialogConfig>{
      hasBackdrop: true,
      closeOnNavigation: true,
      disableClose: true,
      data: block,
      width: '800px',
    });
    dialogRef.afterClosed().subscribe((_result: any) => {
      this.getTaskById(this.taskId);
    });
  }
}
