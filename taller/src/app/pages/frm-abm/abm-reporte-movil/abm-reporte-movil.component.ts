import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReporteMovil } from 'src/app/modelo/componentes/reporte-movil';
import { DatoPolicial, Equipo, Unidad } from 'src/app/modelo/index.models';
import {
  EquipoService,
  PersonaService,
  UnidadService,
  VehiculosService,
} from 'src/app/servicio/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-reporte-movil',
  templateUrl: './abm-reporte-movil.component.html',
  styleUrls: ['./abm-reporte-movil.component.scss'],
})
export class AbmReporteMovilComponent implements OnInit {
  @Output()
  finalizado: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output()
  cancelado: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  /*
   * control de operaciones a realizar
   */
  entity = 'lst-equipos';

  id!: number;
  procesando!: Boolean;
  item: ReporteMovil;
  items: ReporteMovil[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: EquipoService,
    private wsdlP: PersonaService,
    private wsdlU: UnidadService,
    private wsdlM: VehiculosService
  ) {
    this.item = new ReporteMovil();
    this.items = [];
  }

  ngOnInit(): void {
    this.procesando = false;
    this.id = this.route.snapshot.params.id;
    //this.findID();
  }

  // async findID() {
  //   try {
  //     if (this.id > 0) {
  //       let data = await this.wsdl.doFind(this.id).then();
  //       let res = JSON.parse(JSON.stringify(data));
  //       if (res.status == 200) {
  //         this.dtItem = res.data;
  //         console.log(this.dtItem);
  //       }
  //     } else {
  //       //this.dtItem = new Equipo();
  //     }
  //   } catch (error) {
  //     UturuncoUtils.showToas('Error inesperado', 'error');
  //   }
  // }

  tecnicoEncontrados(event: DatoPolicial) {
    if (event.id !== undefined) {
      this.item.tecnico = event.persona;
      //this.item.ingresoRecibe = event.persona;
    } else {
      Swal.fire('Seleccione Persona');
    }
  }
  recibiEncontrada(event: DatoPolicial) {
    if (event.id !== undefined) {
      this.item.recibi = event.persona;
      //this.item.ingresoRecibe = event.persona;
    } else {
      Swal.fire('Seleccione Persona');
    }
  }
  entregaEncontrada(event: DatoPolicial) {
    if (event.id !== undefined) {
      this.item.entrega = event.persona;
      //this.item.ingresoRecibe = event.persona;
    } else {
      Swal.fire('Seleccione Persona');
    }
  }
  equiposEncontrados(event: Equipo) {
    if (event.id !== undefined) {
      this.item.equipo = event;
    } else {
      Swal.fire('Seleccione Equipo');
    }
  }
  // equiposEncontrados(event: EntregaEquipoUnidades) {
  //   if (event.id !== undefined) {
  //     this.dtItem = new EquipoIngreso();
  //     this.dtItem.equipo = event.equipo;
  //     this.dtItem.unidad = event.unidad;
  //   } else {
  //     Swal.fire('Seleccione Equipo');
  //   }
  // }

  unidadesEncontradas(event: Unidad) {
    if (event.id !== undefined) {
      this.item.unidad = event;
    } else {
      Swal.fire('Seleccione unidad');
    }
  }

  // async doEdit() {
  //   try {
  //     this.procesando = true;
  //     const res = await this.wsdl.doUpdate(this.dtItem, this.dtItem.id).then();
  //     const result = JSON.parse(JSON.stringify(res));
  //     if (result.status == 200) {
  //       UturuncoUtils.showToas('Se actualizado correctamente', 'success');
  //       this.back();
  //       this.finalizado.emit(true);
  //     } else if (result.status == 666) {
  //       // logout app o refresh token
  //     } else {
  //       UturuncoUtils.showToas(result.msg, 'error');
  //     }
  //   } catch (error: any) {
  //     UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
  //   }
  //   this.procesando = false;
  // }

  // async doCreate() {
  //   try {
  //     this.procesando = true;
  //     console.log('datos', this.item);
  //     // const res = await this.wsdl.doInsert(this.item).then();
  //     // this.procesando = false;
  //     // console.log('datos', res);
  //     // const result = JSON.parse(JSON.stringify(res));

  //     // if (result.status == 200) {
  //     //   //this.dtItem = result.status;
  //     //crearDetalleEquipo()
  //     //   UturuncoUtils.showToas('Se creo correctamente', 'success');
  //     //   this.back();
  //     //   this.finalizado.emit(true);
  //     // } else if (result.status == 666) {
  //     //   // logout app o refresh token
  //     // } else {
  //     //   UturuncoUtils.showToas(result.msg, 'error');
  //     // }
  //   } catch (error: any) {
  //     UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
  //   }
  // }
  //agregar la fila en memoria
  addRow() {
    if (this.items.length < 0) {
      this.items.unshift(this.item);
    } else {
      Swal.fire('Debe Agregar solo los datos que aparece en pantalla');
      this.item = new ReporteMovil();
    }
  }
  //elimina la fila en memoria
  deleteRow(indice: any) {
    this.items.splice(indice, 1);
  }
  area(value: any) {
    let valor = '';
    switch (value) {
      case 'INF':
        valor = 'INFORMATICA';
        break;
      case 'COM':
        valor = 'COMUNICACIONES';
        break;
      case 'IMP':
        valor = 'IMPRESORAS';
        break;
      default:
        valor = 'AREA SIN ESPECIFICAR';
        break;
    }
    return valor;
  }

  back() {
    this.router.navigateByUrl(this.entity.toLowerCase());
  }
  getProceso() {
    return this.procesando;
  }
}
