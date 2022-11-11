import { DatePipe, formatNumber } from '@angular/common';
import {  Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { Itemordenegreso } from 'src/app/models/itemordenegreso';
import { Loteproducto } from 'src/app/models/loteproducto';
import { Ordenegreso } from 'src/app/models/ordenegreso';
import { Producto } from 'src/app/models/producto';
import { Proveedor } from 'src/app/models/proveedor';
import { ClienteService } from 'src/app/service/cliente.service';
import { ItemordenegresoService } from 'src/app/service/itemordenegreso.service';
import { LoteproductoService } from 'src/app/service/loteproducto.service';
import { OrdenegresoService } from 'src/app/service/ordenegreso.service';
import { ProductoService } from 'src/app/service/producto.service';
import { ProveedorService } from 'src/app/service/proveedor.service';


@Component({
  selector: 'app-crear-ordenegreso',
  templateUrl: './crear-ordenegreso.component.html',
  styleUrls: ['./crear-ordenegreso.component.css'],
  providers: [DatePipe]
})
export class CrearOrdenegresoComponent implements OnInit {
  ordenegreso: Ordenegreso;
  itemordenegreso: Itemordenegreso;
  producto: Producto;
  loteProducto: Loteproducto;

  estadoOrdenegreso = [
    { name: "ACTIVO", code: "true" },
    { name: "INACTIVO", code: "false" }
  ];


  listaItemOrdenegreso: Observable<Itemordenegreso[]>;
  listaProducto: Observable<Producto[]>;
  listaLoteProducto: Observable<Loteproducto[]>;

  listaClientes: Observable<Cliente[]>;
  ListaItems: Array<Itemordenegreso> = [];

  constructor(private ordenegresoServicio: OrdenegresoService, private itemordenegresoServicio: ItemordenegresoService,
    private productoServicio: ProductoService, private loteproductoServicio: LoteproductoService, private clienteServicio: ClienteService,
    private router: Router, @Inject(LOCALE_ID) private locale: string, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.ordenegreso = new Ordenegreso();
    this.ordenegreso.estado = 'true';
    this.ordenegreso.valorTotal = 0.00;
    this.loteProducto= new Loteproducto();
    this.loteProducto.cantidad=0;this.loteProducto= new Loteproducto();
    this.loteProducto.cantidad=0;
    this.obtenerProductos();
    this.obtenerClientes();
    this.itemordenegreso = new Itemordenegreso();
  }


  private obtenerProductos() {
    this.listaProducto = this.productoServicio.obtenerListaProductos();
  }

  private obtenerClientes() {
    this.listaClientes = this.clienteServicio.obtenerListaClientees();
  }

  onSubmit() {
    this.guardarOrdenegreso();
  }

  onSubmitItem() {
    this.itemordenegreso.valorTotalItem = this.formatoNumeroDecimal(this.itemordenegreso.cantidad * this.itemordenegreso.precioUnitario);
    this.itemordenegreso.id = this.ListaItems.length + 1;
    this.asignaDetalleProducto(this.itemordenegreso.producto);
  }

  asignaDetalleProducto(idproducto: number) {
    this.productoServicio.buscarProducto(idproducto).subscribe({
      next: (v) => {
        this.producto = v;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.itemordenegreso.productodescripcion=this.producto.descripcion;
        this.ordenegreso.valorTotal = this.formatoNumeroDecimal(this.ordenegreso.valorTotal + this.itemordenegreso.valorTotalItem);
        this.ListaItems.push(this.itemordenegreso);
        this.itemordenegreso = new Itemordenegreso();
        this.loteProducto= new Loteproducto();
        this.loteProducto.cantidad=0;

      }
    });
  }

  guardarOrdenegreso() {

    this.ordenegresoServicio.registrarOrdenegreso(this.ordenegreso).subscribe({
      next: (v) => {
        this.ordenegreso = v;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.guardarItemsOrdenCompra();
      }
    });
  }

  guardarItemsOrdenCompra() {
    this.ListaItemsAuxiliar = [];

    this.ListaItems.forEach((value, index) => {
      value.id = 0;
      value.ordenEgreso = this.ordenegreso.id;
      this.itemordenegresoServicio.registrarItemordenegreso(value).subscribe({
        next: (item) => {
          this.actualizarProductoCantidad(item);
        },
        error: (e) => console.error(e),
        complete: () => {
          this.irListaOrdenegresos();

        }
      });

    });
    this.ListaItems = this.ListaItemsAuxiliar;
  }

  actualizarProductoCantidad(item:Itemordenegreso){

    this.producto= new Producto();
    this.productoServicio.buscarProducto(item.producto).subscribe({
      next: (v) => {
        this.producto = v;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.producto.cantidad=this.producto.cantidad-item.cantidad;
        this.productoServicio.actualizarProducto(this.producto.id,this.producto).subscribe({
          next: (v) => {
          },
          error: (e) => console.error(e),
          complete: () => {
            console.info('completo actualizacion');
          }
        });

      }
    });

  }

  actualizarLoteProducto(item:Itemordenegreso) {
    this.loteProducto= new Loteproducto();
    this.loteProducto.cantidad=item.cantidad;
    this.loteProducto.precioUnitario=item.precioUnitario;
    this.loteProducto.producto=item.producto;
    this.loteproductoServicio.registrarLoteproducto(this.loteProducto).subscribe({
      next: (item) => {
      },
      error: (e) => console.error(e),
      complete: () => {
      }
    });
  }

  irListaOrdenegresos() {
    this.router.navigate(['/ordenesegreso']);
  }

  eliminarEspaciosEnBlanco(cadena: string) {
    return cadena.replace(/\s{2,}/g, ' ').trim();
  }


  buscarLotesProductos(idproducto: number) {
    if (typeof idproducto !== 'undefined'){
      if (idproducto>0){
        this.listaLoteProducto= this.loteproductoServicio.obtenerListaLoteFiltroProducto(idproducto);
      }
    }

  }

  disponibilidadLoteProductos(idlote: number) {
    if (typeof idlote !== 'undefined'){
      if (idlote>0){
      this.loteProducto= new Loteproducto();
      this.loteproductoServicio.buscarLoteproducto(idlote).subscribe({
        next: (v) => {
          this.loteProducto = v;
        },
        error: (e) => console.error(e),
        complete: () => {
          this.itemordenegreso.precioUnitario=this.loteProducto.precioUnitario;
        }
      });
    }
  }
  }

  actualizarItemOrdenegresoId(id: number) {
    this.router.navigate(['actualizar-itemordenegreso', id]);
  }

  eliminarItemOrdenegresoId(id: number) {

    this.ListaItems.forEach((value, index) => {
      if (value.id == id) {
        this.ordenegreso.valorTotal = this.formatoNumeroDecimal(this.ordenegreso.valorTotal - value.valorTotalItem);
        this.ListaItems.splice(index, 1);
      }
    });
    this.actualizarListaItem();
  }

  ListaItemsAuxiliar: Array<Itemordenegreso> = [];
  actualizarListaItem() {
    this.ListaItemsAuxiliar = [];
    let contador = 1;
    this.ListaItems.forEach((value, index) => {
      value.id = contador;
      this.ListaItemsAuxiliar.push(value);
      contador = contador + 1;
    });
    this.ListaItems = this.ListaItemsAuxiliar;
  }

  validateNumber(e: any) {
    let input = String.fromCharCode(e.charCode);
    const reg = /^\d*(?:[.]\d{1,2})?$/;
    if (!reg.test(input)) {
      e.preventDefault();
    }
  }
  formatoNumeroDecimal(numero:number):number
  {
    return Number(formatNumber(numero, this.locale, '1.0-5').toString().replace(',', ""));
  }

}
