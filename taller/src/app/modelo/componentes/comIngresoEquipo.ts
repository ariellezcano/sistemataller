import { Equipo } from './equipo';
import { OrdenTrabajo } from './ordenTrabajo';
import { Persona } from './persona';

export class ComIngresoEquipo {
  id!: number;
  ordenTrabajo!: OrdenTrabajo;
  equipo: Equipo;
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
    this.activo = true;
  }
}
