import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//productos
import { ListaProductosComponent } from './views/producto/lista-productos/lista-productos.component';
import { CrearProductoComponent } from './views/producto/crear-producto/crear-producto.component';
import { ActualizarProductoComponent} from './views/producto/actualizar-producto/actualizar-producto.component';
//tipoproductos
import { ListaTipoproductoComponent } from './views/tipoproducto/lista-tipoproducto/lista-tipoproducto.component';
import { CrearTipoproductoComponent } from './views/tipoproducto/crear-tipoproducto/crear-tipoproducto.component';
import { ActualizarTipoproductoComponent} from './views/tipoproducto/actualizar-tipoproducto/actualizar-tipoproducto.component';
//proveedores
import { ListaProveedorComponent } from './views/proveedor/lista-proveedor/lista-proveedor.component';
import { CrearProveedorComponent } from './views/proveedor/crear-proveedor/crear-proveedor.component';
import { ActualizarProveedorComponent } from './views/proveedor/actualizar-proveedor/actualizar-proveedor.component';

//clientes
import { ListarClienteComponent } from './views/cliente/listar-cliente/listar-cliente.component';
import { CrearClienteComponent } from './views/cliente/crear-cliente/crear-cliente.component';
import { ActualizarClienteComponent } from './views/cliente/actualizar-cliente/actualizar-cliente.component';

//orden compra
import { ListarOrdencompraComponent } from './views/ordencompra/listar-ordencompra/listar-ordencompra.component';
import { CrearOrdencompraComponent } from './views/ordencompra/crear-ordencompra/crear-ordencompra.component';
import { ActualizarOrdencompraComponent } from './views/ordencompra/actualizar-ordencompra/actualizar-ordencompra.component';
import { DetalleOrdencompraComponent } from './views/ordencompra/detalle-ordencompra/detalle-ordencompra.component';

//orden egreso
import { ListarOrdenegresoComponent } from './views/ordenegreso/listar-ordenegreso/listar-ordenegreso.component';
import { CrearOrdenegresoComponent } from './views/ordenegreso/crear-ordenegreso/crear-ordenegreso.component';
import { DetalleOrdenegresoComponent } from './views/ordenegreso/detalle-ordenegreso/detalle-ordenegreso.component';

//Login
import { LoginComponent } from './views/login/login.component';
import { ProfileComponent } from './views/profile/profile.component';

//home
import { HomeComponent } from './views/home/home.component';

//lote producto
import { ListarLoteproductoComponent } from './views/loteproducto/listar-loteproducto/listar-loteproducto.component';
import { DetalleLoteproductoComponent } from './views/loteproducto/detalle-loteproducto/detalle-loteproducto.component';

const routes: Routes = [
  //login default
  {path: '', redirectTo:'login',pathMatch:'full'},
  //productos
  {path: 'productos',component:ListaProductosComponent},
  {path: 'crear-producto', component : CrearProductoComponent},
  {path: 'actualizar-producto/:id', component : ActualizarProductoComponent},

   //lotes productos
   {path: 'lotesproductos',component:ListarLoteproductoComponent},
   {path: 'detalles-loteproducto/:id', component : DetalleLoteproductoComponent},
   //{path: 'actualizar-producto/:id', component : ActualizarProductoComponent},

  //tipoproducto
  {path: 'tipoproducto',component:ListaTipoproductoComponent},
  {path: 'crear-tipoproducto', component : CrearTipoproductoComponent},
  {path: 'actualizar-tipoproducto/:id', component : ActualizarTipoproductoComponent},

  //proveedor
  {path: 'proveedores',component:ListaProveedorComponent},
  {path: 'crear-proveedor', component : CrearProveedorComponent},
  {path: 'actualizar-proveedor/:id', component : ActualizarProveedorComponent},

  //clientes
  {path: 'clientes',component:ListarClienteComponent},
  {path: 'crear-cliente', component : CrearClienteComponent},
  {path: 'actualizar-cliente/:id', component : ActualizarClienteComponent},

  //orden compra
  {path: 'ordenescompra',component:ListarOrdencompraComponent},
  {path: 'crear-ordencompra', component : CrearOrdencompraComponent},
  {path: 'actualizar-ordencompra/:id', component : ActualizarOrdencompraComponent},
  {path: 'detalle-ordencompra/:id', component : DetalleOrdencompraComponent},

  //orden compra
  {path: 'ordenesegreso', component:ListarOrdenegresoComponent},
  {path: 'crear-ordenegreso', component : CrearOrdenegresoComponent},
  {path: 'detalle-ordenegreso/:id', component : DetalleOrdenegresoComponent},

   //Login
   {path: 'login',component:LoginComponent},
   {path: 'profile',component:ProfileComponent},

   //Home
   {path: 'home',component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
