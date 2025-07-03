import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cines',
  imports: [MatButtonModule],
  templateUrl: './cines.component.html',
  styleUrl: './cines.component.css'
})
export class CinesComponent {
  routerLink = inject(Router);

  crearCine() {
    this.routerLink.navigate(['/cines/crear']);
  }

}
