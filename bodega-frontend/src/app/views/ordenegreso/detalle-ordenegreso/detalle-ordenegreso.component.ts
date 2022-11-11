import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Itemordenegreso } from 'src/app/models/itemordenegreso';
import { ItemordenegresoService } from 'src/app/service/itemordenegreso.service';
import { OrdenegresoService } from 'src/app/service/ordenegreso.service';
import { ProductoService } from 'src/app/service/producto.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { Producto } from 'src/app/models/producto';
import { Cliente } from 'src/app/models/cliente';
import { Ordenegreso } from 'src/app/models/ordenegreso';

@Component({
  selector: 'app-detalle-ordenegreso',
  templateUrl: './detalle-ordenegreso.component.html',
  styleUrls: ['./detalle-ordenegreso.component.css']
})
export class DetalleOrdenegresoComponent implements OnInit {
  id: number;
  ordenegreso: Ordenegreso = new Ordenegreso();
  producto: Producto;
  cliente: Cliente;
  //listaItemsOrdenEgreso: Observable< Itemordenegreso[]>;
  listaItemsOrdenegreso: Itemordenegreso[];
  listaItemsOrdenegresoDetalle: Itemordenegreso[]= [];

  constructor(private ordenegresoService: OrdenegresoService, private itemordenegresoServicio: ItemordenegresoService, private clienteServicio:ClienteService,
    private productoServicio: ProductoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    //this.listaItemsOrdenegresoDetalle= new Arr
    this.ordenegresoService.buscarOrdenegreso(this.id).subscribe({
      next: (v) => {
        this.ordenegreso = v;
        this.ordenegreso.estado = v.estado + "";
      },
      error: (e) => console.error(e),
      complete: () => {
        this.clienteServicio.buscarCliente(this.ordenegreso.cliente).subscribe({
          next: (v) => {
            this.cliente = v;
          },
          error: (e) => console.error(e),
          complete: () => {
            this.obtenerItemsOrdenEgreso();
          }
        });
      }
    });

  }

  private obtenerItemsOrdenEgreso() {
    this.itemordenegresoServicio.obtenerListaItemFiltroOrdenEgreso(this.ordenegreso.id).subscribe({
      next: (v) => {
        this.listaItemsOrdenegreso = v;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.listaItemsOrdenegreso.forEach((value, index) => {;
          this.productoServicio.buscarProducto(value.producto).subscribe({
            next: (prod) => {
              this.producto = prod;
            },
            error: (e) => console.error(e),
            complete: () => {
              value.productodescripcion = this.producto.descripcion;
              this.listaItemsOrdenegresoDetalle.push(value);
            }
          });
        });
      }
    });
  }




  irListaOrdenegresos() {
    this.router.navigate(['/ordenesegreso']);
  }

  //Print Page
  printThisPage() {
    window.print();
  }


}
