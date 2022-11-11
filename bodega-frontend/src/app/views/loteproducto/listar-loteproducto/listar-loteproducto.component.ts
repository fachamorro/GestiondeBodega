import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loteproducto } from 'src/app/models/loteproducto';
import { LoteproductoService } from 'src/app/service/loteproducto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-loteproducto',
  templateUrl: './listar-loteproducto.component.html',
  styleUrls: ['./listar-loteproducto.component.css']
})
export class ListarLoteproductoComponent implements OnInit {

  listaloteProductos:Loteproducto[];

  //paginacion de tabla
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];



  constructor(private loteproductoServicio:LoteproductoService, private router:Router) {
    //this.listaProductos= new
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  private obtenerProductos(){
    this.loteproductoServicio.obtenerListaLoteproductos().subscribe(dato =>{
      this.listaloteProductos=dato;
    });
  }

  /*actualizarProductoId(id:number){
    this.router.navigate(['actualizar-producto',id]);
  }*/




verDetallesLoteProducto(id:number){
  this.router.navigate(['detalles-loteproducto',id]);
}

onTableDataChange(event: any) {
  this.page = event;
  //this.fetchPosts();
}
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  //this.fetchPosts();
}

}
