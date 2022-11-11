import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente.service';
import { HomeService } from 'src/app/service/home.service';
import { OrdencompraService } from 'src/app/service/ordencompra.service';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  datosStringifiedData: any={};
  datosParsedJson: any={};

  constructor(private homeServicio: HomeService) {
  }

  ngOnInit(): void {
    this.contarRegistros();
  }

  private contarRegistros() {
    this.homeServicio.obtenerRegistrosTablas().subscribe(dato => {
      // Convert to JSON
      this.datosStringifiedData = JSON.stringify(dato);

      // Parse from JSON
      this.datosParsedJson = JSON.parse(this.datosStringifiedData);
    });
  }



}
