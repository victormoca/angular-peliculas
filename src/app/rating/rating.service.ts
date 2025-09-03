import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor() { }

  private baseURL = environment.apiUrl + '/ratings';

  private http = inject(HttpClient);

  puntuar(peliculaId: number, puntuacion: number) {
    return this.http.post(this.baseURL, {peliculaId, puntuacion});
  }
}
