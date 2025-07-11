import { Component, inject } from '@angular/core';
import {ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormularioGenerosComponent } from "../formulario-generos/formulario-generos.component";
import { GenerosService } from '../generos.service';
import { Router } from '@angular/router';
import { GeneroInfo, GeneroInfoDto } from '../generoInfo';

@Component({
  selector: 'app-crear-genero',
  imports: [
            ReactiveFormsModule, 
            MatButtonModule, 
            MatFormFieldModule, 
            MatInputModule, 
            FormularioGenerosComponent],
  templateUrl: './crear-genero.component.html',
  styleUrl: './crear-genero.component.css'
})

export class CrearGeneroComponent {

  generoInfo!: GeneroInfoDto;
  router = inject(Router); 
  generosService = inject(GenerosService);

  guardarGenero(generoInfo: GeneroInfoDto) {
    this.generosService.crear(generoInfo).subscribe(() => {
      this.router.navigate(['/generos']);
    });
  }

}
