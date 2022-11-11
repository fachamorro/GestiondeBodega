import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders
  ({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  api_url: string = 'http://localhost:8000/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string){
    return this.http.post<any>(
      this.api_url + 'accounts/api/auth/',
      {
        'username':username,
        'password':password,
      },
      httpOptions
    ).pipe(
      map(user =>{
        if(user && user.token){
          sessionStorage.setItem('usuarioLogin',JSON.stringify(user));
        }
        return user;
      })
    );
  }

  logout()
  {
    sessionStorage.removeItem("usuarioLogin");
  }


  //no habilitado
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      this.api_url + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }


}
