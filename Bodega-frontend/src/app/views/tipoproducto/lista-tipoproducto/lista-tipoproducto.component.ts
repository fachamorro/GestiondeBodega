import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tipoproducto } from 'src/app/models/tipoproducto';
import { TipoproductoService } from 'src/app/service/tipoproducto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-tipoproducto',
  templateUrl: './lista-tipoproducto.component.html',
  styleUrls: ['./lista-tipoproducto.component.css']
})
export class ListaTipoproductoComponent implements OnInit {

  listaTiposProductos:Tipoproducto[];


  constructor(private tipoproductoServicio:TipoproductoService, private router:Router) {
    //this.listaProductos= new
  }

  ngOnInit(): void {
    this.obtenerTipoProductos();
  }

  private obtenerTipoProductos(){
    this.tipoproductoServicio.obtenerListaTipoproductos().subscribe(dato =>{
      this.listaTiposProductos=dato;
    });
  }
  actualizarTipoProductoId(id:number){
    this.router.navigate(['actualizar-tipoproducto',id]);
  }

  eliminarTipoProductoId(id:number){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar la categoría del Producto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si , elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.tipoproductoServicio.eliminarTipoproducto(id).subscribe(dato => {
          this.obtenerTipoProductos();
          Swal.fire(
            'Categoría de Productos eliminada',
            'La categoría de productos ha sido eliminado con éxito',
            'success'
          );
        });
      }else if(
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'No se ha eliminado la categoría del producto',
          'error'
        )
      }
    });
  }


verDetallesTipoProducto(id:number){
  this.router.navigate(['detalles-tipoproducto',id]);
}
}
