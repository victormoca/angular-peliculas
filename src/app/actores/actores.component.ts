import { Component } from '@angular/core';
import { SERVICIO_CRUD_TOKEN } from '../comun/proveedores/proveedores';
import { ActoresService } from '../actores.service';
import { IndiceEntidadComponent } from "../comun/componentes/indice-entidad/indice-entidad.component";

@Component({
  selector: 'app-actores',
  imports: [IndiceEntidadComponent],
  templateUrl: './actores.component.html',
  styleUrl: './actores.component.css',
  providers: [{provide: SERVICIO_CRUD_TOKEN, useClass: ActoresService}]
})
export class ActoresComponent {

}
