import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ordencompra } from '../models/ordencompra';

@Injectable({
  providedIn: 'root'
})
export class OrdencompraService {


//Lista de Ordencompras desde el backend
private baseURL ="http://localhost:8000/bodega/ordencompra/";

constructor(private httpClient : HttpClient) {}
//obtener enpleados
obtenerListaOrdencompras():Observable<Ordencompra[]>
{
    return this.httpClient.get<Ordencompra[]>(this.baseURL);
}

//metodo para persistir Ordencompra
registrarOrdencompra(ordencompra: Ordencompra): Observable <Ordencompra>
{
  return this.httpClient.post<Ordencompra>(this.baseURL,ordencompra);
}

buscarOrdencompra(id:number): Observable <Ordencompra>
{
  return this.httpClient.get<Ordencompra>(this.baseURL+id);
}

eliminarOrdencompra(id:number): Observable <Object>
{
  return this.httpClient.delete(this.baseURL+id);
}

//este metodo sirve para actualizar el Ordencompra
actualizarOrdencompra(id:number, ordencompra:Ordencompra) : Observable<Object>
{
  return this.httpClient.put(this.baseURL+id, ordencompra);
}

}

