import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Obtenemos el token del localStorage
    let currentUser = JSON.parse(sessionStorage.getItem('usuarioLogin') || '{}');
    let token = currentUser.token;
    let request = req;
	//Validamos si el token existe
    if (token) {
      //Clonamos el token y lo mandamos en la cabecera de todas las peticiones HTTP
      request = req.clone({
        setHeaders: {
          authorization: `token ${ token }`
        }
      });
    }
    return next.handle(request);
  }
}
