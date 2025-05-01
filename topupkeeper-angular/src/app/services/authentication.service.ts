import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly BASE_URL: string = environment.apiURL;

  private readonly http: HttpClient = inject(HttpClient);
  private readonly platformId: Object = inject(PLATFORM_ID)


  constructor() { }

  signup(signupRequest: any): Observable<any> {
    return this.http.post(this.BASE_URL + "/auth/signup", signupRequest)
  }

  signin(loginRequest: any): Observable<any> {
    return this.http.post(this.BASE_URL + "/auth/signin", loginRequest)
  }

  isSignedIn(): boolean {
    //return !!localStorage.getItem('JWT');
    return !!this.getToken();
  }

  signout(): void {
    localStorage.removeItem('JWT');
    localStorage.removeItem('roles');
  }

  hello(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(this.BASE_URL + 'api/hello', {
      headers: headers || new HttpHeaders()
    });
  }

  private createAuthorizationHeader() {
    const jwtToken = localStorage.getItem('JWT');
      if (jwtToken) {
        return new HttpHeaders().set(
          'Authorization', 'Bearer ' + jwtToken
        )
      } else {
        console.log("JWT token not found in the Local Storage");
      return new HttpHeaders(); // Return an empty HttpHeaders object instead of null
      return null;
    }
  }

   //set the role in localstoreag so later i can send every one in his page
   public setRoles(roles: string[]) {
    if (isPlatformBrowser(this.platformId)) {
      const rolesString = roles.join(',');
      localStorage.setItem('roles', rolesString);
      console.log (rolesString);
    }
  }

  public getRoles(): string[] {
    if (isPlatformBrowser(this.platformId)) {
      const roles = localStorage.getItem('roles');
      return roles ? roles.split(',') : [];
    }
    return [];
  }
  //
  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      // get the role from the token and pass it to the localstorage
      const parts = token.split('.');
      if (parts.length === 3) {
        const decodedPayload = atob(parts[1]);
        const payload = JSON.parse(decodedPayload);
        if (payload && payload.roles) {
          this.setRoles([payload.roles]);
        }
      }
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }




}
