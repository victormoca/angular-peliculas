import { AfterViewInit, Component, ComponentRef, inject, Input, ViewChild, viewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { IServicioCRUD } from '../../interfaces/IServicioCRUD';
import { SERVICIO_CRUD_TOKEN } from '../../proveedores/proveedores';
import { errorToArrayMessage } from '../../funciones/errorToArrayMessage';
import { MocaErrorComponent } from "../../componentes/moca-error/moca-error.component";

@Component({
  selector: 'app-crear-entidad',
  imports: [MocaErrorComponent],
  templateUrl: './crear-entidad.component.html',
  styleUrl: './crear-entidad.component.css'
})
export class CrearEntidadComponent<TInfo, TInfoDto> implements AfterViewInit {

  ngAfterViewInit(): void {
    this.componenteRef =  this.contenedorFormuario.createComponent(this.formulario);
    this.componenteRef.instance.posteoFormulario.subscribe((entidad: TInfoDto) => {
      this.guardar(entidad);
    })
  }
  tInfo!: TInfoDto;
  errors!: string[];
  router = inject(Router); 
  entidadService = inject(SERVICIO_CRUD_TOKEN) as IServicioCRUD<TInfo, TInfoDto>;

  @Input({required: true})
  rutaEntidad! : string;

  @Input({required: true})
  titulo!: string;

  @Input({required: true})
  formulario!: any;

  @ViewChild('contedorFormulario', {read: ViewContainerRef})
  contenedorFormuario!: ViewContainerRef;

  private componenteRef!: ComponentRef<any>;

  guardar(tInfo: TInfoDto) {
    this.entidadService.crear(tInfo).subscribe({
      next: (n) => {
        this.router.navigate([this.rutaEntidad]);
      },
      error: (e) => {
        this.errors = errorToArrayMessage(e);
      }
    });
  }
}
