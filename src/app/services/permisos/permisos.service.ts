import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(private http: HttpClient) { }

  public obtenerPermisos(): Observable<any> {
    let url = 'http://localhost:3000/permisos';
    const ladata: Observable<any> = this.http.get(
      url
    );
    return ladata;
  }

  public newUser(name: string, descrip: string, code: string, estado: boolean): Observable<any> {
    let url = 'http://localhost:3000/permisos';
    const ladata: Observable<any> = this.http.post(
      url,
      {
        name, descrip, code, estado
      }
    );
    return ladata;
  }

  public updatePermisos(id: number, name: string, descrip: string, code: string, estado: boolean): Observable<any> {
    let url = 'http://localhost:3000/permisos/' + id;
    let userData: any = {
      name: name,
      descrip: descrip,
      code: code,
      estado: estado,
    };
    const ladata: Observable<any> = this.http.patch(
      url,
      userData
    );
    return ladata;
  }

  public deleteUser(id: number): Observable<any> {
    let url = 'http://localhost:3000/permisos/' + id;
    const ladata: Observable<any> = this.http.delete(
      url
    );
    return ladata;
  }

}
