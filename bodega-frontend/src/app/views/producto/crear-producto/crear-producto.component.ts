import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { Tipoproducto } from 'src/app/models/tipoproducto';
import { ProductoService } from 'src/app/service/producto.service';
import { TipoproductoService } from 'src/app/service/tipoproducto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  producto : Producto= new Producto();

  estadoProducto= [
    { name: "ACTIVO", code: "true" },
    { name: "INACTIVO", code: "false" }
  ];

  listaTiposProducto: Observable<Tipoproducto[]>;

  constructor(private productoServicio:ProductoService, private tipoproductoServicio:TipoproductoService, private router:Router) { }

  ngOnInit(): void
  {
    this.producto.estado='true';
    this.obtenerUnidadOp();
  }


  private obtenerUnidadOp()
  {
    this.listaTiposProducto=this.tipoproductoServicio.obtenerListaTipoproductos();
  }

  onSubmit()
  {
      this.guardarProducto();
  }

  guardarProducto()
  {

    this.productoServicio.registrarProducto(this.producto).subscribe({
      next: (v) =>
      {
        this.irListaProductos();
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  irListaProductos()
  {
    this.router.navigate(['/productos']);
  }

  eliminarEspaciosEnBlanco(cadena: string)
  {
    return cadena.replace(/\s{2,}/g, ' ').trim();
  }

}
