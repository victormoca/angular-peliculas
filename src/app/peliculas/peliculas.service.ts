import { HttpClient, HttpParams, HttpResourceFn, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { LandingPageDTO, PeliculaCreacionDTO, PeliculaDTO, PeliculasPostGetDTO, PeliculasPutGetDto } from './pelicula';
import { formatDiagnosticsWithColorAndContext } from 'typescript';
@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor() { }

  httpClient = inject(HttpClient);
  baseUrl: string = environment.apiUrl + '/peliculas';

  public obtenerLandingPage(): Observable<LandingPageDTO> {
    return this.httpClient.get<LandingPageDTO>(this.baseUrl + '/' + 'landing');
  }

  public obtenerPorId(id:  number): Observable<PeliculaDTO> {
    return this.httpClient.get<PeliculaDTO>(this.baseUrl + '/' + id);
  }

  public filtrar(valores: any): Observable<HttpResponse<PeliculaDTO[]>>{
    const params = new HttpParams({fromObject: valores});
    return this.httpClient.get<PeliculaDTO[]>(this.baseUrl + '/filtrar', {params, observe: 'response'});
  }

  public createGet(): Observable<PeliculasPostGetDTO> {
    return this.httpClient.get<PeliculasPostGetDTO>(this.baseUrl + '/postget');
  }

  public crear(pelicula: PeliculaCreacionDTO): Observable<PeliculaDTO> {
    const formData = this.construirFormData(pelicula);
    return this.httpClient.post<PeliculaDTO>(this.baseUrl, formData);
  }

  public actualizarGet(id: number): Observable<PeliculasPutGetDto> {
    return this.httpClient.get<PeliculasPutGetDto>(this.baseUrl + '/putget/' + id);
  }

  public actualizar(id: number, pelicula: PeliculaCreacionDTO) {
    const formData = this.construirFormData(pelicula);
    return this.httpClient.put(this.baseUrl + '/' + id, formData);
  }

  public borrar(id: number) {
    return this.httpClient.delete(this.baseUrl + '/' + id);
  }

  private construirFormData(pelicula: PeliculaCreacionDTO): FormData {
    const formData = new FormData();
    formData.append('titulo', pelicula.titulo);
    formData.append('fechaLanzamiento', pelicula.fechaLanzamiento.toISOString().split('T')[0]);

    if(pelicula.poster) {
      formData.append('poster', pelicula.poster);
    }

    if(pelicula.trailer) {
      formData.append('trailer', pelicula.trailer);
    }

    formData.append('generosIds', JSON.stringify(pelicula.generosIds));
    formData.append('cinesIds', JSON.stringify(pelicula.cinesIds));
    formData.append('actores', JSON.stringify(pelicula.actores));

    return formData;
    
  }
  
  
}
