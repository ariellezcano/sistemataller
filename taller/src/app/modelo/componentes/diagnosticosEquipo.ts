import { Diagnosticos } from '../index.models';
import { ComIngresoEquipo } from './comIngresoEquipo';
import { Persona } from './persona';

export class DiagnosticosEquipo {
  id!: number;
  ingresoEquipo: ComIngresoEquipo;
  diagnostico: Diagnosticos;
  personaDiagnostica: Persona;
  fechaDiagnostico: any;
  observaciones!: boolean;
  activo: boolean;

  constructor() {
    this.ingresoEquipo = new ComIngresoEquipo();
    this.diagnostico = new Diagnosticos();
    this.personaDiagnostica = new Persona();
    this.activo = true;
  }
}
