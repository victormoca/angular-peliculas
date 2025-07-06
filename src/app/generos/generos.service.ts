import { inject, Injectable } from '@angular/core';
import { GeneroInfo } from './generoInfo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  http = inject(HttpClient);
  
  constructor() 
  { 

  }

  obtenerTodos(): Observable<GeneroInfo[]>
  {
    return this.http.get<GeneroInfo[]>('https://localhost:7064/api/Generos');
  }
  
}
