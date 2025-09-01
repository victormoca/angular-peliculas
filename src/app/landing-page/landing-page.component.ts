import { Component, inject, OnInit } from '@angular/core';
import { ListadoPeliculasComponent } from "../peliculas/listado-peliculas/listado-peliculas.component";
import { PeliculasService } from '../peliculas/peliculas.service';

@Component({
  selector: 'app-landing-page',
  imports: [ListadoPeliculasComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {
  peliculasEnCine! : any[];
  peliculasProximosEstrenos! : any[];
  peliculaService = inject(PeliculasService);

  ngOnInit(): void {
    this.cargarPeliculas();
  }

  peliculaBorrada() {
    this.cargarPeliculas();
  }

  cargarPeliculas(){
    this.peliculaService.obtenerLandingPage().subscribe( (res) => {
        this.peliculasEnCine = res.enCines;
        this.peliculasProximosEstrenos = res.proximosEstrenos;
      })
  }

  ratedProcess(rating: number) {
    alert('Calificación otorgada: ' + rating);
  }
}
