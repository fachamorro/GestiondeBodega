import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/service/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrls: ['./crear-proveedor.component.css']
})
export class CrearProveedorComponent implements OnInit {


  proveedor : Proveedor= new Proveedor();

  estadoProveedor= [
    { name: "ACTIVO", code: "true" },
    { name: "INACTIVO", code: "false" }
  ];


  erroresValidacion: any[];

  constructor(private proveedorServicio:ProveedorService, private router:Router) { }

  ngOnInit(): void
  {


  }


  onSubmit()
  {
      this.guardarProveedor();
  }

  stringJson: string;
  stringObject: any;

  mensajeError(mensaje:string){

    Swal.fire('Proveedor actualizado',`El proveedor ${mensaje} ha sido actualizado con exito`,`warning`);
  }

  guardarProveedor()
  {

    this.proveedorServicio.registrarProveedor(this.proveedor).subscribe({
      next: (v) =>
      {
        this.irListaProveedores();
      },
      error: (error) =>
      {},
      complete: () => console.info('complete')
    });
  }

  irListaProveedores()
  {
    this.router.navigate(['/proveedores']);
  }

  eliminarEspaciosEnBlanco(cadena: string)
  {
    return cadena.replace(/\s{2,}/g, ' ').trim();
  }

}
