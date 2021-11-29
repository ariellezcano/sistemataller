import { Diagnostico } from '../index.models';
import { EquipoIngreso } from './equipoIngreso';
import { EquipoReparacion } from './equipoReparacion';
import { Persona } from './persona';

export class DiagnosticoEquipo {
  id!: number;
  ingresoEquipo: EquipoIngreso;
  diagnostico: Diagnostico;
  personaDiagnostico: Persona;
  fechaDiagnostico: any;
  observaciones!: boolean;
  activo: boolean;

  constructor() {
    this.ingresoEquipo = new EquipoIngreso();
    this.diagnostico = new Diagnostico();
    this.personaDiagnostico = new Persona();
    this.activo = true;
  }
}
