import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

//Lista de Productos desde el backend
private baseURL ="http://localhost:8000/bodega/registros/contar/";

constructor(private httpClient : HttpClient) {}

//contar registros
obtenerRegistrosTablas():Observable<[]>
{
    return this.httpClient.get<[]>(this.baseURL);
}

}
