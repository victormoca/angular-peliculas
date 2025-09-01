export interface ResponseAutenticacionDto {
    token: string,
    expiracion: Date
}

export interface CredencialesUsuariosDto {
    email: string,
    password: string
}

export interface UsuarioJwt {
    nombre: string
}