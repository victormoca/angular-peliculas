import { CanActivateFn, Router } from '@angular/router';
import { SeguridadService } from '../../seguridad/seguridad.service';
import { inject } from '@angular/core';
export const esAdminGuard: CanActivateFn = (route, state) => {
  const seguridadService = inject(SeguridadService);
  const router = inject(Router);
  let estaLogueado = seguridadService.estaLogueado();

  if(estaLogueado && seguridadService.getRole() === 'admin') {
    return true;
  } 
  
  router.navigate(['/login']);    

  
  return false;
};
