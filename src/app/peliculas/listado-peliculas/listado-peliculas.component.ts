import { Component, Input, OnInit } from '@angular/core';

import { ListadoGenericoComponent } from "../../comun/componentes/listado-generico/listado-generico.component";

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listado-peliculas',
  imports:  [
              ListadoGenericoComponent, 
              MatButtonModule
            ],
  templateUrl: './listado-peliculas.component.html',
  styleUrl: './listado-peliculas.component.css'
})
export class ListadoPeliculasComponent implements OnInit {
  @Input({required: true})
  peliculas! : any[];
  
  ngOnInit(): void {
    
  }
  
}
