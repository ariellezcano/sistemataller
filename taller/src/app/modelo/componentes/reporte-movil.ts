import { Equipo } from './equipo';
import { Movil } from './movil';
import { Persona } from './persona';
import { Unidad } from './unidad';

export class ReporteMovil {
  unidad: Unidad;
  fechaReparacion: any;
  equipo: Equipo;
  movil: Movil;
  estadoInicial!: string;
  accionesRealizadas!: string;
  materialesUtilizados!: string;
  observaciones!: string;
  tecnico: Persona;
  recibi: Persona;
  entrega: Persona;
  constructor() {
    this.unidad = new Unidad();
    this.equipo = new Equipo();
    this.movil = new Movil();
    this.tecnico = new Persona();
    this.recibi = new Persona();
    this.entrega = new Persona();
  }
}
