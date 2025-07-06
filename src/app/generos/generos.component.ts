import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { GenerosService } from './generos.service';

@Component({
  selector: 'app-generos',
  imports: [MatButtonModule],
  templateUrl: './generos.component.html',
  styleUrl: './generos.component.css'
})
export class GenerosComponent {

  routerLink = inject(Router);
  generosService = inject(GenerosService);

  generos = this.generosService.obtenerTodos().subscribe(generos => {
    console.log(generos);
  }); 

  constructor() {
    console.log(this.generos);
  }

  crearGenero() {
    this.routerLink.navigate(['/generos/crear']);
  }
}
