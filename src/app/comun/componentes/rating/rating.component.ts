import { NgClass } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rating',
  imports: [MatIconModule, NgClass],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent implements OnInit {
  @Input({required : true})
  maxrating : number = 0;
  
  @Output()
  rated = new EventEmitter<number>();
  
  @Input()
  ratingSelected : number = 0;
  
  
  ratingArray: number[] = [];
  ratingBefore: number = 0;
  
  ngOnInit(): void {
    this.ratingArray = Array(this.maxrating).fill(0);
    this.ratingBefore = this.ratingSelected;
  }

  triggerMouseEnter(index: number) {
    this.ratingSelected = index + 1;
  }

  triggerMouseLeave() {
    if (this.ratingBefore !== 0) {
      this.ratingSelected = this.ratingBefore;
      return;
    }
    this.ratingSelected = 0;
  }

  triggerClick(index: number) {
    this.ratingSelected = index + 1;
    this.ratingBefore = this.ratingSelected;
    this.rated.emit(this.ratingSelected);
  }
}
