import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { ValidarLetraCapital } from '../../comun/funciones/validaciones';
import { GeneroInfoDto } from '../generoInfo';

@Component({
  selector: 'app-formulario-generos',
  imports: [ReactiveFormsModule, 
            RouterLink, 
            MatButtonModule, 
            MatFormFieldModule, 
            MatInputModule,
          ],
  templateUrl: './formulario-generos.component.html',
  styleUrl: './formulario-generos.component.css'
})
export class FormularioGenerosComponent implements OnInit {
  ngOnInit(): void {
    this.generoForm.patchValue(this.modelInfoLoaded);
  }

  private formBuilder = inject(FormBuilder);

  @Input()
  modelInfoLoaded! : GeneroInfoDto;

  @Output()
  generoFormPosted = new EventEmitter<GeneroInfoDto>;
  
  generoForm = this.formBuilder.group({
    nombre: ['', {validators: [
      Validators.required,
      ValidarLetraCapital(),
    ]}],
  });

  mensajeErrorNombre() : string {
    let input = this.generoForm.controls.nombre;
    if(input.hasError('required')) {
      return 'El campo no puede estar vacio';
    }

    if(input.hasError('validarLetraCapital')) {
      return input.getError('validarLetraCapital').mensaje;
    }

    return '';
  }

  guardarGenero() {
    const generoInfo = this.generoForm.value as GeneroInfoDto;
    this.generoFormPosted.emit(generoInfo);
  }
}
