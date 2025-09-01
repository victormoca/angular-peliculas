import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-moca-error',
  imports: [],
  templateUrl: './moca-error.component.html',
  styleUrl: './moca-error.component.css'
})
export class MocaErrorComponent {

  @Input({required:true})
  errors?:any[] = [];


}
