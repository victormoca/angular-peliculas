import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { FormularioUsuarioComponent } from '../formulario-usuario/formulario-usuario.component';
import { UsuarioInfo, UsuarioInfoDto } from '../usuario';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [FormularioUsuarioComponent],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit {
  usuarioInfo!: UsuarioInfo;

  ngOnInit(): void {
    this.usuarioInfo = {
      id: this.id,
      nombre: 'Usuario',
      apellidos: 'Demo',
      fechaNacimiento: new Date(),
      sexo: 'M'
    };
  }

  @Input({transform: numberAttribute})
  id!: number;

  guardarUsuario(usuario: UsuarioInfoDto) {
    console.log('Editando usuario...');
    console.log(usuario);
  }
}

