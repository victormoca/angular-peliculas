import { Component, inject } from '@angular/core';
import { FormularioAutenticacionComponent } from "../formulario-autenticacion/formulario-autenticacion.component";
import { CredencialesUsuariosDto } from '../seguridad';
import { SeguridadService } from '../seguridad.service';
import { Router } from '@angular/router';
import { extraerErroresIdentity } from '../../comun/funciones/errorToArrayMessage';
import { MocaErrorComponent } from "../../comun/componentes/moca-error/moca-error.component";

@Component({
  selector: 'app-registro',
  imports: [FormularioAutenticacionComponent, MocaErrorComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  router = inject(Router);
  servicioSeguridad = inject(SeguridadService);
  errores?: string[];

  registrar(credenciales: CredencialesUsuariosDto) {
    this.servicioSeguridad.registrar(credenciales).subscribe({
      next:() => {
        this.router.navigate(['/']);
      },
      error: (e) => {
        this.errores = extraerErroresIdentity(e);
      }
    })
    
  }
}
