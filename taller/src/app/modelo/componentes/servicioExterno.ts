import { Persona } from './persona';
import { Unidad } from './unidad';

export class ServicioExterno {
  id!: number;
  fechaReparacion: any;
  unidad: Unidad;
  problema!: string;
  accionesTomadas!: string;
  materialesUtilizados!: string;
  observaciones!: string;
  tecnico: Persona;
  responsableUnidad: Persona;
  responsableServicio: Persona;
  activo!: boolean;
  constructor() {
    this.unidad = new Unidad();
    this.tecnico = new Persona();
    this.responsableUnidad = new Persona();
    this.responsableServicio = new Persona();
  }
}
