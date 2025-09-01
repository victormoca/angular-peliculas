import { CineCto, CineInfo } from "../cines/cineInfo";
import { ActorSelected } from "../comun/componentes/autocomplete-actores/ActorSelected";
import { GeneroInfo, GeneroInfoDto } from "../generos/generoInfo";

export interface PeliculaCreacionDTO {
  titulo: string;
  trailer: string;
  fechaLanzamiento: Date;
  poster?: File | null;
  generosIds?: number[];
  cinesIds?: number[];
  actores?: ActorSelected[];
}

export interface PeliculaDTO{
    id?: number
    titulo: string;
    trailer: string;
    fechaLanzamiento: Date; 
    poster?: string | null;

    generos?: GeneroInfo[];
    cines?: CineInfo[];
    actores?: ActorSelected[];
}

export interface PeliculasPostGetDTO {
  generos : GeneroInfo[];
  cines: CineInfo[];
}

export interface LandingPageDTO {
  enCines: PeliculaDTO[];
  proximosEstrenos: PeliculaDTO[];
}

export interface PeliculasPutGetDto{
  pelicula: PeliculaDTO;
  generosSeleccionados: GeneroInfo[];
  generosNoSeleccionados: GeneroInfo[];
  cinesSeleccionados: CineInfo[];
  cinesNoSeleccionados: CineInfo[];
  actores: ActorSelected[];
}