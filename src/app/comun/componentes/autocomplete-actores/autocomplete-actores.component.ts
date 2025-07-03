import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActorSelected } from './ActorSelected';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

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
export class AutocompleteActoresComponent {
  
  control = new FormControl();
  actores : ActorSelected[] = [
    {
      id: 1,
      nombre: 'Tom Holland',
      personaje: '', 
      foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Tom_Holland_at_KCA_2022.jpg/330px-Tom_Holland_at_KCA_2022.jpg',
    },
    {
      id: 2,
      nombre: 'Jennier Lawrance',
      personaje: '',
      foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Jennifer_Lawrence_in_2016.jpg/330px-Jennifer_Lawrence_in_2016.jpg',
    },
    { 
      id: 3,
      nombre: 'Bratt Pitt',
      personaje: '',
      foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Brad_Pitt-69858.jpg/330px-Brad_Pitt-69858.jpg',
    }
  ]
  @Input({required: true})
  actoresSelected: ActorSelected[] = [];

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
