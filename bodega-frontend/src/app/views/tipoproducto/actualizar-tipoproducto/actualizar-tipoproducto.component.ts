import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tipoproducto } from 'src/app/models/tipoproducto';
import { TipoproductoService } from 'src/app/service/tipoproducto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-tipoproducto',
  templateUrl: './actualizar-tipoproducto.component.html',
  styleUrls: ['./actualizar-tipoproducto.component.css']
})
export class ActualizarTipoproductoComponent implements OnInit {

  id:number;
  tipoproducto:Tipoproducto = new Tipoproducto();


  estadoProducto= [
    { name: "ACTIVO", code: "true" },
    { name: "INACTIVO", code: "false" }
  ];

 /* estadoProducto: string[] = [
  'true',
  'false'
];*/
  constructor(private tipoproductoServicio:TipoproductoService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.tipoproductoServicio.buscarTipoproducto(this.id).subscribe({
      next: (v) => {
        this.tipoproducto = v;
        //this.tipoproducto.estado=v.estado+"";
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });

  }



  irListaTiposProductos(){
    this.router.navigate(['/tipoproducto']);
    Swal.fire('Actualizado',`El tipo de producto  ${this.tipoproducto.descripcion} ha sido actualizado con exito`,`success`);
  }

  onSubmit(){
    this.tipoproductoServicio.actualizarTipoproducto(this.id,this.tipoproducto).subscribe(dato => {
      this.irListaTiposProductos();
    },error => console.log(error));
  }

  eliminarEspaciosEnBlanco(cadena: string)
  {
    return cadena.replace(/\s{2,}/g, ' ').trim();
  }

}

