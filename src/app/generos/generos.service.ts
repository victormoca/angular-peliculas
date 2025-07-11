import { inject, Injectable } from '@angular/core';
import { GeneroInfo, GeneroInfoDto } from './generoInfo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  baseURL = environment.apiUrl + '/generos';
  http = inject(HttpClient);
  
  constructor() 
  { 

  }

  obtenerTodos(): Observable<GeneroInfo[]>
  {
    return this.http.get<GeneroInfo[]>(this.baseURL);
  }

  crear(genero: GeneroInfoDto)
  {
    return this.http.post<GeneroInfoDto>(this.baseURL, genero);
  }
  
}
