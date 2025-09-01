import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ActorInfo, ActorInfoDto } from './actores/actor';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { PaginacionDto } from './comun/modelos/paginacionDto';
import { convertToHttpParams } from './comun/funciones/convertToHttpParams';
import { IServicioCRUD } from './comun/interfaces/IServicioCRUD';
import { ActorSelected } from './comun/componentes/autocomplete-actores/ActorSelected';

@Injectable({
  providedIn: 'root'
})
export class ActoresService implements IServicioCRUD<ActorInfo, ActorInfoDto> {

  http = inject(HttpClient);
  baseUrl:string = environment.apiUrl + "/actores";

  convertToFormData(actorDto: ActorInfoDto):FormData{
    let actor = new FormData;
    
      actor.append("nombre", actorDto.nombre);
      actor.append("fechaNacimiento", actorDto.fechaNacimiento.toISOString().split("T")[0]);
      
      if(actorDto.foto){
        actor.append("foto", actorDto.foto);
      }
    
    return actor;
  }

  crear(actor: ActorInfoDto): Observable<any>
  {
    let actorFormData = this.convertToFormData(actor);
    return this.http.post(this.baseUrl, actorFormData);
  }

  actualizar(id:number, actor:ActorInfoDto): Observable<any>
  {
    let actorFormData = this.convertToFormData(actor);
    return this.http.put(this.baseUrl + '/' + id, actorFormData);
  }

  obtenerPaginado(paginacion: PaginacionDto): Observable<HttpResponse<ActorInfo[]>>
  {
    let queryParms = convertToHttpParams(paginacion);
    return this.http.get<ActorInfo[]>(this.baseUrl, {params: queryParms, observe:'response'});
  }

  obtenerPorId(id: number): Observable<ActorInfo> 
  {
    return this.http.get<ActorInfo>(this.baseUrl + '/' + id);
  }

  eliminar(id: number) : Observable<any>
  {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  public obtenerPorNombre(nombre: string): Observable<ActorSelected[]> {
    return this.http.get<ActorSelected[]>(this.baseUrl + '/' + nombre);
  }
}
