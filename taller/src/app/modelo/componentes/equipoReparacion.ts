import { EquipoIngreso } from './equipoIngreso';
import { Persona } from './persona';

export class EquipoReparacion {
  id!: number;
  equipo!: EquipoIngreso; //orden de trabajo
  fechaReparacion: any;
  personaRepara: Persona;
  accionRealizada!: string; // que se le hizo al equipo
  estadoVerificacion!: string; // si ya se encuentra reparado
  observacion!: string;
  activo!: boolean;
  constructor() {
    this.personaRepara = new Persona();
    this.activo = true;
  }
}
