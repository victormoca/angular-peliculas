import { inject, Injectable } from '@angular/core';
import { GeneroInfo, GeneroInfoDto } from './generoInfo';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaginacionDto } from '../comun/modelos/paginacionDto';
import { convertToHttpParams } from '../comun/funciones/convertToHttpParams';
import { IServicioCRUD } from '../comun/interfaces/IServicioCRUD';

@Injectable({
  providedIn: 'root'
})
export class GenerosService implements IServicioCRUD<GeneroInfo, GeneroInfoDto> {

  baseURL = environment.apiUrl + '/generos';
  http = inject(HttpClient);
  
  constructor() 
  { 

  }

  crear(genero: GeneroInfoDto): Observable<any>
  {
    return this.http.post<GeneroInfoDto>(this.baseURL, genero);
  }

  actualizar(id: number, genero: GeneroInfoDto): Observable<any>
  {
    return this.http.put<GeneroInfo>(this.baseURL +'/'+ id, genero);
  }

  obtenerPaginado(paginacionDto: PaginacionDto): Observable<HttpResponse<GeneroInfo[]>>
  {
    let queryParams = convertToHttpParams(paginacionDto);
    return this.http.get<GeneroInfo[]>(this.baseURL, {params: queryParams, observe: 'response'});
  }

  public obtenerTodos(): Observable<GeneroInfo[]> {
    return this.http.get<GeneroInfo[]>(this.baseURL + '/todos');
  }

  obtenerPorId(id: number): Observable<GeneroInfo> 
  {
    return this.http.get<GeneroInfo>(this.baseURL + '/' + id);
  }

  eliminar(id: number): Observable<any>
  {
    return this.http.delete<GeneroInfo>(this.baseURL + '/' + id);
  }
  
}
