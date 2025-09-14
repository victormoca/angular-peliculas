import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { convertToBase64 } from '../../funciones/toBase64';
import { UrlResolverService } from '../../servicios/url-resolver.service';

@Component({
  selector: 'app-input-img',
  imports: [MatButtonModule],
  templateUrl: './input-img.component.html',
  styleUrl: './input-img.component.css'
})
export class InputImgComponent implements OnChanges {
  @Input({ required: true }) title: string = '';
  @Output() archivoSeleccionado = new EventEmitter<File>();
  @Input() srcImageInital?: string | null;

  base64?: string;
  imagenUrl = '';

  constructor(private urlResolver: UrlResolverService) {}

  ngOnChanges(_: SimpleChanges): void {
    // Si hay preview (archivo recién elegido), úsala
    if (this.base64) {
      this.imagenUrl = this.base64;
      return;
    }

    // Si viene valor desde la API, resolverlo
    if (this.srcImageInital) {
      this.imagenUrl = this.urlResolver.resolve(this.srcImageInital);
    } else {
      // Si no hay nada, recién ahí usa fallback
      this.imagenUrl = this.urlResolver.getFallback();
    }
  }

  processImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      convertToBase64(file)
        .then((result: string) => {
          this.base64 = result;           // preview inmediata
          this.imagenUrl = result;        // se muestra
          this.archivoSeleccionado.emit(file);
        })
        .catch(console.error);
    }
  }

  onImgError(ev: Event) {
    const img = ev.target as HTMLImageElement;
    if (img.getAttribute('data-fallback-applied') === '1') return;
    img.setAttribute('data-fallback-applied', '1');
    img.src = this.urlResolver.getFallback();
  }
}
