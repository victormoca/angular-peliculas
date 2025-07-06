import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_DATE_FORMATS } from './app-date-formats';
import { provideHttpClient } from '@angular/common/http';

// 👇 Registrar el idioma español
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs); // ✅ Requerido para es-MX

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),

    provideNativeDateAdapter(), // ✅ Usa el adaptador de fechas nativo

    { provide: LOCALE_ID, useValue: 'es-MX' }, // ✅ Establece idioma español
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS } // ✅ Usa nuestro formato personalizado
  ]
};
