import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { FormularioGenerosComponent } from "../formulario-generos/formulario-generos.component";
import { GenerosService } from '../generos.service';
import { SERVICIO_CRUD_TOKEN } from '../../comun/proveedores/proveedores';
import { EditarEntidadComponent } from "../../comun/componentes/editar-entidad/editar-entidad.component";

@Component({
  selector: 'app-editar-genero',
  imports: [EditarEntidadComponent],
  templateUrl: './editar-genero.component.html',
  styleUrl: './editar-genero.component.css',
  providers: [{provide: SERVICIO_CRUD_TOKEN, useClass: GenerosService}]
})

export class EditarGeneroComponent {

  @Input({transform: numberAttribute})
  id!: number;

  formularioGenero? = FormularioGenerosComponent;

}
