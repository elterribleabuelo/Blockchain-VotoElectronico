export interface UserI {
  dni:string;
  /**Leer estos datos desde un API */
  // Inicio
  nombre:string;
  apellidos:string;
  fecha_nacimiento:string;
  // Fin
  correo:string;
  uid:string;
  password:string;
  perfil:'votante' | 'admin';
}
