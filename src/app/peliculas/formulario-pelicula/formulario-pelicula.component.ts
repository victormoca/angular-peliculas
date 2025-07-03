import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PeliculaDTO } from '../pelicula';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { InputImgComponent } from "../../comun/componentes/input-img/input-img.component";
import { SelectorMultipleComponent } from "../../comun/componentes/selector-multiple/selector-multiple.component";
import { Item } from '../../comun/componentes/selector-multiple/Item';
import { AutocompleteActoresComponent } from "../../comun/componentes/autocomplete-actores/autocomplete-actores.component";
import { ActorSelected } from '../../comun/componentes/autocomplete-actores/ActorSelected';

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
    InputImgComponent,
    SelectorMultipleComponent,
    AutocompleteActoresComponent
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
  itemsSelected: Item[] = [];

  @Input({required: true})
  itemsUnSelected: Item[] = [];

  @Input()
  cinesSelected: Item[] = [];

  @Input()
  cinesUnSelected: Item[] = [];

  @Output()
  formPosted = new EventEmitter<PeliculaDTO>();

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
    console.log('guardando...');
    let posted = this.form.value as PeliculaDTO;
    posted.fechaLanzamiento = new Date(this.form.controls.fechaLanzamiento.value ?? '');
    posted.generosIds = this.itemsSelected.map(item => item.value);    
    posted.cinesIds = this.cinesSelected.map(item => item.value);
    posted.actoresSelected = this.actoresSelected;
    this.formPosted.emit(posted);
  }

  archivoSeleccionado(file: File) {
    this.form.controls.poster.setValue(file);
  }

}
