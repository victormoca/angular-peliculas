import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterModule } from '@angular/router';
import { AutorizadoComponent } from "../seguridad/autorizado/autorizado.component";
import { SeguridadService } from '../seguridad/seguridad.service';

@Component({
  selector: 'app-main-menu',
  
  imports: [RouterLink, MatToolbarModule, MatIconModule, RouterModule, MatButtonModule, AutorizadoComponent],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {
  seguridadService = inject(SeguridadService);

  public constructor() {

  }

  logout() {
    this.seguridadService.logOut();
  }
}
