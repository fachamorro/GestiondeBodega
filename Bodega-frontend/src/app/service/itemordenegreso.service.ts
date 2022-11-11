import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itemordenegreso } from '../models/itemordenegreso';

@Injectable({
  providedIn: 'root'
})
export class ItemordenegresoService {

//Lista de Itemordenegresos desde el backend
private baseURL ="http://localhost:8000/bodega/itemordenegreso/";

constructor(private httpClient : HttpClient) {}
//obtener enpleados
obtenerListaItemordenegresos():Observable<Itemordenegreso[]>
{
    return this.httpClient.get<Itemordenegreso[]>(this.baseURL);
}

//obtener items de orden de compra
obtenerListaItemFiltroOrdenEgreso(id:number):Observable<Itemordenegreso[]>
{
    return this.httpClient.get<Itemordenegreso[]>(this.baseURL+"filtrooe/"+id);
}

//metodo para persistir Itemordenegreso
registrarItemordenegreso(itemordenegreso: Itemordenegreso): Observable <Itemordenegreso>
{
  return this.httpClient.post<Itemordenegreso>(this.baseURL,itemordenegreso);
}

buscarItemordenegreso(id:number): Observable <Itemordenegreso>
{
  return this.httpClient.get<Itemordenegreso>(this.baseURL+id);
}

eliminarItemordenegreso(id:number): Observable <Object>
{
  return this.httpClient.delete(this.baseURL+id);
}

//este metodo sirve para actualizar el Itemordenegreso
actualizarItemordenegreso(id:number, itemordenegreso:Itemordenegreso) : Observable<Object>
{
  return this.httpClient.put(this.baseURL+id, itemordenegreso);
}

}

