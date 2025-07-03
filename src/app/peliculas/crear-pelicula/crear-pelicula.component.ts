import { Component } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';
import { FormularioPeliculaComponent } from "../formulario-pelicula/formulario-pelicula.component";
import { Item } from '../../comun/componentes/selector-multiple/Item';
import { ActorSelected } from '../../comun/componentes/autocomplete-actores/ActorSelected';

@Component({
  selector: 'app-crear-pelicula',
  imports: [FormularioPeliculaComponent],
  templateUrl: './crear-pelicula.component.html',
  styleUrl: './crear-pelicula.component.css'
})
export class CrearPeliculaComponent {

  model: PeliculaDTO = {
    titulo: '',
    trailer: '',
    fechaLanzamiento: new Date(), 
    poster: null,
  }

  itemsSelected: Item[] = [];
  cinesSelected: Item[] = [];
  actoresSelected: ActorSelected[] = [];
  itemsUnSelected = [
    {label: 'Terror',value: 1},
    {label: 'Acción',value: 2},
    {label: 'Comedia',value: 3},
    {label: 'Drama',value: 4},
  ]
  cinesUnSelected = [
    {label: 'Cine 1',value: 1},
    {label: 'Cine 2',value: 2},
    {label: 'Cine 3',value: 3},
    {label: 'Cine 4',value: 4},
  ]

  guardar(pelicula: PeliculaDTO) {
    console.log('guardado');
    console.log(pelicula);
  }

}
