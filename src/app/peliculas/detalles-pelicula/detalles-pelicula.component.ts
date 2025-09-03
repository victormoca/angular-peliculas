import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { PeliculasService } from '../peliculas.service';
import { PeliculaDTO } from '../pelicula';
import { CargandoComponent } from "../../comun/componentes/cargando/cargando.component";
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Coordenada } from '../../comun/funciones/Coordenada';
import { MapaComponent } from "../../comun/componentes/mapa/mapa.component";
import { RatingService } from '../../rating/rating.service';
import { SeguridadService } from '../../seguridad/seguridad.service';
import Swal from 'sweetalert2';
import { RatingComponent } from "../../comun/componentes/rating/rating.component";


@Component({
  selector: 'app-detalles-pelicula',
  imports: [
    CargandoComponent,
    MatChipsModule,
    RouterLink,
    MapaComponent,
    RatingComponent
],
  templateUrl: './detalles-pelicula.component.html',
  styleUrl: './detalles-pelicula.component.css'
})
export class DetallesPeliculaComponent implements OnInit {  
  
  @Input({transform: numberAttribute})
  id!: number;
  pelicula!: PeliculaDTO;
  peliculaService = inject(PeliculasService);
  sanitizer = inject(DomSanitizer);
  trailerURL!: SafeResourceUrl;
  coordenadas: Coordenada[] = [];
  ratingService = inject(RatingService);
  seguridadService = inject(SeguridadService);

  ngOnInit(): void {
    this.peliculaService.obtenerPorId(this.id).subscribe(pelicula => {
      pelicula.fechaLanzamiento = new Date(pelicula.fechaLanzamiento);
      this.pelicula = pelicula;
      this.trailerURL = this.generarURLYoutbeEmbed(pelicula.trailer);
      
      this.coordenadas = pelicula.cines!.map( cine =>
      {
        return <Coordenada>{lat: cine.latitud, lng: cine.longitud, texto: cine.nombre}
      }
      )
    })
  }

  generarURLYoutbeEmbed(url: string): SafeResourceUrl | string 
  {
    if(!url){
      return '';
    }

    var videoId = url.split('v=')[1];
    var posicionAmpersand = videoId.indexOf('&');
    if(posicionAmpersand !== -1) {
      videoId = videoId.substring(0, posicionAmpersand);
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId);

  }

  puntuar(puntuacion: number){

    if(!this.seguridadService.estaLogueado()) {
      Swal.fire('Error', 'Debes loguearte para poder votar por una pelicula', 'error');    
      return;
    }

    this.ratingService.puntuar(this.id, puntuacion).subscribe(() =>
    {
      Swal.fire('Exitoso', "Su voto ha sido recibido", "success");
    })
  }
  
}
