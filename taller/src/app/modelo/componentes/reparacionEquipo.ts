import { ComIngresoEquipo } from './comIngresoEquipo';
import { Persona } from './persona';

export class ReparacionEquipo {
  id!: number;
  equipo!: ComIngresoEquipo; //orden de trabajo
  fechaReparacion: any;
  personaRepara: Persona;
  observacion!: string;
  activo!: boolean;
  constructor() {
    this.personaRepara = new Persona();
    this.activo = true;
  }
}
