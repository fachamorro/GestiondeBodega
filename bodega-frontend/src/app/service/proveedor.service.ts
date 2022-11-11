import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
//Lista de Proveedores desde el backend
private baseURL ="http://localhost:8000/bodega/proveedor/";

constructor(private httpClient : HttpClient) {}
//obtener enpleados
obtenerListaProveedores():Observable<Proveedor[]>
{
    return this.httpClient.get<Proveedor[]>(this.baseURL);
}

//metodo para persistir Proveedor
registrarProveedor(proveedor: Proveedor): Observable <Object>
{
  return this.httpClient.post(this.baseURL,proveedor);
}

buscarProveedor(id:number): Observable <Proveedor>
{
  return this.httpClient.get<Proveedor>(this.baseURL+id);
}

eliminarProveedor(id:number): Observable <Object>
{
  return this.httpClient.delete(this.baseURL+id);
}

//este metodo sirve para actualizar el Proveedor
actualizarProveedor(id:number, proveedor:Proveedor) : Observable<Object>
{
  return this.httpClient.put(this.baseURL+id, proveedor);
}

}

