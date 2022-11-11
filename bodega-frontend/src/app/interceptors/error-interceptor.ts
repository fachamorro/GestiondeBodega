import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor extends HttpErrorResponse {

  listaErrores= [ ];

  constructor(private toastrService: ToastrService, private router:Router)
  {
    super(toastrService);
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errMsg = '';
          let errorType = '';
          // Client Side Error
          if (error.error instanceof ErrorEvent) {
            //errMsg = 'Error:'+ error.message+'\n';
          } else {  // Server Side Error
            if (error.status === 0) {
              errMsg = "No hay conexión con el servidor\n";
              errorType = 'Codigo Error: '+error.status+'\n';
              //errorType = 'Codigo Error: '+error.status+ 'Major Error';
              this.toastrService.error(errMsg, errorType, { closeButton: true});
            } else if (error.status === 400||error.status === 401) {
              errMsg = "Credenciales NO validas\n";
              errorType = 'Codigo Error: '+error.status+'\n';
              //errorType = 'Codigo Error: '+error.status+ 'Major Error';
              this.toastrService.error(errMsg, errorType, { closeButton: true});
              this.router.navigate(['/login']);
            }
            else
            {
              this.listaErrores=JSON.parse(JSON.stringify(error.error));
              for(const prop in this.listaErrores) {
                this.toastrService.error(this.listaErrores[prop], prop.toUpperCase(), { closeButton: true});
              }
            }
            this.listaErrores=JSON.parse(JSON.stringify(error.error));

          }

          this.listaErrores =[];
          return throwError(error);
        })
      )
  }
}
