import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SERVICIO_CRUD_TOKEN } from '../comun/proveedores/proveedores';
import { CinesService } from './cines.service';
import { IndiceEntidadComponent } from "../comun/componentes/indice-entidad/indice-entidad.component";

@Component({
  selector: 'app-cines',
  imports: [MatButtonModule, IndiceEntidadComponent],
  templateUrl: './cines.component.html',
  styleUrl: './cines.component.css',
  providers: [{provide: SERVICIO_CRUD_TOKEN, useClass: CinesService}]
})
export class CinesComponent {
}
