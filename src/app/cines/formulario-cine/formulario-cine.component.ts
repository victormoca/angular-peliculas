import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CineInfo } from '../cineInfo';
import { RouterLink } from '@angular/router';
import { MapaComponent } from "../../comun/componentes/mapa/mapa.component";
import { Coordenada } from '../../comun/funciones/Coordenada';

@Component({
  selector: 'app-formulario-cine',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
    MapaComponent
],
  templateUrl: './formulario-cine.component.html',
  styleUrl: './formulario-cine.component.css'
})
export class FormularioCineComponent implements OnInit {
  // Add this after ngOnInit
  ngOnInit(): void {
    if(this.infoModel) {
      this.cineForm.patchValue(this.infoModel);
      
      // Initialize coordinates for the map
      if (this.infoModel.latitud && this.infoModel.longitud) {
        this.coordenadasIniciales = [{
          lat: this.infoModel.latitud,
          lng: this.infoModel.longitud,
          texto: this.infoModel.nombre,
        }];
      }
    }
  }
  private formBuilder = inject(FormBuilder);

  cineForm = this.formBuilder.group({
    nombre: ['', {validators: [Validators.required]}],
    latitud: [0, {validators: [Validators.required]}],
    longitud: [0, {validators: [Validators.required]}]
  });

  @Input()
  infoModel?: CineInfo;

  @Input()
  // Add this property to your component class
  coordenadasIniciales: Coordenada[] = [];

  @Output()
  posteoFormulario = new EventEmitter<CineInfo>();

  guardarCine() {
    const posted = this.cineForm.value as CineInfo;
    if (!Number.isFinite(posted.latitud) || !Number.isFinite(posted.longitud)) {
      alert("Debes seleccionar una ubicación válida");
      return;
    }
    this.posteoFormulario.emit(posted);
  }


  validateNombre(): string {
    let input = this.cineForm.controls.nombre;
    if(input.hasError('required')) {
      return 'El campo no puede estar vacio';
    }

    return '';
  }

  coordenadasSelecionadas(coordenadas: { lat: number, lng: number }[]) {
    if (coordenadas && coordenadas.length > 0) {
      this.cineForm.patchValue({
        latitud: coordenadas[0].lat,
        longitud: coordenadas[0].lng
      });
    }
  }
}
