import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
//Lista de Clientees desde el backend
private baseURL ="http://localhost:8000/bodega/cliente/";

constructor(private httpClient : HttpClient) {}
//obtener enpleados
obtenerListaClientees():Observable<Cliente[]>
{
    return this.httpClient.get<Cliente[]>(this.baseURL);
}

//metodo para persistir Cliente
registrarCliente(cliente: Cliente): Observable <Object>
{
  return this.httpClient.post(this.baseURL,cliente);
}

buscarCliente(id:number): Observable <Cliente>
{
  return this.httpClient.get<Cliente>(this.baseURL+id);
}

eliminarCliente(id:number): Observable <Object>
{
  return this.httpClient.delete(this.baseURL+id);
}

//este metodo sirve para actualizar el Cliente
actualizarCliente(id:number, cliente:Cliente) : Observable<Object>
{
  return this.httpClient.put(this.baseURL+id, cliente);
}

}

