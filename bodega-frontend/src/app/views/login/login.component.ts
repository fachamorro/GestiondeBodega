import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { AutenticacionService } from 'src/app/service/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario : Usuario= new Usuario();


  constructor(private autenticacionServicio: AutenticacionService, private router:Router) { }

  ngOnInit(): void
  {
  }

  onSubmit()
  {
      this.autenticacionServicio.login(this.usuario.username, this.usuario.password).pipe(first())
      .subscribe({
        next: (v) => {
          console.log(JSON.stringify(v));
          this.irMenuPrincipal();
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
  }


  irMenuPrincipal()
  {
    this.router.navigate(['/home']);
  }

  eliminarEspaciosEnBlanco(cadena: string)
  {
    return cadena.replace(/\s{2,}/g, ' ').trim();
  }


}
