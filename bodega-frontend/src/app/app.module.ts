import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

//PRODUCTO
import { ListaProductosComponent } from './views/producto/lista-productos/lista-productos.component';
import { CrearProductoComponent } from './views/producto/crear-producto/crear-producto.component';
import { ActualizarProductoComponent } from './views/producto/actualizar-producto/actualizar-producto.component';
//TIPO PRODUCTO
import { ListaTipoproductoComponent } from './views/tipoproducto/lista-tipoproducto/lista-tipoproducto.component';
import { CrearTipoproductoComponent } from './views/tipoproducto/crear-tipoproducto/crear-tipoproducto.component';
import { ActualizarTipoproductoComponent } from './views/tipoproducto/actualizar-tipoproducto/actualizar-tipoproducto.component';
//CUSTOM THEME NG MATERIAL
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//PROVEEDORES
import { ListaProveedorComponent } from './views/proveedor/lista-proveedor/lista-proveedor.component';
import { CrearProveedorComponent } from './views/proveedor/crear-proveedor/crear-proveedor.component';
import { ActualizarProveedorComponent } from './views/proveedor/actualizar-proveedor/actualizar-proveedor.component';
//INTERCEPTORES
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';

import { ToastrModule } from 'ngx-toastr';
import { ActualizarOrdenegresoComponent } from './views/ordenegreso/actualizar-ordenegreso/actualizar-ordenegreso.component';
import { CrearOrdenegresoComponent } from './views/ordenegreso/crear-ordenegreso/crear-ordenegreso.component';
import { ListarOrdenegresoComponent } from './views/ordenegreso/listar-ordenegreso/listar-ordenegreso.component';
import { ListarOrdencompraComponent } from './views/ordencompra/listar-ordencompra/listar-ordencompra.component';
import { CrearOrdencompraComponent } from './views/ordencompra/crear-ordencompra/crear-ordencompra.component';
import { ActualizarOrdencompraComponent } from './views/ordencompra/actualizar-ordencompra/actualizar-ordencompra.component';
import { LoginComponent } from './views/login/login.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ControlDecimalNumberDirective } from './directives/control-decimal-number.directive';
import { ControlFormatNumberDirective } from './directives/control-format-number.directive';
import { ListarClienteComponent } from './views/cliente/listar-cliente/listar-cliente.component';
import { CrearClienteComponent } from './views/cliente/crear-cliente/crear-cliente.component';
import { ActualizarClienteComponent } from './views/cliente/actualizar-cliente/actualizar-cliente.component';
import { HomeComponent } from './views/home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetalleOrdencompraComponent } from './views/ordencompra/detalle-ordencompra/detalle-ordencompra.component';
import { DetalleOrdenegresoComponent } from './views/ordenegreso/detalle-ordenegreso/detalle-ordenegreso.component';
import { ListarLoteproductoComponent } from './views/loteproducto/listar-loteproducto/listar-loteproducto.component';
import { DetalleLoteproductoComponent } from './views/loteproducto/detalle-loteproducto/detalle-loteproducto.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaProductosComponent,
    CrearProductoComponent,
    ActualizarProductoComponent,
    ListaTipoproductoComponent,
    CrearTipoproductoComponent,
    ActualizarTipoproductoComponent,
    ListaProveedorComponent,
    CrearProveedorComponent,
    ActualizarProveedorComponent,
    ActualizarOrdenegresoComponent,
    CrearOrdenegresoComponent,
    ListarOrdenegresoComponent,
    ListarOrdencompraComponent,
    CrearOrdencompraComponent,
    ActualizarOrdencompraComponent,
    LoginComponent,
    ProfileComponent,
    ControlDecimalNumberDirective,
    ControlFormatNumberDirective,
    ListarClienteComponent,
    CrearClienteComponent,
    ActualizarClienteComponent,
    HomeComponent,
    DetalleOrdencompraComponent,
    DetalleOrdenegresoComponent,
    ListarLoteproductoComponent,
    DetalleLoteproductoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,    //import here
    ReactiveFormsModule, //import here
    NgbModule,
    NgSelectModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(
      {
        timeOut: 8000,
        //https://www.npmjs.com/package/ngx-toastr
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }
    ),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
    //{provide: HTTP_INTERCEPTORS, useClass: SessionInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
