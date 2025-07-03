import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';
import { ListadoGenericoComponent } from "../../comun/componentes/listado-generico/listado-generico.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

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
