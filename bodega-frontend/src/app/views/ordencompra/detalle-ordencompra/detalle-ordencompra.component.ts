import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Itemordencompra } from 'src/app/models/itemordencompra';
import { Ordencompra } from 'src/app/models/ordencompra';
import { Producto } from 'src/app/models/producto';
import { Proveedor } from 'src/app/models/proveedor';
import { ItemordencompraService } from 'src/app/service/itemordencompra.service';
import { OrdencompraService } from 'src/app/service/ordencompra.service';
import { ProductoService } from 'src/app/service/producto.service';
import { ProveedorService } from 'src/app/service/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-ordencompra',
  templateUrl: './detalle-ordencompra.component.html',
  styleUrls: ['./detalle-ordencompra.component.css']
})
export class DetalleOrdencompraComponent implements OnInit {
  id: number;
  ordencompra: Ordencompra = new Ordencompra();
  producto: Producto;
  proveedor: Proveedor;
  listaItemsOrdencompra: Itemordencompra[];
  listaItemsOrdencompraDetalle: Itemordencompra[]= [];

  constructor(private ordencompraService: OrdencompraService, private itemordencompraServicio: ItemordencompraService, private proveedorServicio:ProveedorService,
    private productoServicio: ProductoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.ordencompraService.buscarOrdencompra(this.id).subscribe({
      next: (v) => {
        this.ordencompra = v;
        this.ordencompra.estado = v.estado + "";
      },
      error: (e) => console.error(e),
      complete: () => {
        this.proveedorServicio.buscarProveedor(this.ordencompra.proveedor).subscribe({
          next: (v) => {
            this.proveedor = v;
          },
          error: (e) => console.error(e),
          complete: () => {
            this.obtenerItemsOrdenCompra();
          }
        });
      }
    });

  }

  private obtenerItemsOrdenCompra() {
    this.itemordencompraServicio.obtenerListaItemFiltroOrdenCompra(this.ordencompra.id).subscribe({
      next: (v) => {
        this.listaItemsOrdencompra = v;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.listaItemsOrdencompra.forEach((value, index) => {;
          this.productoServicio.buscarProducto(value.producto).subscribe({
            next: (prod) => {
              this.producto = prod;
            },
            error: (e) => console.error(e),
            complete: () => {
              value.productodescripcion = this.producto.descripcion;
              this.listaItemsOrdencompraDetalle.push(value);
            }
          });
        });
      }
    });
  }

  irListaOrdencompras() {
    this.router.navigate(['/ordenescompra']);
  }

  //Print Page
  printThisPage() {
    window.print();
  }


}
