import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

//Lista de Productos desde el backend
private baseURL ="http://localhost:8000/bodega/producto/";

constructor(private httpClient : HttpClient) {}

//obtener enpleados
obtenerListaProductos():Observable<Producto[]>
{
    return this.httpClient.get<Producto[]>(this.baseURL);
}

//metodo para persistir Producto
registrarProducto(producto: Producto): Observable <Object>
{
  return this.httpClient.post(this.baseURL,producto);
}

buscarProducto(id:number): Observable <Producto>
{
  return this.httpClient.get<Producto>(this.baseURL+id);
}

eliminarProducto(id:number): Observable <Object>
{
  return this.httpClient.delete(this.baseURL+id);
}

//este metodo sirve para actualizar el Producto
actualizarProducto(id:number, producto:Producto) : Observable<Object>
{
  return this.httpClient.put(this.baseURL+id, producto);
}

}
