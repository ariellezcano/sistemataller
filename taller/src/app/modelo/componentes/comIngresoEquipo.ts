import { Equipo } from './equipo';
import { EstadoEquipo } from './estadoEquipo';
import { OrdenTrabajo } from './ordenTrabajo';
import { Persona } from './persona';
import { Unidad } from './unidad';

export class ComIngresoEquipo {
  id!: number;
  ordenTrabajo!: OrdenTrabajo;
  equipo: Equipo;
  unidad: Unidad;
  area!: string; //informatica, comunicaciones, impresoras
  fallaMencionada!: string;
  observaciones!: string; //observacion
  retiraEntrega!: Persona; //persona logueada que entrega el equipo
  retiraRetira!: Persona; //Persona que retira el equipo
  retiraFecha: any;

  activo!: boolean;
  constructor() {
    this.ordenTrabajo = new OrdenTrabajo();
    this.equipo = new Equipo();
    this.unidad = new Unidad();
    this.activo = true;
  }
}
