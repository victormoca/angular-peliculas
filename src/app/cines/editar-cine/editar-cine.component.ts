import { Component, Input, numberAttribute } from '@angular/core';
import { FormularioCineComponent } from "../formulario-cine/formulario-cine.component";
import { SERVICIO_CRUD_TOKEN } from '../../comun/proveedores/proveedores';
import { CinesService } from '../cines.service';
import { EditarEntidadComponent } from "../../comun/componentes/editar-entidad/editar-entidad.component";

@Component({
  selector: 'app-editar-cine',
  imports: [EditarEntidadComponent],
  templateUrl: './editar-cine.component.html',
  styleUrl: './editar-cine.component.css',
  providers: [{provide: SERVICIO_CRUD_TOKEN, useClass: CinesService}]
})
export class EditarCineComponent {
  @Input({transform: numberAttribute})
  id!: number;

  formularioCine = FormularioCineComponent;

}
