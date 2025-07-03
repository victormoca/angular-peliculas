import { Component } from '@angular/core';
import { FormularioActoresComponent } from "../formulario-actores/formulario-actores.component";
import { ActorInfo, ActorInfoDto } from '../actor';

@Component({
  selector: 'app-crear-actores',
  imports: [FormularioActoresComponent],
  templateUrl: './crear-actores.component.html',
  styleUrl: './crear-actores.component.css'
})
export class CrearActoresComponent {

  actorInfo: ActorInfo = {
    id: 0,
    nombre: '',
    fechaNacimiento: new Date(),
    foto: null,
  };

  guardarActor(actorPosted: ActorInfoDto) {

    if(!actorPosted) {
      return;
    }
    console.log(actorPosted);
  }
}
