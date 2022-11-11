import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tipoproducto } from 'src/app/models/tipoproducto';
import { TipoproductoService } from 'src/app/service/tipoproducto.service';

@Component({
  selector: 'app-crear-tipoproducto',
  templateUrl: './crear-tipoproducto.component.html',
  styleUrls: ['./crear-tipoproducto.component.css']
})
export class CrearTipoproductoComponent implements OnInit {


  tipoproducto : Tipoproducto= new Tipoproducto();

  constructor(private tipoproductoServicio:TipoproductoService, private router:Router) { }

  ngOnInit(): void
  {


  }


  onSubmit()
  {
      this.guardarTipoProducto();
  }

  guardarTipoProducto()
  {

    this.tipoproductoServicio.registrarTipoproducto(this.tipoproducto).subscribe({
      next: (v) =>
      {
        this.irListaTipoProductos();
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  irListaTipoProductos()
  {
    this.router.navigate(['/tipoproducto']);
  }

  eliminarEspaciosEnBlanco(cadena: string)
  {
    return cadena.replace(/\s{2,}/g, ' ').trim();
  }

}
