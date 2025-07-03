import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { FormularioPeliculaComponent } from "../formulario-pelicula/formulario-pelicula.component";
import { PeliculaDTO } from '../pelicula';
import { Item } from '../../comun/componentes/selector-multiple/Item';
import { ActorSelected } from '../../comun/componentes/autocomplete-actores/ActorSelected';

@Component({
  selector: 'app-editar-pelicula',
  imports: [FormularioPeliculaComponent],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.css'
})
export class EditarPeliculaComponent implements OnInit  {
  ngOnInit(): void {
    this.model = {
      id: this.id,
      titulo: 'Tierra de osos',
      trailer: 'http://www.youtube.com/23455',
      fechaLanzamiento: new Date(),
      poster: 'https://upload.wikimedia.org/wikipedia/en/d/dd/Brotherbear2.jpg',
    }
  }

  @Input  ({transform: numberAttribute})
  id!: number;

  itemsSelected: Item[] = [
    {label: 'Terror',value: 1},
  ];
  cinesSelected: Item[] = [
    {label: 'Cine 1',value: 1},
    {label: 'Cine 2',value: 2},
  ];
  itemsUnSelected: Item[] = [
    {label: 'Acción',value: 2},
    {label: 'Comedia',value: 3},
    {label: 'Drama',value: 4},
  ];
  cinesUnSelected: Item[] = [
    {label: 'Cine 3',value: 3},
    {label: 'Cine 4',value: 4},
  ];
  actoresSelected: ActorSelected[] = [
    {
      id: 2,
      nombre: 'Jennier Lawrance',
      personaje: '',
      foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Jennifer_Lawrence_in_2016.jpg/330px-Jennifer_Lawrence_in_2016.jpg',
    }
  ];

  model?: PeliculaDTO;

  guardar(pelicula: PeliculaDTO) {
    console.log('guardado');
    console.log(pelicula);
  }

}
