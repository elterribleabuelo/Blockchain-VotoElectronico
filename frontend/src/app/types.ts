/*
  Creamos las interfaces
*/

// Interfaz para la encuesta
export interface Poll extends PollForm{
  /* Propiedades:
    id: 12,
    results:[0,0,0,0,5,7,2],
  */
  id: number;
  results:number[];
  voted:boolean;
}

export interface PollForm{
  /** Propiedades
   * question:Que dias de la semana te gustan mas?,
   * options:['Lunes','Martes','Miercoles','Jueves','Viernes',...],
   * thumbnail: https://image,png
   */
  question:string;
  options:string[];
  thumbnail:string;
}

export interface PollVote{
  id: number;
  vote: number;
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
