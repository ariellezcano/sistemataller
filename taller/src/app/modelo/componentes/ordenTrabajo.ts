import { Persona } from './persona';
import { Unidad } from './unidad';

export class OrdenTrabajo {
  id!: number;
  unidad: Unidad;
  nroOrden!: number;
  ingresoRecibe: Persona;
  ingresoEntrega: Persona;
  ingresoFecha: any;
  notaNro!: string;

  constructor() {
    this.unidad = new Unidad();
    this.ingresoRecibe = new Persona();
    this.ingresoEntrega = new Persona();
  }
}
