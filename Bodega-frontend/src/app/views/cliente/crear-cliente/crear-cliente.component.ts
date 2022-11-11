import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {


  cliente : Cliente= new Cliente();

  estadoCliente= [
    { name: "ACTIVO", code: "true" },
    { name: "INACTIVO", code: "false" }
  ];


  erroresValidacion: any[];

  constructor(private clienteServicio:ClienteService, private router:Router) { }

  ngOnInit(): void
  {


  }


  onSubmit()
  {
      this.guardarCliente();
  }

  stringJson: string;
  stringObject: any;

  mensajeError(mensaje:string){

    Swal.fire('Cliente actualizado',`El cliente ${mensaje} ha sido actualizado con exito`,`warning`);
  }

  guardarCliente()
  {

    this.clienteServicio.registrarCliente(this.cliente).subscribe({
      next: (v) =>
      {
        this.irListaClientes();
      },
      error: (error) =>
      {

      },
      complete: () => console.info('complete')
    });
  }

  irListaClientes()
  {
    this.router.navigate(['/clientes']);
  }

  eliminarEspaciosEnBlanco(cadena: string)
  {
    return cadena.replace(/\s{2,}/g, ' ').trim();
  }

}

