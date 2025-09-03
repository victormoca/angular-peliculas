import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ListadoGenericoComponent } from '../../comun/componentes/listado-generico/listado-generico.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PaginacionDto } from '../../comun/modelos/paginacionDto';
import { UsuarioDto } from '../seguridad';
import { SeguridadService } from '../seguridad.service';
import Swal from 'sweetalert2';
import { MatChipsModule } from "@angular/material/chips";

@Component({
  selector: 'app-indice-usuarios',
  imports: [
    MatButtonModule,
    MatTableModule,
    ListadoGenericoComponent,
    MatPaginatorModule,
    SweetAlert2Module,
    MatChipsModule
],
  templateUrl: './indice-usuarios.component.html',
  styleUrl: './indice-usuarios.component.css'
})
export class IndiceUsuariosComponent {
  columnasAMostrar = ['email', 'acciones'];
  paginacion: PaginacionDto = {numeroPagina:1, registrosPorPagina: 10};
  cantidadTotalRegistros!: number;

  usuarios!: UsuarioDto[];

  servicioSeguridad = inject(SeguridadService);

  constructor() {
    this.cargarRegistros();
  }

  cargarRegistros() {
    this.servicioSeguridad.obtenerUsuariosPaginados(this.paginacion)
    .subscribe(respuesta => {
      this.usuarios = respuesta.body as UsuarioDto[];
      const cabecera = respuesta.headers.get("cantidad-total-registros") as string;
      this.cantidadTotalRegistros = parseInt(cabecera, 10);
    });
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginacion = {numeroPagina: datos.pageIndex +1, registrosPorPagina: datos.pageSize};
    this.cargarRegistros();
  }

  hacerAdmin(email: string) {
    this.servicioSeguridad.hacerAdmin(email)
    .subscribe(() => {
      Swal.fire("Exitoso", 'El usuario ' + email + ' ahora es admin.', "success");
    })
  }

  removerAdmin(email: string) {
    this.servicioSeguridad.removerAdmin(email)
    .subscribe(() => {
      Swal.fire("Exitoso", 'El usuario ' + email + ' ya no es admin.', "success");
    })
  }
  
  
}
