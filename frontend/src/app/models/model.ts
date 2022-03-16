export interface UserI {
  dni:string;
  /**Leer estos datos desde un API */
  // Inicio
  nombre:string;
  apellido_materno:string;
  apellido_paterno:string;
  fecha_nacimiento:string;
  url_foto:string;
  // Fin
  correo:string;
  uid:string;
  password:string;
  perfil:'votante' | 'admin';
}
