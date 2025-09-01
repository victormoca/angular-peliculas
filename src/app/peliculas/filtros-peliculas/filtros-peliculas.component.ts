import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ListadoPeliculasComponent } from "../listado-peliculas/listado-peliculas.component";
import { FiltroPeliculas } from './dataFilter';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GeneroInfo } from '../../generos/generoInfo';
import { PeliculaDTO } from '../pelicula';
import { GenerosService } from '../../generos/generos.service';
import { PeliculasService } from '../peliculas.service';
import { PaginacionDto } from '../../comun/modelos/paginacionDto';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-filtros-peliculas',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ListadoPeliculasComponent,
    MatPaginatorModule
],
  templateUrl: './filtros-peliculas.component.html',
  styleUrl: './filtros-peliculas.component.css'
})
export class FiltrosPeliculasComponent implements OnInit {
  generosService = inject(GenerosService);
  peliculaService = inject(PeliculasService);

  ngOnInit(): void {
    this.generosService.obtenerTodos().subscribe( generos => {
      this.generos = generos;

      this.readUrlParams();
      this.buscar(this.filterForm.value as FiltroPeliculas);

      this.filterForm.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        let paramsFilter = value as FiltroPeliculas;
        this.buscar(paramsFilter);
        this.updateUrl(value as FiltroPeliculas);
      })
    });
  }

  formBuilder = inject(FormBuilder);
  location = inject(Location);
  activatedRoute = inject(ActivatedRoute)
  
  private readonly valoresIniciales = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false
  }
  filterForm = this.formBuilder.group(this.valoresIniciales);
  
  generos: GeneroInfo[] = [];
  peliculas: PeliculaDTO[] = []
  paginacionDto: PaginacionDto = {numeroPagina:1, registrosPorPagina:10};
  cantidadTotalRegistros!: number;

  readUrlParams() {
   this.activatedRoute.queryParams.subscribe(params => {
    
    // Transform URL parameters into a valid object for filterForm
    const formValues = {
      titulo: params['titulo'] || '',
      generoId: Number(params['generoId']) || 0,
      proximosEstrenos: params['proximosEstrenos'] === 'true',
      enCines: params['enCines'] === 'true'
    };
    // Update form with URL parameters
    this.filterForm.patchValue(formValues);
   }) 
  }

  buscar(params: FiltroPeliculas) {
    params.pagina = this.paginacionDto.numeroPagina;
    params.recordsPorPagina = this.paginacionDto.registrosPorPagina;
    this.peliculaService.filtrar(params).subscribe(respuesta => {
      this.peliculas = respuesta.body as PeliculaDTO[];
      const cabecera = respuesta.headers.get('cantidad-tota-registros') as string;
      this.cantidadTotalRegistros = parseInt(cabecera, 10);
    })
  }

  cleanForm() {
    this.filterForm.reset(this.valoresIniciales);
    this.buscar(this.filterForm.value as FiltroPeliculas);
  }

  updateUrl(params: FiltroPeliculas) {
    let newParams: any = [];

    if(params.titulo) {
      newParams.push('titulo=' + params.titulo);
    }

    if(params.generoId) {
      newParams.push('generoId=' + params.generoId);
    }

    if(params.proximosEstrenos) {
      newParams.push('proximosEstrenos=' + params.proximosEstrenos);
    }

    if(params.enCines) {
      newParams.push('enCines=' + params.enCines);
    }

    if(newParams.length > 0) {
      this.location.replaceState('peliculas/filtros?'+ newParams.join('&')); 
    } else {
      this.location.replaceState('');
    }
    
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginacionDto = {numeroPagina: datos.pageIndex +1, registrosPorPagina: datos.pageSize};
    this.buscar(this.filterForm.value as FiltroPeliculas);
  }

}
