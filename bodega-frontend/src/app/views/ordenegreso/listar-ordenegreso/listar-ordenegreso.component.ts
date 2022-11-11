import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ordenegreso } from 'src/app/models/ordenegreso';
import { OrdenegresoService } from 'src/app/service/ordenegreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-ordenegreso',
  templateUrl: './listar-ordenegreso.component.html',
  styleUrls: ['./listar-ordenegreso.component.css']
})
export class ListarOrdenegresoComponent implements OnInit {

  listaOrdenegresos:Ordenegreso[];

  //paginacion de tabla
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private ordenegresoServicio:OrdenegresoService, private router:Router) {
    //this.listaOrdenegresos= new
  }

  ngOnInit(): void {
    this.obtenerOrdenegresos();
  }

  private obtenerOrdenegresos(){
    this.ordenegresoServicio.obtenerListaOrdenegresos().subscribe(dato =>{
      this.listaOrdenegresos=dato;
    });
  }
  actualizarOrdenegresoId(id:number){
    this.router.navigate(['actualizar-ordenegreso',id]);
  }

  eliminarOrdenegresoId(id:number){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar el Ordenegreso",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si , elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.ordenegresoServicio.eliminarOrdenegreso(id).subscribe(dato => {
          this.obtenerOrdenegresos();
          Swal.fire(
            'Ordenegreso eliminado',
            'El ordenegreso ha sido eliminado con éxito',
            'success'
          );
        });
      }else if(
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'No se ha eliminado el ordenegreso',
          'error'
        )
      }
    });
  }


verDetallesOrdenegreso(id:number){
  this.router.navigate(['detalle-ordenegreso',id]);
}

onTableDataChange(event: any) {
  this.page = event;
}
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
}

}
