import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosRequest } from '../../component/usuarios/model/UsuariosRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    let url = 'http://localhost:3000/users';
    const ladata: Observable<any> = this.http.get(
      url
    );
    return ladata;
  }

  public login(username: string, password: string): Observable<any> {
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

  public new(ctaUsr: string, ctaPass: string, ctaEmail: string): Observable<any> {
    let url = 'http://localhost:3000/users';
    const ladata: Observable<any> = this.http.post(
      url,
      {
        ctaUsr,
        ctaPass,
        ctaEmail
      }
    );
    return ladata;
  }

  public update(id: number, ctaUsr: string, ctaPass: string, ctaEmail: string, estado: boolean): Observable<any> {
    let url = 'http://localhost:3000/users/' + id;
    let userData: any = {
      ctaUsr,
      ctaPass,
      ctaEmail,
      estado,
    };
    const ladata: Observable<any> = this.http.patch(
      url,
      userData
    );
    return ladata;
  }

  public delete(id: number): Observable<any> {
    let url = 'http://localhost:3000/users/' + id;
    const ladata: Observable<any> = this.http.delete(
      url
    );
    return ladata;
  }

  public obtenerByFilter(req: UsuariosRequest): Observable<any> {
    let url = 'http://localhost:3000/users/findByFilter';
    const ladata: Observable<any> = this.http.post(
      url,
      req
    );
    return ladata;
  }

}
