import { AfterViewInit, Component, ComponentRef, inject, Input, OnInit, ViewChild, viewChild, ViewContainerRef } from '@angular/core';
import { SERVICIO_CRUD_TOKEN } from '../../proveedores/proveedores';
import { IServicioCRUD } from '../../interfaces/IServicioCRUD';
import { Router } from '@angular/router';
import { errorToArrayMessage } from '../../funciones/errorToArrayMessage';
import { finalize } from 'rxjs';
import { CargandoComponent } from "../cargando/cargando.component";

@Component({
  selector: 'app-editar-entidad',
  imports: [CargandoComponent],
  templateUrl: './editar-entidad.component.html',
  styleUrl: './editar-entidad.component.css'
})
export class EditarEntidadComponent<TInfo, TInfoDto> implements OnInit {

  entidadServices = inject(SERVICIO_CRUD_TOKEN) as IServicioCRUD<TInfo, TInfoDto>;
  router = inject(Router);
  errores: string[] = [];
  cargando: boolean = true;

  @ViewChild('contenidoFormulario', {read: ViewContainerRef})
  contenedorFormulario!: ViewContainerRef;

  private formularioRef!: ComponentRef<any>;

  @Input({required: true})
  titulo!: string;

  @Input({required: true})
  rutaEntidad!: string;

  @Input({required:  true})
  id!: number;

  @Input({required: true})
  formulario!: any;

  ngOnInit(): void {
    this.entidadServices.obtenerPorId(this.id)
    .pipe(finalize(() => this.cargando = false))
    .subscribe(
      {
        next: (entidad: TInfo) => {
          setTimeout(() => this.cargarFormulario(entidad));
        },
        error: (e) => {
          this.errores = errorToArrayMessage(e);
        }
      }
    );
  }

  cargarFormulario(entidad: TInfo) {
    if(this.contenedorFormulario) {
      this.formularioRef = this.contenedorFormulario.createComponent(this.formulario);
      this.formularioRef.instance.infoModel = entidad;
      this.formularioRef.instance.posteoFormulario.subscribe((entidad: TInfoDto) => {
        this.guardar(entidad);
      });
    }
  }

  guardar(entidadInfo: TInfoDto) {
    this.entidadServices.actualizar(this.id, entidadInfo).subscribe({
      next: (n) => {
        this.router.navigate([this.rutaEntidad]); 
      },
      error: (e) => {
        this.errores = errorToArrayMessage(e);
      }
    });
    
  }

}
