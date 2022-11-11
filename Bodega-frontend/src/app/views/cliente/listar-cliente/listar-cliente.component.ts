import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {


  listaClientees:Cliente[];


  constructor(private clienteServicio:ClienteService, private router:Router) {
    //this.listaClientees= new
  }

  ngOnInit(): void {
    this.obtenerClientees();
  }

  private obtenerClientees(){
    this.clienteServicio.obtenerListaClientees().subscribe(dato =>{
      this.listaClientees=dato;
    });
  }
  actualizarClienteId(id:number){
    this.router.navigate(['actualizar-cliente',id]);
  }

  eliminarClienteId(id:number){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar el Cliente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si , elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.clienteServicio.eliminarCliente(id).subscribe(dato => {
          this.obtenerClientees();
          Swal.fire(
            'Cliente eliminado',
            'El cliente ha sido eliminado con éxito',
            'success'
          );
        });
      }else if(
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'No se ha eliminado el cliente',
          'error'
        )
      }
    });
  }


verDetallesCliente(id:number){
  this.router.navigate(['detalles-cliente',id]);
}
}

