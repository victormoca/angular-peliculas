import { Component, Input } from '@angular/core';
import { Item } from './Item';

@Component({
  selector: 'app-selector-multiple',
  imports: [],
  templateUrl: './selector-multiple.component.html',
  styleUrl: './selector-multiple.component.css'
})
export class SelectorMultipleComponent {

  @Input({required: true})
  itemsSelected: Item[] = [];

  @Input({required: true})
  itemsUnSelected: Item[] = [];

  select(item: Item, index: number) {
   this.itemsSelected.push(item);
   this.itemsUnSelected.splice(index, 1);
  }

  unselect(item: Item, index: number) {
    this.itemsUnSelected.push(item);
    this.itemsSelected.splice(index, 1);
  }

  selectAll() {
    this.itemsSelected.push(...this.itemsUnSelected);
    this.itemsUnSelected.length = 0;
  }

  unselectAll() {
    this.itemsUnSelected.push(...this.itemsSelected);
    this.itemsSelected.length = 0;
  }

}
