import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterLink } from '@angular/router';
import { UsuarioInfo, UsuarioInfoDto } from '../usuario';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-formulario-usuario',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  templateUrl: './formulario-usuario.component.html',
  styleUrl: './formulario-usuario.component.css'
})
export class FormularioUsuarioComponent implements OnInit {
  ngOnInit(): void {
    this.form.patchValue(this.usuarioModel);
  }

  formBuilder = inject(FormBuilder);

  @Input()
  usuarioModel!: UsuarioInfo;

  @Output()
  usuarioPosted = new EventEmitter<UsuarioInfoDto>();

  form = this.formBuilder.group({
    nombre: ['', {validators: [Validators.required]}],
    apellidos: ['', {validators: [Validators.required]}],
    fechaNacimiento: new FormControl<Date | null>(null, {validators: [Validators.required]}),
    sexo: ['', {validators: [Validators.required]}]
  });

  guardarCambios() {
    if(this.form.invalid) {
      return;
    }
    const usuario = this.form.value as UsuarioInfoDto;
    usuario.fechaNacimiento = new Date(this.form.controls.fechaNacimiento.value ?? '');
    this.usuarioPosted.emit(usuario);
  }

  getNombreError(){
    let campo = this.form.controls.nombre;
    if(campo.hasError('required')){
      return 'El campo nombre es requerido';
    }
    return '';
  }

  getApellidosError(){
    let campo = this.form.controls.apellidos;
    if(campo.hasError('required')){
      return 'El campo apellidos es requerido';
    }
    return '';
  }

  getFechaNacimientoError(){
    let campo = this.form.controls.fechaNacimiento;
    if(campo.hasError('required')){
      return 'Selecciona una fecha';
    }
    return '';
  }

  getSexoError(){
    let campo = this.form.controls.sexo;
    if(campo.hasError('required')){
      return 'Selecciona un sexo';
    }
    return '';
  }
}

