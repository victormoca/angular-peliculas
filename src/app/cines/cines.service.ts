import { inject, Injectable } from '@angular/core';
import { IServicioCRUD } from '../comun/interfaces/IServicioCRUD';
import { CineCto, CineInfo } from './cineInfo';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginacionDto } from '../comun/modelos/paginacionDto';
import { environment } from '../../environments/environment';
import { convertToHttpParams } from '../comun/funciones/convertToHttpParams';

@Injectable({
  providedIn: 'root'
})
export class CinesService implements IServicioCRUD<CineInfo, CineCto> {

  baseUrl: string = environment.apiUrl + '/cines';
  httpClient = inject(HttpClient);

  constructor() { }
  crear(entidad: CineCto): Observable<any> {
    return this.httpClient.post(this.baseUrl, entidad);
  }
  actualizar(id: number, entidad: CineCto): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/' + id, entidad);
  }
  obtenerPaginado(paginacion: PaginacionDto): Observable<HttpResponse<CineInfo[]>> {
    let queryParams = convertToHttpParams(paginacion);
    return this.httpClient.get<CineInfo[]>(this.baseUrl, {params: queryParams, observe: 'response'});
  }
  obtenerPorId(id: number): Observable<CineInfo> {
    return this.httpClient.get<CineInfo>(this.baseUrl + '/' + id);
  }
  eliminar(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/' + id);
  }
}
