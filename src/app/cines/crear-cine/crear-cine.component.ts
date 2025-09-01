import { Component } from '@angular/core';
import { CrearEntidadComponent } from "../../comun/componenetes/crear-entidad/crear-entidad.component";
import { SERVICIO_CRUD_TOKEN } from '../../comun/proveedores/proveedores';
import { CinesService } from '../cines.service';
import { FormularioCineComponent } from '../formulario-cine/formulario-cine.component';

@Component({
  selector: 'app-crear-cine',
  imports: [CrearEntidadComponent],
  templateUrl: './crear-cine.component.html',
  styleUrl: './crear-cine.component.css',
  providers: [{provide: SERVICIO_CRUD_TOKEN, useClass: CinesService}]
})
export class CrearCineComponent {
  
  formularioCine = FormularioCineComponent;
}
