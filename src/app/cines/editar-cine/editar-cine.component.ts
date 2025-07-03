import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { FormularioCineComponent } from "../formulario-cine/formulario-cine.component";
import { CineInfo } from '../cineInfo';

@Component({
  selector: 'app-editar-cine',
  imports: [FormularioCineComponent],
  templateUrl: './editar-cine.component.html',
  styleUrl: './editar-cine.component.css'
})
export class EditarCineComponent implements OnInit {
  ngOnInit(): void {
    if(this.id) {
      this.cineModel = {
        id: this.id,
        nombre: 'Cine 1',
        latitud: 20.69787270469306,
        longitud: -103.45455925305399,
      }
    }
  }

  @Input({transform: numberAttribute})
  id!: number;

  cineModel?: CineInfo;

  guardar(cineInfo: CineInfo) {
    console.log('Editando...');
    console.log(cineInfo); 
  }

}
