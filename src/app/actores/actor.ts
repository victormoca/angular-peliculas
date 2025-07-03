export interface ActorInfo {
  id: number;
  nombre: string;
  fechaNacimiento: Date;
  foto?: string | null
}

export interface ActorInfoDto {
  nombre: string;
  fechaNacimiento: Date;
  foto?: File | null;
}
