import { Component, ViewChild, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AutorizadoComponent } from "../seguridad/autorizado/autorizado.component";
import { SeguridadService } from '../seguridad/seguridad.service';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService, THEMES } from '../theme.service';

@Component({
  selector: 'app-main-menu',
  imports: [
    RouterLink,
    NgFor,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatTooltipModule,
    AutorizadoComponent
  ],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {
  seguridadService = inject(SeguridadService);
  themeService = inject(ThemeService);
  private breakpointObserver = inject(BreakpointObserver);

  @ViewChild('drawer') drawer?: MatSidenav;

  isHandset = false;
  drawerOpened = true;
  themes = THEMES;

  public constructor() {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(takeUntilDestroyed())
      .subscribe(result => {
        this.isHandset = result.matches;
        // Por defecto, en móvil cerramos; en desktop abrimos fijo
        this.drawerOpened = !this.isHandset;
      });
  }

  logout() {
    this.seguridadService.logOut();
  }
}
