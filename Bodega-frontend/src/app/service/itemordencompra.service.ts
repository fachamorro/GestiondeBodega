import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itemordencompra } from '../models/itemordencompra';

@Injectable({
  providedIn: 'root'
})
export class ItemordencompraService {

//Lista de Itemordencompras desde el backend
private baseURL ="http://localhost:8000/bodega/itemordencompra/";

constructor(private httpClient : HttpClient) {}
//obtener enpleados
obtenerListaItemordencompras():Observable<Itemordencompra[]>
{
    return this.httpClient.get<Itemordencompra[]>(this.baseURL);
}

//obtener items de orden de compra
obtenerListaItemFiltroOrdenCompra(id:number):Observable<Itemordencompra[]>
{
    return this.httpClient.get<Itemordencompra[]>(this.baseURL+"filtrooc/"+id);
}

//metodo para persistir Itemordencompra
registrarItemordencompra(itemordencompra: Itemordencompra): Observable <Itemordencompra>
{
  return this.httpClient.post<Itemordencompra>(this.baseURL,itemordencompra);
}

buscarItemordencompra(id:number): Observable <Itemordencompra>
{
  return this.httpClient.get<Itemordencompra>(this.baseURL+id);
}

eliminarItemordencompra(id:number): Observable <Object>
{
  return this.httpClient.delete(this.baseURL+id);
}

//este metodo sirve para actualizar el Itemordencompra
actualizarItemordencompra(id:number, itemordencompra:Itemordencompra) : Observable<Object>
{
  return this.httpClient.put(this.baseURL+id, itemordencompra);
}

}
