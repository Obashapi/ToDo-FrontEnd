import { TestBed } from '@angular/core/testing';

import { AuthHttpAuthenticationServiceInterceptor } from './auth-http-authentication-service.interceptor';

describe('AuthHttpAuthenticationServiceInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthHttpAuthenticationServiceInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthHttpAuthenticationServiceInterceptor = TestBed.inject(AuthHttpAuthenticationServiceInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
