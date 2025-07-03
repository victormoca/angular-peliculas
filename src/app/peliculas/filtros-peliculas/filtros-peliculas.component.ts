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
    ListadoPeliculasComponent
],
  templateUrl: './filtros-peliculas.component.html',
  styleUrl: './filtros-peliculas.component.css'
})
export class FiltrosPeliculasComponent implements OnInit {
  ngOnInit(): void {
    this.peliculasOriginal = this.peliculas;

    this.filterForm.valueChanges.subscribe(value => {
      let paramsFilter = value as FiltroPeliculas;
      this.buscar(paramsFilter);
      this.updateUrl(value as FiltroPeliculas);
    })

    this.readUrlParams();

  }

  formBuilder = inject(FormBuilder);
  location = inject(Location);
  activatedRoute = inject(ActivatedRoute)
  

  filterForm = this.formBuilder.group({
    titulo: '',
    generoId: 0,
    proximosEntrenos: false,
    enCines: false
  });
  
  generos = [
    {id : 1, nombre: "Drama"},
    {id : 2, nombre: "Acción"},
    {id : 3, nombre: "Comedia"}
  ];

  peliculas = [
    {
      titulo: "Spider-Man",
      fechaLanzamiento: new Date(),
      precio : 345.32,
      portada: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Spider-Man.jpg/450px-Spider-Man.jpg',
      generoId: [1,2,3],
      enCines: true,
      proximosEntrenos: false,
    },
    {
      titulo: "Moana",
      fechaLanzamiento: new Date(),
      precio: 156.3,
      portada: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Moana_Disney_Parks.jpg/480px-Moana_Disney_Parks.jpg',
      generoId: [3],
      enCines: false,
      proximosEntrenos: true,

    },
    {
      titulo: "Tortugas Ninja",
      fechaLanzamiento: new Date(),
      precio: 15236.23,
      portada: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Teenage_Mutant_Ninja_Turtles_%285234965966%29.jpg/480px-Teenage_Mutant_Ninja_Turtles_%285234965966%29.jpg',
      generoId: [2,3],
      enCines: true,
      proximosEntrenos: false,
    },
    {
      titulo: "Terminator",
      fechaLanzamiento: new Date(),
      precio: 56156.56,
      portada: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Spirit_Stallion_of_the_Cimarron_poster.jpg',
      generoId: [1],
      enCines: false,
      proximosEntrenos: true,
    },
  ]
  peliculasOriginal: any[] = [];

  readUrlParams() {
   this.activatedRoute.queryParams.subscribe(params => {
    
    // Transform URL parameters into a valid object for filterForm
    const formValues = {
      titulo: params['titulo'] || '',
      generoId: Number(params['generoId']) || 0,
      proximosEntrenos: params['proximosEntrenos'] === 'true',
      enCines: params['enCines'] === 'true'
    };
    // Update form with URL parameters
    this.filterForm.patchValue(formValues);
   }) 
  }

  buscar(params: FiltroPeliculas) {
    this.peliculas = this.peliculasOriginal;

    if(params.titulo) {
      this.peliculas = this.peliculas.filter(
          p => p.titulo.toLocaleLowerCase().includes(params.titulo!.toLocaleLowerCase())
      )
    }

    if(params.generoId) {
      this.peliculas = this.peliculas.filter(p=> p.generoId.includes(params.generoId));
    }

    if(params.proximosEntrenos) {
      this.peliculas = this.peliculas.filter(p=> p.proximosEntrenos);
    }

    if(params.enCines) {
      this.peliculas = this.peliculas.filter(p=> p.enCines);
    }
  }

  cleanForm() {
    this.filterForm.reset();
    this.peliculas = this.peliculasOriginal; 
  }

  updateUrl(params: FiltroPeliculas) {
    let newParams: any = [];

    if(params.titulo) {
      newParams.push('titulo=' + params.titulo);
    }

    if(params.generoId) {
      newParams.push('generoId=' + params.generoId);
    }

    if(params.proximosEntrenos) {
      newParams.push('proximosEntrenos=' + params.proximosEntrenos);
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

}
