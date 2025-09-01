import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CargandoComponent } from '../cargando/cargando.component';
import { ListadoGenericoComponent } from '../listado-generico/listado-generico.component';
import { MocaErrorComponent } from '../moca-error/moca-error.component';
import { PaginacionDto } from '../../modelos/paginacionDto';
import { finalize } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { errorToArrayMessage } from '../../funciones/errorToArrayMessage';
import { SERVICIO_CRUD_TOKEN } from '../../proveedores/proveedores';
import { IServicioCRUD } from '../../interfaces/IServicioCRUD';

@Component({
  selector: 'app-indice-entidad',
  imports: [
        MatButtonModule,
        ListadoGenericoComponent,
        MatTableModule,
        RouterLink,
        MatPaginatorModule,
        MocaErrorComponent,
        SweetAlert2Module,
        CargandoComponent
  ],
  templateUrl: './indice-entidad.component.html',
  styleUrl: './indice-entidad.component.css'
})
export class IndiceEntidadComponent<TInfo, TInfoDTO> implements OnInit {

  @Input({required: true})
  titulo!: string;

  @Input({required: true})
  rutaEditar!: string;

  @Input({required: true})
  rutaCrear!: string;

  routerLink = inject(Router);
  entidades?: TInfo[];
  columnasAMostrar = ['id', 'nombre', 'acciones'];
  paginacionDto: PaginacionDto = {numeroPagina: 1, registrosPorPagina: 5};
  cantidadTotalRegistros: number = 0;
  errores: string[] = [];
  isLoading: boolean = true;
  servicioCRUD = inject(SERVICIO_CRUD_TOKEN) as IServicioCRUD<TInfo, TInfoDTO>;

    ngOnInit(): void {
    this.cargarRegistros(this.paginacionDto);
  }

  cargarRegistros(paginacion: PaginacionDto){
    this.servicioCRUD.obtenerPaginado(paginacion)
    .pipe(finalize(() => this.isLoading = false))
      .subscribe({
          next: (response: HttpResponse<TInfo[]>) => {
            this.entidades = response.body as TInfo[];
            this.cantidadTotalRegistros = Number.parseInt(response.headers.get('cantidad-total-registros') as string);
          },
          error: (e: any) => {
            this.errores = errorToArrayMessage(e);
            this.isLoading = false;
          }
      });
  }

  crearRegistro() {
    this.routerLink.navigate([this.rutaCrear]);
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginacionDto = {numeroPagina: datos.pageIndex + 1, registrosPorPagina: datos.pageSize};
    this.cargarRegistros(this.paginacionDto);
  }

  eliminarRegistro(id: number){
    this.servicioCRUD.eliminar(id).subscribe(
      {
        next: () => {
          let paginacion: PaginacionDto;
          paginacion = {
              numeroPagina: this.paginacionDto.numeroPagina, 
              registrosPorPagina: this.paginacionDto.registrosPorPagina
          }
          this.cargarRegistros(paginacion);
        },
        error: (e: any) => {
          this.errores = errorToArrayMessage(e);
        }
      }
    );
  }
}
