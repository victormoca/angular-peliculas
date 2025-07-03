import { Component, Input, numberAttribute } from '@angular/core';
import { FormularioGenerosComponent } from "../formulario-generos/formulario-generos.component";
import { GeneroInfo, GeneroInfoDto } from '../generoInfo';

@Component({
  selector: 'app-editar-genero',
  imports: [FormularioGenerosComponent],
  templateUrl: './editar-genero.component.html',
  styleUrl: './editar-genero.component.css',
})

export class EditarGeneroComponent {

  @Input({transform: numberAttribute})
  id!: number;

  generoInfoLoaded : GeneroInfo = {
    id : this.id,
    nombre : "Nombre Test",
  }

  guardarGenero(generoInfo: GeneroInfoDto) {
    console.log("Editando el genero...");
    console.log(generoInfo);
  }

}
