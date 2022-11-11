import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ordencompra } from 'src/app/models/ordencompra';
import { OrdencompraService } from 'src/app/service/ordencompra.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-ordencompra',
  templateUrl: './listar-ordencompra.component.html',
  styleUrls: ['./listar-ordencompra.component.css']
})
export class ListarOrdencompraComponent implements OnInit {

  listaOrdencompras:Ordencompra[];

  //paginacion de tabla
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];


  constructor(private ordencompraServicio:OrdencompraService, private router:Router) {
  }

  ngOnInit(): void {
    this.obtenerOrdencompras();
  }

  private obtenerOrdencompras(){
    this.ordencompraServicio.obtenerListaOrdencompras().subscribe(dato =>{
      this.listaOrdencompras=dato;
    });
  }
  actualizarOrdencompraId(id:number){
    this.router.navigate(['actualizar-ordencompra',id]);
  }

  eliminarOrdencompraId(id:number){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar el Ordencompra",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si , elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.ordencompraServicio.eliminarOrdencompra(id).subscribe(dato => {
          this.obtenerOrdencompras();
          Swal.fire(
            'Ordencompra eliminado',
            'El ordencompra ha sido eliminado con éxito',
            'success'
          );
        });
      }else if(
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'No se ha eliminado el ordencompra',
          'error'
        )
      }
    });
  }


verDetallesOrdencompra(id:number){
  this.router.navigate(['detalle-ordencompra',id]);
}

onTableDataChange(event: any) {
  this.page = event;
}
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
}

}
