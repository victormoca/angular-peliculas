import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActorSelected } from './ActorSelected';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { ActoresService } from '../../../actores.service';
import { PeliculasService } from '../../../peliculas/peliculas.service';

@Component({
  selector: 'app-autocomplete-actores',
  imports: [
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule,
      MatAutocompleteModule,
      MatTableModule,
      FormsModule,
      MatIconModule,
      DragDropModule,
    ],
  templateUrl: './autocomplete-actores.component.html',
  styleUrl: './autocomplete-actores.component.css'
})
export class AutocompleteActoresComponent implements OnInit {
  ngOnInit(): void {
    this.control.valueChanges.subscribe(valor => {
      if(typeof valor === 'string' && valor) {
        this.actoresService.obtenerPorNombre(valor).subscribe(actores => {
          this.actores = actores;
        })
      }
    })
  }
  
  control = new FormControl();
  actores : ActorSelected[] = [];
  @Input({required: true})
  actoresSelected: ActorSelected[] = [];
  actoresService = inject(ActoresService);

  columnsToShow = ['foto', 'nombre', 'personaje','acciones'];
  @ViewChild(MatTable) table!: MatTable<ActorSelected>;

  optionSelected(actor: MatAutocompleteSelectedEvent) {
    this.actoresSelected.push(actor.option.value);
    this.control.patchValue('');
    if(this.table){ this.table.renderRows(); }
    
  }

  eliminarActor(actor: ActorSelected) {
    const index = this.actoresSelected.indexOf(actor);
    if(index > -1) {
      this.actoresSelected.splice(index, 1);
      if(this.table) { this.table.renderRows(); }
    }
  }

  finalizarArrastre(event: CdkDragDrop<any[]>){
    const indicePrevio = this.actoresSelected.findIndex(actor => actor === event.item.data);
    this.actoresSelected.splice(event.currentIndex, 0, this.actoresSelected.splice(indicePrevio, 1)[0]);
    if(this.table) { this.table.renderRows(); }
  }
}
