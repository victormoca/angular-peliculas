import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { routes } from './app/app.routes';   

bootstrapApplication(AppComponent, {
  ...appConfig,              
  providers: [
    ...(appConfig.providers ?? []),
    // habilitamos el enlace global de parámetros → @Input()
    provideRouter(routes, withComponentInputBinding())
  ]
}).catch(err => console.error(err));
