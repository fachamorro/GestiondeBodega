import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  listaProductos:Producto[];

  //paginacion de tabla
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];



  constructor(private productoServicio:ProductoService, private router:Router) {
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  private obtenerProductos(){
    this.productoServicio.obtenerListaProductos().subscribe(dato =>{
      this.listaProductos=dato;
    });
  }
  actualizarProductoId(id:number){
    this.router.navigate(['actualizar-producto',id]);
  }

  eliminarProductoId(id:number){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar el Producto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si , elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.productoServicio.eliminarProducto(id).subscribe(dato => {
          this.obtenerProductos();
          Swal.fire(
            'Producto eliminado',
            'El producto ha sido eliminado con éxito',
            'success'
          );
        });
      }else if(
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'No se ha eliminado el producto',
          'error'
        )
      }
    });
  }


verDetallesProducto(id:number){
  this.router.navigate(['detalles-producto',id]);
}

onTableDataChange(event: any) {
  this.page = event;
  //this.fetchPosts();
}
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  //this.fetchPosts();
}

}
