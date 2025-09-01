import { Component, inject } from '@angular/core';
import { FormularioActoresComponent } from "../formulario-actores/formulario-actores.component";
import { ActorInfo, ActorInfoDto } from '../actor';
import { ActoresService } from '../../actores.service';
import { Router } from '@angular/router';
import { errorToArrayMessage } from '../../comun/funciones/errorToArrayMessage';
import { MocaErrorComponent } from "../../comun/componentes/moca-error/moca-error.component";
import { CrearEntidadComponent } from "../../comun/componenetes/crear-entidad/crear-entidad.component";
import { SERVICIO_CRUD_TOKEN } from '../../comun/proveedores/proveedores';

@Component({
  selector: 'app-crear-actores',
  imports: [CrearEntidadComponent],
  templateUrl: './crear-actores.component.html',
  styleUrl: './crear-actores.component.css',
  providers: [{provide: SERVICIO_CRUD_TOKEN, useClass: ActoresService}]
})
export class CrearActoresComponent {
  formularioActores = FormularioActoresComponent;
}
