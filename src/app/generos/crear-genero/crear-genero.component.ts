import { Component } from '@angular/core';
import { SERVICIO_CRUD_TOKEN } from '../../comun/proveedores/proveedores';
import { GenerosService } from '../generos.service';
import { CrearEntidadComponent } from "../../comun/componenetes/crear-entidad/crear-entidad.component";
import { FormularioGenerosComponent } from '../formulario-generos/formulario-generos.component';

@Component({
  selector: 'app-crear-genero',
  imports: [CrearEntidadComponent],
  templateUrl: './crear-genero.component.html',
  styleUrl: './crear-genero.component.css',
  providers: [{provide: SERVICIO_CRUD_TOKEN, useClass: GenerosService}]
})

export class CrearGeneroComponent {
  formularioGeneros = FormularioGenerosComponent;
}
