import { Equipo } from './equipo';
import { Movil } from './movil';
import { Persona } from './persona';
import { Unidad } from './unidad';
import { Vehiculo } from './vehiculo';

export class ReporteMovil {
  //id!: number;
  unidad: Unidad;
  fechaReparacion: any;
  equipo: Equipo;
  movil: Vehiculo;
  estadoInicial!: string;
  accionesRealizadas!: string;
  materialesUtilizados!: string;
  observaciones!: string;
  tecnico: Persona;
  recibi: Persona;
  entrega: Persona;
  //activo!: boolean;
  constructor() {
    this.unidad = new Unidad();
    this.equipo = new Equipo();
    this.movil = new Vehiculo();
    this.tecnico = new Persona();
    this.recibi = new Persona();
    this.entrega = new Persona();
  }
}
