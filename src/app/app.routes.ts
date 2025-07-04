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
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
export const routes: Routes = [
    {path: '', component: LandingPageComponent},

    {path:'generos', component: GenerosComponent},
    {path:'generos/crear', component: CrearGeneroComponent},
    {path:'generos/editar/:id', component: EditarGeneroComponent},
    
    {path:'cines', component: CinesComponent},
    {path:'cines/crear', component: CrearCineComponent},
    {path:'cines/editar/:id', component: EditarCineComponent},

    {path:'actores', component: ActoresComponent},
    {path:'actores/crear', component: CrearActoresComponent},
    {path:'actores/editar/:id', component: EditarActorComponent},

    {path:'usuarios', component: UsuariosComponent},
    {path:'usuarios/crear', component: CrearUsuarioComponent},
    {path:'usuarios/editar/:id', component: EditarUsuarioComponent},
    
    {path:'peliculas/crear', component: CrearPeliculaComponent},
    {path:'peliculas/editar/:id', component: EditarPeliculaComponent},
    {path:'peliculas/filtros', component: FiltrosPeliculasComponent},

    {path:'**', component: LandingPageComponent},
];
