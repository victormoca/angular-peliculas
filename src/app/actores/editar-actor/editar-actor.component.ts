import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { ActorInfo, ActorInfoDto } from '../actor';
import { FormularioActoresComponent } from "../formulario-actores/formulario-actores.component";

@Component({
  selector: 'app-editar-actor',
  imports: [FormularioActoresComponent],
  templateUrl: './editar-actor.component.html',
  styleUrl: './editar-actor.component.css'
})
export class EditarActorComponent implements OnInit {
  actorInfo!: ActorInfo;

  ngOnInit(): void {
    this.actorInfo = {
      id: this.id,
      nombre: 'Actor Test',
      fechaNacimiento: new Date(),
      foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Nicolas_Cage_Deauville_2013.jpg/220px-Nicolas_Cage_Deauville_2013.jpg',
    };
  }

  @Input({transform: numberAttribute})
  id!: number;

  guardarActor(actorInfo: ActorInfoDto) {
    if(!actorInfo) {
      return;
    }
    console.log('Editando actor...');
    console.log(actorInfo);
  }

}
