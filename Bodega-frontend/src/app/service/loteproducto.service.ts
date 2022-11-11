import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loteproducto } from '../models/loteproducto';

@Injectable({
  providedIn: 'root'
})
export class LoteproductoService {

//Lista de Loteproductos desde el backend
private baseURL ="http://localhost:8000/bodega/loteproducto/";

constructor(private httpClient : HttpClient) {}
//obtener enpleados
obtenerListaLoteproductos():Observable<Loteproducto[]>
{
    return this.httpClient.get<Loteproducto[]>(this.baseURL);
}

//obtener Lotes por producto
obtenerListaLoteFiltroProducto(id:number):Observable<Loteproducto[]>
{
    return this.httpClient.get<Loteproducto[]>(this.baseURL+"filtro/"+id);
}

//metodo para persistir Loteproducto
registrarLoteproducto(loteproducto: Loteproducto): Observable <Object>
{
  return this.httpClient.post(this.baseURL,loteproducto);
}

buscarLoteproducto(id:number): Observable <Loteproducto>
{
  return this.httpClient.get<Loteproducto>(this.baseURL+id);
}

eliminarLoteproducto(id:number): Observable <Object>
{
  return this.httpClient.delete(this.baseURL+id);
}

//este metodo sirve para actualizar el Loteproducto
actualizarLoteproducto(id:number, loteproducto:Loteproducto) : Observable<Object>
{
  return this.httpClient.put(this.baseURL+id, loteproducto);
}

}
