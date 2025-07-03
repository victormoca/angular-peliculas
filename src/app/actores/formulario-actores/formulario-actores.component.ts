import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { ActorInfo, ActorInfoDto } from '../actor';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { ValidarFechaFutura, ValidarLetraCapital } from '../../comun/funciones/validaciones';
import { InputImgComponent } from "../../comun/componentes/input-img/input-img.component";

@Component({
  selector: 'app-formulario-actores',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule,
    MatDatepickerModule,
    InputImgComponent
],
  templateUrl: './formulario-actores.component.html',
  styleUrl: './formulario-actores.component.css'
})
export class FormularioActoresComponent implements OnInit {
  ngOnInit(): void {
    this.form.patchValue(this.actorModel);
  }
  
  private formBuilder = inject(FormBuilder);

  @Output()
  actorPosted = new EventEmitter<ActorInfoDto>(); 

  @Input()
  actorModel!: ActorInfo;

  form = this.formBuilder.group({
    nombre: ['', {validators: [Validators.required, ValidarLetraCapital()]} ],
    fechaNacimiento: [new FormControl<Date | null>(null), {validators: [Validators.required, ValidarFechaFutura()]}],
    foto: new FormControl<File | string | null>(null)
  });

  getEmptyFieldError(): string {
    let inputNombre = this.form.controls.nombre;
    if(inputNombre.hasError('required')) {
      return 'El campo nombre no puede estar vacio'
    }
    if(inputNombre.hasError('validarLetraCapital')) {
      return inputNombre.getError('validarLetraCapital').mensaje;
    }

    return '';
  }

  getInvalidDateFuture() {
    let inputFecha = this.form.controls.fechaNacimiento;

    if(inputFecha.hasError('validarFechaFutura')){
      return inputFecha.getError('validarFechaFutura').mensaje;
    }

    if(inputFecha.hasError('required')) {
      return 'Selecciona una fecha de nacimiento';
    }
  }

  guardarCambios() {
    if(this.form.invalid){
      return;
    }
    const currentActor = this.form.value as ActorInfoDto;
    currentActor.fechaNacimiento = moment(currentActor.fechaNacimiento).toDate();
    
    if(typeof currentActor.foto === 'string') {
      currentActor.foto = undefined;
    }

    this.actorPosted.emit(currentActor);
  }

  archivoSeleccionado(file: File) {
    this.form.patchValue({
      foto: file
    });
  }
  
}
