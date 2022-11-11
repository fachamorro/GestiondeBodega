import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent implements OnInit {


  id:number;
  cliente:Cliente = new Cliente();


  constructor(private clienteService:ClienteService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clienteService.buscarCliente(this.id).subscribe({
      next: (v) => {
        this.cliente = v;


      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });

  }



  irListaClientes(){
    this.router.navigate(['/clientes']);
    Swal.fire('Cliente actualizado',`El cliente ${this.cliente.nombres} ${this.cliente.apellidos} ha sido actualizado con exito`,`success`);
  }

  onSubmit(){
    this.clienteService.actualizarCliente(this.id,this.cliente).subscribe(dato => {
      this.irListaClientes();
    },error => console.log(error));
  }

  eliminarEspaciosEnBlanco(cadena: string)
  {
    return cadena.replace(/\s{2,}/g, ' ').trim();
  }

}
