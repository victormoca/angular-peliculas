import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GenerosComponent } from './generos/generos.component';
import { CinesComponent } from './cines/cines.component';
import { ActoresComponent } from './actores/actores.component';
import { CrearPeliculaComponent } from './peliculas/crear-pelicula/crear-pelicula.component';
import { CrearCineComponent } from './cines/crear-cine/crear-cine.component';
import { CrearActoresComponent } from './actores/crear-actores/crear-actores.component';
import { CrearGeneroComponent } from './generos/crear-genero/crear-genero.component';
import { EditarGeneroComponent } from './generos/editar-genero/editar-genero.component';
import { EditarCineComponent } from './cines/editar-cine/editar-cine.component';
import { EditarActorComponent } from './actores/editar-actor/editar-actor.component';
import { EditarPeliculaComponent } from './peliculas/editar-pelicula/editar-pelicula.component';
import { FiltrosPeliculasComponent } from './peliculas/filtros-peliculas/filtros-peliculas.component';
import { DetallesPeliculaComponent } from './peliculas/detalles-pelicula/detalles-pelicula.component';
import { LoginComponent } from './seguridad/login/login.component';
import { esAdminGuard } from './comun/guards/es-admin.guard';
import { RegistroComponent } from './seguridad/registro/registro.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path:'login', component: LoginComponent},
    {path:'registro', component: RegistroComponent},

    {path:'generos', component: GenerosComponent, canActivate: [esAdminGuard]},
    {path:'generos/crear', component: CrearGeneroComponent, canActivate: [esAdminGuard]},
    {path:'generos/editar/:id', component: EditarGeneroComponent, canActivate: [esAdminGuard]},
    
    {path:'cines', component: CinesComponent, canActivate: [esAdminGuard]},
    {path:'cines/crear', component: CrearCineComponent, canActivate: [esAdminGuard]},
    {path:'cines/editar/:id', component: EditarCineComponent, canActivate: [esAdminGuard]},

    {path:'actores', component: ActoresComponent, canActivate: [esAdminGuard]},
    {path:'actores/crear', component: CrearActoresComponent, canActivate: [esAdminGuard]},
    {path:'actores/editar/:id', component: EditarActorComponent, canActivate: [esAdminGuard]},

    {path:'peliculas/crear', component: CrearPeliculaComponent, canActivate: [esAdminGuard]},
    {path:'peliculas/editar/:id', component: EditarPeliculaComponent, canActivate: [esAdminGuard]},
    {path:'peliculas/filtros', component: FiltrosPeliculasComponent},
    {path:'pelicula/:id', component: DetallesPeliculaComponent},

    {path:'**', component: LandingPageComponent},
];
