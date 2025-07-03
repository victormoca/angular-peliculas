import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { convertToBase64 } from '../../funciones/toBase64';

@Component({
  selector: 'app-input-img',
  imports: [MatButtonModule],
  templateUrl: './input-img.component.html',
  styleUrl: './input-img.component.css'
})
export class InputImgComponent {

  @Input({required: true})
  title: string = '';

  @Output()
  archivoSeleccionado = new EventEmitter<File>();

  @Input()
  srcImageInital?: string | null;

  base64?: string = '';
  
  processImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if(file) {
      convertToBase64(file).then((result: string) => {
        this.base64 = result;
        this.archivoSeleccionado.emit(file);
      }).catch((error) => {
        console.log(error);
      });
    }
    
    
  }

}
