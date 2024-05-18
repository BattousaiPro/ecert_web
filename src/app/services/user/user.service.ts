import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public obtenerUser(): Observable<any> {
    let url = 'http://localhost:3000/users';
    const ladata: Observable<any> = this.http.get(
      url
    );
    return ladata;
  }

  public access(username: string, password: string): Observable<any> {
    let url = 'http://localhost:3000/auth/login';
    let userData: any = {
      ctaUsr: username,
      ctaPass: password
    };
    const ladata: Observable<any> = this.http.post(
      url,
      userData
    );
    return ladata;
  }

  public newUser(ctaUsr: string, ctaPass: string, ctaEmail: string): Observable<any> {
    let url = 'http://localhost:3000/users';
    const ladata: Observable<any> = this.http.post(
      url,
      {
        ctaUsr: ctaUsr,
        ctaPass: ctaPass,
        ctaEmail: ctaEmail
      }
    );
    return ladata;
  }

}
