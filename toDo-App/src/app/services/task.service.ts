import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createTask } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private getUrl: string="http://localhost:8080/api/v1/tasks";

constructor(private http: HttpClient) { }

getTasks(request?: any): Observable<any> {
  const params=request;
return this.http.get<any[]>(this.getUrl,{params});
}

createTasks(taskDetails:createTask): Observable<createTask>{
return this.http.post<createTask>(this.getUrl,taskDetails);
}

updateTasks(taskDetails :createTask, id:string){
  return this.http.patch<createTask>(`${this.getUrl}/${id}`,taskDetails);
}

getTaskById(taskId: string): Observable<any>{
  return this.http.get(
    `${this.getUrl}/${taskId}`
  )

}

deleteTask(taskId: string): Observable<any>{
  return this.http.delete(`${this.getUrl}/${taskId}`,{responseType:'text'});
}
}
