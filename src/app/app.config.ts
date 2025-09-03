import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_DATE_FORMATS } from './app-date-formats';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// 👇 Registrar el idioma español
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { authInterceptor } from './seguridad/registro/token-interceptor-http';

registerLocaleData(localeEs); // ✅ Requerido para es-MX

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    importProvidersFrom(SweetAlert2Module.forRoot()), // ✅ Se una singleton para el dialog de confirmación

    provideNativeDateAdapter(), // ✅ Usa el adaptador de fechas nativo

    { provide: LOCALE_ID, useValue: 'es-MX' }, // ✅ Establece idioma español
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS } // ✅ Usa nuestro formato personalizado
  ]
};
