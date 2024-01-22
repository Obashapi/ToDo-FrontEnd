import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
// import { CoreComponent } from './core/core.component';
import { LoginComponent } from './pages/login/login.component';
import { TodoComponent } from './pages/todo/todo.component';
import { TodoCardComponent } from './shared/components/todo-card/todo-card.component';
// import { MasterheaderComponent } from './shared/layouts/masterheader/masterheader.component';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { DefaultComponent } from './shared/layouts/default/default.component';
import { SlidePanelComponent } from './shared/ui/slide-panel/slide-panel.component';
import { MasterComponent } from './shared/layouts/master/master.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    // CoreComponent,
    LoginComponent,
    TodoComponent,
    TodoCardComponent,
    // MasterheaderComponent,
    // HeaderComponent,
    // DefaultComponent,
    SlidePanelComponent,
    // MasterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
    // AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
