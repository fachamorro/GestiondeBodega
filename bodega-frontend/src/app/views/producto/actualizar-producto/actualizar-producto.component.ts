import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2Data } from 'ng-select2-component';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { Tipoproducto } from 'src/app/models/tipoproducto';
import { ProductoService } from 'src/app/service/producto.service';
import { TipoproductoService } from 'src/app/service/tipoproducto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {
  id:number;
  producto:Producto = new Producto();

  listaTiposProducto: Observable<Tipoproducto[]>;

  estadoProducto= [
    { name: "ACTIVO", code: "true" },
    { name: "INACTIVO", code: "false" }
  ];

 /* estadoProducto: string[] = [
  'true',
  'false'
];*/
  constructor(private productoService:ProductoService, private tipoproductoServicio:TipoproductoService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productoService.buscarProducto(this.id).subscribe({
      next: (v) => {
        this.producto = v;
        this.producto.estado=v.estado+"";
        this.obtenerTiposProducto();
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });

  }


  private obtenerTiposProducto(){
    this.listaTiposProducto=this.tipoproductoServicio.obtenerListaTipoproductos();
  }

  irListaProductos(){
    this.router.navigate(['/productos']);
    Swal.fire('Producto actualizado',`El producto ${this.producto.descripcion} ha sido actualizado con exito`,`success`);
  }

  onSubmit(){
    this.productoService.actualizarProducto(this.id,this.producto).subscribe(dato => {
      this.irListaProductos();
    },error => console.log(error));
  }

  eliminarEspaciosEnBlanco(cadena: string)
  {
    return cadena.replace(/\s{2,}/g, ' ').trim();
  }

}
