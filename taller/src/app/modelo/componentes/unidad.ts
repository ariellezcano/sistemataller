import { Regional } from './regional';

export class Unidad {

    id!: Number;
    cuof!: String;
    nombre!: string;
    telefono!: String;
    ubicacion!: String;
    programa!: String;
    subprograma!: String;
    actividadespecifica!: String;
    activo!: Boolean;
    regional: Regional;


    constructor() {
        this.regional = new Regional();
    }
}