import { Component } from '@angular/core';
import { FormularioUsuarioComponent } from '../formulario-usuario/formulario-usuario.component';
import { UsuarioInfo, UsuarioInfoDto } from '../usuario';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [FormularioUsuarioComponent],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent {

  usuarioInfo: UsuarioInfo = {
    id: 0,
    nombre: '',
    apellidos: '',
    fechaNacimiento: new Date(),
    sexo: ''
  };

  guardarUsuario(usuario: UsuarioInfoDto) {
    console.log('Guardando usuario...');
    console.log(usuario);
  }
}

