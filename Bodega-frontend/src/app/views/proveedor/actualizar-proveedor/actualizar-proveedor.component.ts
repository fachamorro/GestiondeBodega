import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/service/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-proveedor',
  templateUrl: './actualizar-proveedor.component.html',
  styleUrls: ['./actualizar-proveedor.component.css']
})
export class ActualizarProveedorComponent implements OnInit {

  id:number;
  proveedor:Proveedor = new Proveedor();


  constructor(private proveedorService:ProveedorService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.proveedorService.buscarProveedor(this.id).subscribe({
      next: (v) => {
        this.proveedor = v;


      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });

  }



  irListaProveedores(){
    this.router.navigate(['/proveedores']);
    Swal.fire('Proveedor actualizado',`El proveedor ${this.proveedor.razonSocial} ha sido actualizado con exito`,`success`);
  }

  onSubmit(){
    this.proveedorService.actualizarProveedor(this.id,this.proveedor).subscribe(dato => {
      this.irListaProveedores();
    },error => console.log(error));
  }

  eliminarEspaciosEnBlanco(cadena: string)
  {
    return cadena.replace(/\s{2,}/g, ' ').trim();
  }

}
