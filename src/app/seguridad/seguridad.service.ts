import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CredencialesUsuariosDto, ResponseAutenticacionDto, UsuarioJwt } from './seguridad';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  baseURL: string = environment.apiUrl + '/usuarios'
  http: HttpClient = inject(HttpClient);
  private readonly llaveToken: string = "llave-token";
  private readonly llaveExpiracion: string = "llave-expiracion";

  
  constructor() { }

  public registrar(credenciales: CredencialesUsuariosDto) : Observable<ResponseAutenticacionDto> {
    return this.http.post<ResponseAutenticacionDto>(this.baseURL + '/registrar', credenciales)
    .pipe(
      tap(respuestaAutenticacion => this.guardarToken(respuestaAutenticacion))
    );
  }

  public login(credenciales: CredencialesUsuariosDto): Observable<ResponseAutenticacionDto> {
    return this.http.post<ResponseAutenticacionDto>(this.baseURL + '/login', credenciales)
    .pipe(
      tap(respuestaLogin => this.guardarToken(respuestaLogin))
    );
  }

  private guardarToken(respuestaAutenticacion: ResponseAutenticacionDto) {
    let expiracion = new Date(respuestaAutenticacion.expiracion);
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(this.llaveExpiracion, expiracion.toDateString());
  }

  public getCampoToken(campo: string): string {
    let token = localStorage.getItem(this.llaveToken);

    if(!token) {
      return '';
    }

    let claim = JSON.parse(atob(token.split('.')[1]));
    return claim[campo];
  }

  public estaLogueado(): boolean {
    let token = localStorage.getItem(this.llaveToken);

    if(!token) {
      return false;
    }

    let expiracion = localStorage.getItem(this.llaveExpiracion);
    if(!expiracion) {
      return false;
    }

    let fechaExpiracion = Date.parse(expiracion);
    if(fechaExpiracion <= Date.now()) {
      this.logOut();
      return false;
    }

    return true;
  }

  public logOut() {
    localStorage.removeItem(this.llaveExpiracion);
    localStorage.removeItem(this.llaveToken);
  }

  public getRole(): string {
    return 'admin';
  }
}
