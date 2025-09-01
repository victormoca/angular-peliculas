import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { FormularioPeliculaComponent } from "../formulario-pelicula/formulario-pelicula.component";
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';
import { Item } from '../../comun/componentes/selector-multiple/Item';
import { ActorSelected } from '../../comun/componentes/autocomplete-actores/ActorSelected';
import { PeliculasService } from '../peliculas.service';
import { Router } from '@angular/router';
import { errorToArrayMessage } from '../../comun/funciones/errorToArrayMessage';
import { CargandoComponent } from "../../comun/componentes/cargando/cargando.component";

@Component({
  selector: 'app-editar-pelicula',
  imports: [FormularioPeliculaComponent, CargandoComponent],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.css'
})
export class EditarPeliculaComponent implements OnInit  {
  ngOnInit(): void {
    this.peliculaService.actualizarGet(this.id).subscribe(modelo => {
      this.model = modelo.pelicula;
      this.actoresSelected = modelo.actores;

      this.cinesSelected = modelo.cinesSeleccionados.map(cine => {
        return <Item>{value: cine.id, label: cine.nombre}
      });
      this.cinesUnSelected = modelo.cinesNoSeleccionados.map(cine => {
        return <Item>{value: cine.id, label: cine.nombre}
      });
      this.generosSelected = modelo.generosSeleccionados.map(genero => {
        return <Item>{label: genero.nombre, value: genero.id}
      });
      this.generosUnSelected = modelo.generosNoSeleccionados.map(genero => {
        return <Item>{label: genero.nombre, value: genero.id}
      });
    })
  }

  @Input  ({transform: numberAttribute})
  id!: number;

  generosSelected: Item[] = [];
  cinesSelected: Item[] = [];
  generosUnSelected: Item[] = [];
  cinesUnSelected: Item[] = [];
  actoresSelected: ActorSelected[] = [];

  model!: PeliculaDTO;
  peliculaService = inject(PeliculasService);
  router = inject(Router);
  errores?: string[];

  guardar(pelicula: PeliculaCreacionDTO) {
    this.peliculaService.actualizar(this.id, pelicula).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: err => {
        const errores = errorToArrayMessage(err);
        this.errores = errores;
      }
    })
  }

}
