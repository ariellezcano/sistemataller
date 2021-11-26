import { DatoPolicial } from "./datoPolicial";
import { Equipo } from "./equipo";
import { Movil } from "./movil";
import { Persona } from "./persona";
import { Unidad } from "./unidad";
import { Vehiculo } from "./vehiculo";

export class EntregaEquipoUnidades{
    id!: number;
    nroNota!: string;
    equipo!: Equipo;
    unidad!: Unidad;
    recibe!: Persona;
    entrega!: Persona;
    fechaEntrega!: any;
    fechaRecepcion!: any;
    observaciones!: string;
    tipoEntrega!: string;
    aclaracion!: string;
    movilPol!: any; 
    activo: boolean;

    constructor(){
        this.recibe = new Persona();
        this.entrega = new Persona();
        this.equipo = new Equipo();
        this.unidad = new Unidad();
        this.fechaEntrega = new Date();
        this.activo = true;
    }
}