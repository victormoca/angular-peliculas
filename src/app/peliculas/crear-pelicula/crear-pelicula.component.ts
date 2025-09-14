import { Component, inject } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';
import { FormularioPeliculaComponent } from "../formulario-pelicula/formulario-pelicula.component";
import { Item } from '../../comun/componentes/selector-multiple/Item';
import { ActorSelected } from '../../comun/componentes/autocomplete-actores/ActorSelected';
import { PeliculasService } from '../peliculas.service';
import { Router } from '@angular/router';
import { errorToArrayMessage } from '../../comun/funciones/errorToArrayMessage';
import { MocaErrorComponent } from "../../comun/componentes/moca-error/moca-error.component";
import { CargandoComponent } from "../../comun/componentes/cargando/cargando.component";

@Component({
  selector: 'app-crear-pelicula',
  imports: [FormularioPeliculaComponent, MocaErrorComponent, CargandoComponent],
  templateUrl: './crear-pelicula.component.html',
  styleUrl: './crear-pelicula.component.css'
})
export class CrearPeliculaComponent {

  model: PeliculaDTO = {
    titulo: '',
    trailer: '',
    fechaLanzamiento: new Date(), 
    poster: null,
    votoUsuario: 0,
    promedioVoto: 0
  }

  generosSelected: Item[] = [];
  cinesSelected: Item[] = [];
  generosUnSelected: Item[] = []
  cinesUnSelected: Item[] = []
  actoresSelected: ActorSelected[] = [];
  peliculaService = inject(PeliculasService);
  router = inject(Router);
  errores: string[] = [];

  constructor() {
    this.peliculaService.createGet().subscribe(modelo => {
      this.generosUnSelected = modelo.generos.map(
        genero => {
          return <Item>{value: genero.id, label: genero.nombre};
        }
      )

      this.cinesUnSelected = modelo.cines.map(cine => {
        return <Item>{value: cine.id, label: cine.nombre}
      })
    })
  }

  guardar(pelicula: PeliculaCreacionDTO) {
    this.peliculaService.crear(pelicula).subscribe({
      next: pelicula => {
        this.router.navigate(['/']);
      },
      error: e => {
        const errores = errorToArrayMessage(e);
        this.errores = errores;
      }
    })
  }

}
