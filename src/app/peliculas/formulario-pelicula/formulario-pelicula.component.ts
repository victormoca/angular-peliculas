import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { InputImgComponent } from "../../comun/componentes/input-img/input-img.component";
import { SelectorMultipleComponent } from "../../comun/componentes/selector-multiple/selector-multiple.component";
import { Item } from '../../comun/componentes/selector-multiple/Item';
import { AutocompleteActoresComponent } from "../../comun/componentes/autocomplete-actores/autocomplete-actores.component";
import { ActorSelected } from '../../comun/componentes/autocomplete-actores/ActorSelected';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-formulario-pelicula',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    InputImgComponent,
    SelectorMultipleComponent,
    AutocompleteActoresComponent,
    RouterLink
],
  templateUrl: './formulario-pelicula.component.html',
  styleUrl: './formulario-pelicula.component.css'
})
export class FormularioPeliculaComponent implements OnInit {
  ngOnInit(): void {
    if(this.model?.id) {
      this.form.patchValue(this.model);
    }
  }

  formBuild = inject(FormBuilder);
  

  @Input()
  model: PeliculaDTO | undefined;

  @Input({required: true})
  generosSelected: Item[] = [];

  @Input({required: true})
  generosUnSelected: Item[] = [];

  @Input()
  cinesSelected: Item[] = [];

  @Input()
  cinesUnSelected: Item[] = [];

  @Output()
  formPosted = new EventEmitter<PeliculaCreacionDTO>();

  @Input({required: true})
  actoresSelected: ActorSelected[] = [];

  form = this.formBuild.group({
    titulo : ['', {validators: [Validators.required]}],
    trailer: '',
    fechaLanzamiento: new FormControl<Date | null>(null),
    poster: new FormControl<File | null | string>(null),
    generosIds: new FormControl<number[]>([])
  })

  errorTitulo(){
    let campo = this.form.controls.titulo;
    if(campo.hasError('required')){
      return 'El campo titulo es requerido'
    }

    return '';
  }

  guardando() {
    if(this.form.invalid) {
      return;
    }

    let posted = this.form.value as PeliculaCreacionDTO;
    posted.fechaLanzamiento = new Date(this.form.controls.fechaLanzamiento.value ?? '');
    posted.generosIds = this.generosSelected.map(item => item.value);    
    posted.cinesIds = this.cinesSelected.map(item => item.value);
    posted.actores = this.actoresSelected;

    if(typeof posted.poster === 'string') {
      posted.poster = undefined;
    }

    this.formPosted.emit(posted);
  }

  archivoSeleccionado(file: File) {
    this.form.controls.poster.setValue(file);
  }

}
