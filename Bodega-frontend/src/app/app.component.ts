import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from './service/autenticacion.service';
import { PublicService } from './service/public.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sistema para la Gestión de Bodega';
  msg:any;
  usuario: string='';
  constructor(private publicServicio:PublicService, private autenticacionServicio: AutenticacionService, private router: Router){

  }
  ngOnInit():void{
    this.showMessage();
    let currentUser = JSON.parse(sessionStorage.getItem('usuarioLogin') || '{}');
    console.log(JSON.stringify(sessionStorage.getItem('usuarioLogin')));
    if (typeof currentUser.username !== 'undefined'){
      this.usuario = 'Bienvenid@ '+currentUser.username;
    }


  }

  showMessage(){
    this.publicServicio.getMessage().subscribe(data=>{
      this.msg=data;
      console.log(this.msg);
    })
  }
  logout(){
    this.autenticacionServicio.logout();
    this.router.navigate(['/login']);
  }
}
