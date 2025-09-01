import { Observable } from "rxjs";
import { PaginacionDto } from "../modelos/paginacionDto";
import { HttpResponse } from "@angular/common/http";

export interface IServicioCRUD<TInfo, TInfoDTO> {
        crear(entidad: TInfoDTO): Observable<any>;
        actualizar(id:number, entidad:TInfoDTO): Observable<any>;
        obtenerPaginado(paginacion: PaginacionDto): Observable<HttpResponse<TInfo[]>>;
        obtenerPorId(id: number): Observable<TInfo>;
        eliminar(id: number) : Observable<any>;
}