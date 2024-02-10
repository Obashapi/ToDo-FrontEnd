import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
// import { CoreComponent } from './core/core.component';
// import { LoginComponent } from './pages/login/login.component';
// import { MasterheaderComponent } from './shared/layouts/masterheader/masterheader.component';
import { DefaultComponent } from './shared/layouts/default/default.component';
import { SlidePanelComponent } from './shared/ui/slide-panel/slide-panel.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule} from '@angular/material/dialog';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFilterPipe } from './shared/components/searchFilter.pipe';
import { CommonModule } from '@angular/common';
import { AuthHttpAuthenticationServiceInterceptor } from './interceptors/auth-http-authentication-service.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    SlidePanelComponent,
 
     
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    CommonModule,
    SearchFilterPipe,
    ToastrModule.forRoot({
      preventDuplicates: true,
      positionClass: 'toast-top-right',
    }),
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
 
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpAuthenticationServiceInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
