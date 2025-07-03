import { Component, OnInit } from '@angular/core';
import { ListadoPeliculasComponent } from "../peliculas/listado-peliculas/listado-peliculas.component";

@Component({
  selector: 'app-landing-page',
  imports: [ListadoPeliculasComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {
  peliculasEnCine! : any[];
  peliculasProximosEstrenos! : any[];

  ngOnInit(): void {
    setTimeout(() => {
      this.peliculasEnCine = [
        {
          titulo: "Spider-Man",
          fechaLanzamiento: new Date(),
          precio : 345.32,
          portada: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Spider-Man.jpg/450px-Spider-Man.jpg'
        },
        {
          titulo: "Moana",
          fechaLanzamiento: new Date(),
          precio: 156.3,
          portada: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Moana_Disney_Parks.jpg/480px-Moana_Disney_Parks.jpg'
        },
      ]
      this.peliculasProximosEstrenos = [
        {
          titulo: "Tortugas Ninja",
          fechaLanzamiento: new Date(),
          precio: 15236.23,
          portada: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Teenage_Mutant_Ninja_Turtles_%285234965966%29.jpg/480px-Teenage_Mutant_Ninja_Turtles_%285234965966%29.jpg'
        },
        {
          titulo: "Terminator",
          fechaLanzamiento: new Date(),
          precio: 56156.56,
          portada: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Spirit_Stallion_of_the_Cimarron_poster.jpg'
        },
      ]
    }, 200);
  }

  ratedProcess(rating: number) {
    alert('Calificación otorgada: ' + rating);
  }
}
