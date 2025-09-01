import { Component, inject, OnInit } from '@angular/core';
import { IndiceEntidadComponent } from "../comun/componentes/indice-entidad/indice-entidad.component";
import { SERVICIO_CRUD_TOKEN } from '../comun/proveedores/proveedores';
import { GenerosService } from './generos.service';

@Component({
  selector: 'app-generos',
  imports: [
    IndiceEntidadComponent
],
  templateUrl: './generos.component.html',
  styleUrl: './generos.component.css',
  providers: [{provide: SERVICIO_CRUD_TOKEN, useClass:GenerosService}]
})
export class GenerosComponent {

}
