import { Component, Inject, inject } from '@angular/core';
import { FormularioAutenticacionComponent } from "../formulario-autenticacion/formulario-autenticacion.component";
import { MocaErrorComponent } from "../../comun/componentes/moca-error/moca-error.component";
import { SeguridadService } from '../seguridad.service';
import { CredencialesUsuariosDto } from '../seguridad';
import { Router } from '@angular/router';
import { errorToArrayMessage } from '../../comun/funciones/errorToArrayMessage';

@Component({
  selector: 'app-login',
  imports: [FormularioAutenticacionComponent, MocaErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errores? : string[];
  seguridadService = inject(SeguridadService);
  router = inject(Router);

  guardar(credenciales: CredencialesUsuariosDto){
    this.seguridadService.login(credenciales).subscribe({
      next: (a) => {
        console.log(a);
        this.router.navigate(['/']);
      },
      error: (e) => {
        console.log(e);
        //this.errores = errorToArrayMessage(e);
      }
    })
  }
}
