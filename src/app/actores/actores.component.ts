import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actores',
  imports: [MatButtonModule],
  templateUrl: './actores.component.html',
  styleUrl: './actores.component.css'
})
export class ActoresComponent {

  routerLink  = inject(Router);

  crearActor() {
    this.routerLink.navigate(['/actores/crear']);
  }

}
