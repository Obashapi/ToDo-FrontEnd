import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pipe } from 'rxjs';
import { AuthenticationResponse, authenticationRequest, registerUser } from '../models/task.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:8080/api/v1/auth/';
  http: any;

  constructor(private httpClient: HttpClient) { }

  authenticate(username: string,password:string){
    return this.httpClient.post<any>("http://localhost:8080/api/v1/auth/authenticate",{username,password})
    .pipe(
      map(userData =>{

        sessionStorage.setItem("username", username);
        let tokenStr = "Bearer" + userData.token;
        sessionStorage.setItem("token",tokenStr);
        return userData;
      })
    )
  }

  login(loginRequest:any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "authenticate", loginRequest)
  }

  isUserLoggedIn(){
    let user =sessionStorage.getItem("username");
    console.log(!(user=== null));
    return !(user === null);
  }

//   async isAuthenticated(): Promise<boolean> {
//     return await this.getToken() ? true : false;
// }

  logOut(){
    sessionStorage.removeItem("usename")
  }


  register(registerRequest: registerUser): Observable<AuthenticationResponse> {
    const url = `${this.baseUrl}register`;
    return this.httpClient.post<AuthenticationResponse>(url, registerRequest);
  }
}
