import { Equipo } from './equipo';
import { EstadoEquipo } from './estadoEquipo';
import { Persona } from './persona';
import { Unidad } from './unidad';

export class EquipoIngreso {
  id!: number;
  nroOrden!: string;
  equipo: Equipo;
  unidad: Unidad;
  notaNro!: string;
  ingresoRecibe: Persona; //persona logueada que recibe el equipo
  ingresoEntrega: Persona; // persona que trae el equipo
  ingresoFecha: any;
  retiraEntrega!: Persona; //persona logueada que entrega el equipo
  retiraRetira!: Persona; //Persona que retira el equipo
  retiraFecha: any;
  estadoIngreso!: string; // reparacion, devolucion o baja
  descripcionIngreso!: string; //observacion
  fallaMencionada!: string;
  activo!: boolean;
  constructor() {
    this.ingresoRecibe = new Persona();
    this.ingresoEntrega = new Persona();
    this.equipo = new Equipo();
    this.unidad = new Unidad();
    this.activo = true;
  }
}
