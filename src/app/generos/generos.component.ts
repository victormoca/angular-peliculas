import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generos',
  imports: [MatButtonModule],
  templateUrl: './generos.component.html',
  styleUrl: './generos.component.css'
})
export class GenerosComponent {

  routerLink = inject(Router);

  crearGenero() {
    this.routerLink.navigate(['/generos/crear']);
  }
}
