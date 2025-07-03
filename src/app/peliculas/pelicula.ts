import { ActorSelected } from "../comun/componentes/autocomplete-actores/ActorSelected";

export interface PeliculaCreacionDTO {
  titulo: string;
  trailer: string;
  fechaLanzamiento: Date;
  poster: File | null;
}

export interface PeliculaDTO{
    id?: number
    titulo: string;
    trailer: string;
    fechaLanzamiento: Date; 
    poster?: string | null;
    generosIds?: number[];
    cinesIds?: number[];
    actoresSelected?: ActorSelected[];
}
