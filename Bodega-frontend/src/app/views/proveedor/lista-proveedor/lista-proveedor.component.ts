import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/service/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-proveedor',
  templateUrl: './lista-proveedor.component.html',
  styleUrls: ['./lista-proveedor.component.css']
})
export class ListaProveedorComponent implements OnInit {

  listaProveedores:Proveedor[];


  constructor(private proveedorServicio:ProveedorService, private router:Router) {

  }

  ngOnInit(): void {
    this.obtenerProveedores();
  }

  private obtenerProveedores(){
    this.proveedorServicio.obtenerListaProveedores().subscribe(dato =>{
      this.listaProveedores=dato;
    });
  }
  actualizarProveedorId(id:number){
    this.router.navigate(['actualizar-proveedor',id]);
  }

  eliminarProveedorId(id:number){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar el Proveedor",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si , elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.proveedorServicio.eliminarProveedor(id).subscribe(dato => {
          this.obtenerProveedores();
          Swal.fire(
            'Proveedor eliminado',
            'El proveedor ha sido eliminado con éxito',
            'success'
          );
        });
      }else if(
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'No se ha eliminado el proveedor',
          'error'
        )
      }
    });
  }


verDetallesProveedor(id:number){
  this.router.navigate(['detalles-proveedor',id]);
}
}

