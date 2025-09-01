import { Component, inject, Input } from '@angular/core';
import { ɵEmptyOutletComponent } from "@angular/router";
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-autorizado',
  imports: [],
  templateUrl: './autorizado.component.html',
  styleUrl: './autorizado.component.css'
})
export class AutorizadoComponent {
  seguridadService = inject(SeguridadService);

  @Input()
  role?: string;

  public constructor(){

  }

  public estaAutorizado(): boolean {
    let estaLogueado = this.seguridadService.estaLogueado();
    if(this.role && estaLogueado) {
      return this.seguridadService.getRole() === this.role;
    } else{
      return estaLogueado;
    }
  }

}
