import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { ValidarLetraCapital } from '../../comun/funciones/validaciones';
import { GeneroInfoDto } from '../generoInfo';
import { MocaErrorComponent } from "../../comun/componentes/moca-error/moca-error.component";

@Component({
  selector: 'app-formulario-generos',
  imports: [ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule, MocaErrorComponent],
  templateUrl: './formulario-generos.component.html',
  styleUrl: './formulario-generos.component.css'
})
export class FormularioGenerosComponent implements OnInit {
  ngOnInit(): void {
    if(this.infoModel){
      this.generoForm.patchValue(this.infoModel);
    }
  }

  private formBuilder = inject(FormBuilder);

  @Input()
  infoModel? : GeneroInfoDto;

  @Input()
  errors!: string[];

  @Output()
  posteoFormulario = new EventEmitter<GeneroInfoDto>;
  
  generoForm = this.formBuilder.group({
    nombre: ['', {validators: [
      Validators.required,
      ValidarLetraCapital(),
      Validators.maxLength(50)
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

    if(input.hasError('maxlength')) {
      return 'El campo no puede tener mas de '+ input.getError('maxlength').requiredLength +' caracteres';
    }

    return '';
  }

  guardarGenero() {
    const generoInfo = this.generoForm.value as GeneroInfoDto;
    this.posteoFormulario.emit(generoInfo);
  }
}
