import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DefaultComponent } from './shared/layouts/default/default.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { ViewTaskComponent } from './pages/view-task/view-task.component';
import { DeleteTaskComponent } from './pages/delete-task/delete-task.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  
  {
    path:'',
    component: LoginComponent,
  },
  {
    path:'register',
    component:RegisterComponent
  },

  {
    path: 'dashboard',
    component: DefaultComponent,
    
    },
  {
    path: 'create-task',
    component: CreateTaskComponent

    
  },
 
  {
    path: 'view-task/:id',
    component: ViewTaskComponent
  },

  {
    path: 'delete-task',
    component: DeleteTaskComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
