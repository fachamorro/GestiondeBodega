import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ordenegreso } from '../models/ordenegreso';

@Injectable({
  providedIn: 'root'
})
export class OrdenegresoService {

//Lista de Ordenegresos desde el backend
private baseURL ="http://localhost:8000/bodega/ordenegreso/";

constructor(private httpClient : HttpClient) {}
//obtener enpleados
obtenerListaOrdenegresos():Observable<Ordenegreso[]>
{
    return this.httpClient.get<Ordenegreso[]>(this.baseURL);
}

//metodo para persistir Ordenegreso
registrarOrdenegreso(ordenegreso: Ordenegreso): Observable <Ordenegreso>
{
  return this.httpClient.post<Ordenegreso>(this.baseURL,ordenegreso);
}

buscarOrdenegreso(id:number): Observable <Ordenegreso>
{
  return this.httpClient.get<Ordenegreso>(this.baseURL+id);
}

eliminarOrdenegreso(id:number): Observable <Object>
{
  return this.httpClient.delete(this.baseURL+id);
}

//este metodo sirve para actualizar el Ordenegreso
actualizarOrdenegreso(id:number, ordenegreso:Ordenegreso) : Observable<Object>
{
  return this.httpClient.put(this.baseURL+id, ordenegreso);
}

}
