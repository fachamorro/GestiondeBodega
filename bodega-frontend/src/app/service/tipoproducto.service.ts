import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipoproducto } from '../models/tipoproducto';

@Injectable({
  providedIn: 'root'
})
export class TipoproductoService {

//Lista de Tipoproductos desde el backend
private baseURL ="http://localhost:8000/bodega/tipoproducto/";

constructor(private httpClient : HttpClient) {}
//obtener enpleados
obtenerListaTipoproductos():Observable<Tipoproducto[]>
{
    return this.httpClient.get<Tipoproducto[]>(this.baseURL);
}

//metodo para persistir Tipoproducto
registrarTipoproducto(producto: Tipoproducto): Observable <Object>
{
  return this.httpClient.post(this.baseURL,producto);
}

buscarTipoproducto(id:number): Observable <Tipoproducto>
{
  return this.httpClient.get<Tipoproducto>(this.baseURL+id);
}

eliminarTipoproducto(id:number): Observable <Object>
{
  return this.httpClient.delete(this.baseURL+id);
}

//este metodo sirve para actualizar el Tipoproducto
actualizarTipoproducto(id:number, producto:Tipoproducto) : Observable<Object>
{
  return this.httpClient.put(this.baseURL+id, producto);
}
}
