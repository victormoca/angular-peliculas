import { Component } from '@angular/core';
import { FormularioCineComponent } from "../formulario-cine/formulario-cine.component";
import { CineCto, CineInfo } from '../cineInfo';

@Component({
  selector: 'app-crear-cine',
  imports: [FormularioCineComponent],
  templateUrl: './crear-cine.component.html',
  styleUrl: './crear-cine.component.css'
})
export class CrearCineComponent {
  
  cineModel: CineCto = {
    nombre: '',
    latitud: 0,
    longitud: 0
  };

  guardar(cineInfo: CineInfo) {
    console.log('Guardando...');
    console.log(cineInfo);
  }
}
