import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

//Lista de Usuarios desde el backend
private baseURL ="http://localhost:8000/bodega/login/";

constructor(private httpClient : HttpClient) {}
//obtener enpleados
obtenerListaUsuarios():Observable<Usuario[]>
{
    return this.httpClient.get<Usuario[]>(this.baseURL);
}

//metodo para persistir Usuario
registrarUsuario(proveedor: Usuario): Observable <Object>
{
  return this.httpClient.post(this.baseURL,proveedor);
}

buscarUsuario(id:number): Observable <Usuario>
{
  return this.httpClient.get<Usuario>(this.baseURL+id);
}

eliminarUsuario(id:number): Observable <Object>
{
  return this.httpClient.delete(this.baseURL+id);
}

//este metodo sirve para actualizar el Usuario
actualizarUsuario(id:number, proveedor:Usuario) : Observable<Object>
{
  return this.httpClient.put(this.baseURL+id, proveedor);
}

//este metodo sirve para iniciar sesion el Usuario
loginUsuario(usuario:Usuario) : Observable<Object>
{
  return this.httpClient.post(this.baseURL, usuario);
}


}

