// import { Inject, Injectable } from '@angular/core';

// import { StorageMap } from '@ngx-pwa/local-storage';
// import { CookieService } from 'ngx-cookie-service';

// import { SecurityConstants } from './../security.constants';
// import { Observable } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
// export class PrincipalService {

//   constructor(@Inject(CookieService) private cookieService: CookieService,
//    @Inject(StorageMap) private storage: StorageMap) { }

//   async isAuthenticated(): Promise<boolean> {
//     return await this.getToken() ? true : false;
// }

// async getToken(): Promise<string | null> {
//   try {
//       let token = await this.storage.get(SecurityConstants.tokenKey).toPromise();
//       const rememberToken = this.cookieService.get(SecurityConstants.rememberMeKey);
//       token = token ? token : rememberToken ? rememberToken : null;

//       return token ? token as string : null;
//   } catch {
//       return null;
//   }
// }
// }
