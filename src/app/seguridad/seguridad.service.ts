import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CredencialesUsuariosDto, ResponseAutenticacionDto, UsuarioDto } from './seguridad';
import { Observable, tap } from 'rxjs';
import { PaginacionDto } from '../comun/modelos/paginacionDto';
import { convertToHttpParams } from '../comun/funciones/convertToHttpParams';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  baseURL: string = environment.apiUrl + '/usuarios'
  http: HttpClient = inject(HttpClient);
  private readonly llaveToken: string = "llave-token";
  private readonly llaveExpiracion: string = "llave-expiracion";

  
  constructor() { }

  obtenerUsuariosPaginados(paginacion : PaginacionDto): Observable<HttpResponse<UsuarioDto[]>> {
    let queryParams = convertToHttpParams(paginacion);
    return this.http.get<UsuarioDto[]>(this.baseURL + '/ListadoUsuarios', {params: queryParams, observe: 'response'});
  }

  hacerAdmin(email: string) {
    return this.http.post(this.baseURL + '/haceradmin', {email});
  }

  removerAdmin(email: string) {
    return this.http.post(this.baseURL + '/removeradmin', {email});
  }

  obtenerToken(): string | null {
    return localStorage.getItem(this.llaveToken);
  }

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
    const esAdmin = this.getCampoToken('esadmin');
    if(esAdmin) {
      return 'admin'
    } else{
      return '';
    }
  }
}
