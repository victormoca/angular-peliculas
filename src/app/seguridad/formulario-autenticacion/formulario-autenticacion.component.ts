import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { CredencialesUsuariosDto } from '../seguridad';
import { MocaErrorComponent } from "../../comun/componentes/moca-error/moca-error.component";

@Component({
  selector: 'app-formulario-autenticacion',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterLink
],
  templateUrl: './formulario-autenticacion.component.html',
  styleUrl: './formulario-autenticacion.component.css'
})

export class FormularioAutenticacionComponent {

  credecialesInfo?: CredencialesUsuariosDto;
  errores?: string[];
  formBuilder = inject(FormBuilder);
  @Output()
  posteoFormulario = new EventEmitter<CredencialesUsuariosDto>();

  form = this.formBuilder.group({
    email: ['', {validators: [Validators.required, Validators.email]}],
    password: ['', {validators: [Validators.required]}]
  });

  login() {
    let credencialesForm = this.form.value as CredencialesUsuariosDto;
    this.posteoFormulario.emit(credencialesForm);
  }

  errorPassword(){
    let contraseña = this.form.controls.password;

    if(contraseña.hasError('required')) {
      return 'La contraseña es requerida'
    }

    return '';
  }

  errorEmail(){
    let correo = this.form.controls.email;
    let mensaje;

    if(correo.hasError('required')) {
      mensaje = 'El correo es requerido';
    }

    if(correo.hasError('email')) {
      mensaje = 'El correo no es valido';
    }

    return mensaje;
  }

}
