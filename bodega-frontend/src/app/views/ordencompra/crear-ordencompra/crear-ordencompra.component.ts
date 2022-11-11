import { DatePipe, formatNumber } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Itemordencompra } from 'src/app/models/itemordencompra';
import { Loteproducto } from 'src/app/models/loteproducto';
import { Ordencompra } from 'src/app/models/ordencompra';
import { Producto } from 'src/app/models/producto';
import { Proveedor } from 'src/app/models/proveedor';
import { ItemordencompraService } from 'src/app/service/itemordencompra.service';
import { LoteproductoService } from 'src/app/service/loteproducto.service';
import { OrdencompraService } from 'src/app/service/ordencompra.service';
import { ProductoService } from 'src/app/service/producto.service';
import { ProveedorService } from 'src/app/service/proveedor.service';

@Component({
  selector: 'app-crear-ordencompra',
  templateUrl: './crear-ordencompra.component.html',
  styleUrls: ['./crear-ordencompra.component.css'],
  providers: [DatePipe]
})
export class CrearOrdencompraComponent implements OnInit {

  ordencompra: Ordencompra;
  itemordencompra: Itemordencompra;
  producto: Producto;
  loteproducto: Loteproducto;

  estadoOrdencompra = [
    { name: "ACTIVO", code: "true" },
    { name: "INACTIVO", code: "false" }
  ];


  listaItemOrdencompra: Observable<Itemordencompra[]>;
  listaProducto: Observable<Producto[]>;
  listaLoteProducto: Observable<Loteproducto[]>;
  listaProveedor: Observable<Proveedor[]>;
  ListaItems: Array<Itemordencompra> = [];

  constructor(private ordencompraServicio: OrdencompraService, private itemordencompraServicio: ItemordencompraService,
    private productoServicio: ProductoService, private loteproductoServicio: LoteproductoService, private proveedorServicio: ProveedorService,
    private router: Router, @Inject(LOCALE_ID) private locale: string, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.ordencompra = new Ordencompra();
    this.ordencompra.estado = 'true';
    this.ordencompra.valorTotal = 0.00;
    this.obtenerProductos();
    this.obtenerProveedores();
    this.itemordencompra = new Itemordencompra();
  }


  private obtenerProductos() {
    this.listaProducto = this.productoServicio.obtenerListaProductos();
  }

  private obtenerProveedores() {
    this.listaProveedor = this.proveedorServicio.obtenerListaProveedores();
  }

  onSubmit() {
    this.guardarOrdencompra();
  }

  onSubmitItem() {
    this.itemordencompra.valorTotalItem = this.formatoNumeroDecimal(this.itemordencompra.cantidad * this.itemordencompra.precioUnitario);
    this.itemordencompra.id = this.ListaItems.length + 1;
    this.asignaDetalleProducto(this.itemordencompra.producto);
  }

  asignaDetalleProducto(idproducto: number) {
    this.productoServicio.buscarProducto(idproducto).subscribe({
      next: (v) => {
        this.producto = v;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.itemordencompra.productodescripcion=this.producto.descripcion;
        this.ordencompra.valorTotal = this.formatoNumeroDecimal(this.ordencompra.valorTotal + this.itemordencompra.valorTotalItem);
        this.ListaItems.push(this.itemordencompra);
        this.itemordencompra = new Itemordencompra();

      }
    });
  }

  guardarOrdencompra() {

    this.ordencompraServicio.registrarOrdencompra(this.ordencompra).subscribe({
      next: (v) => {
        this.ordencompra = v;
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
      value.ordenCompra = this.ordencompra.id;
      this.itemordencompraServicio.registrarItemordencompra(value).subscribe({
        next: (item) => {
          this.actualizarProductoCantidad(item);
          this.guardarLoteProducto(item);

        },
        error: (e) => console.error(e),
        complete: () => {
          this.irListaOrdencompras();

        }
      });

    });
    this.ListaItems = this.ListaItemsAuxiliar;
  }

  actualizarProductoCantidad(item:Itemordencompra){

    this.producto= new Producto();
    this.productoServicio.buscarProducto(item.producto).subscribe({
      next: (v) => {
        this.producto = v;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.producto.cantidad=this.producto.cantidad+item.cantidad;
        this.productoServicio.actualizarProducto(this.producto.id,this.producto).subscribe({
          next: (v) => {
          },
          error: (e) => console.error(e),
          complete: () => {

          }
        });

      }
    });

  }

  guardarLoteProducto(item:Itemordencompra) {
    this.loteproducto= new Loteproducto();
    this.loteproducto.cantidad=item.cantidad;
    //this.loteproducto.fechaCaducidad
    this.loteproducto.numeroLote=item.lote;
    this.loteproducto.precioUnitario=item.precioUnitario;
    this.loteproducto.producto=item.producto;
    this.loteproductoServicio.registrarLoteproducto(this.loteproducto).subscribe({
      next: (item) => {
      },
      error: (e) => console.error(e),
      complete: () => {
      }
    });
  }

  irListaOrdencompras() {
    this.router.navigate(['/ordenescompra']);
  }

  eliminarEspaciosEnBlanco(cadena: string) {
    return cadena.replace(/\s{2,}/g, ' ').trim();
  }


  actualizarItemOrdencompraId(id: number) {
    this.router.navigate(['actualizar-itemordencompra', id]);
  }

  eliminarItemOrdencompraId(id: number) {

    this.ListaItems.forEach((value, index) => {
      if (value.id == id) {
        this.ordencompra.valorTotal = this.formatoNumeroDecimal(this.ordencompra.valorTotal - value.valorTotalItem);
        this.ListaItems.splice(index, 1);
      }
    });
    this.actualizarListaItem();
  }

  ListaItemsAuxiliar: Array<Itemordencompra> = [];
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
