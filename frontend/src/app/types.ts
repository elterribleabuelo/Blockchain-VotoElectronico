/*
  Creamos las interfaces
*/

// Interfaz para la encuesta
export interface Poll{
  /* Propiedades:
    id: 12,
    question:Que dias de la semana te gustan mas?,
    results:[0,0,0,0,5,7,2],
    options:['Lunes','Martes','Miercoles','Jueves','Viernes',...],
    thumbnail: https://image,png
  */
  id: number;
  question:string;
  results:number[];
  options:string[];
  thumbnail:string;
}

// Interfaz para el votante

export interface Voter{
  /* Propiedades:
    id: hash que sale del Metamask (0xJHSGSGSGS2521)
    voted: Serie de ids que contendrán la lista de ID de la encuesta por las que voto el votante
  */
  id: string;
  voted:number[];
}
