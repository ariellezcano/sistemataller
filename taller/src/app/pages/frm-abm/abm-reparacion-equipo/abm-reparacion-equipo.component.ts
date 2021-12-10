import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DatoPolicial,
  Equipo,
  ReparacionEquipo,
} from 'src/app/modelo/index.models';
import { EquipoReparacionService } from 'src/app/servicio/componentes/equipo-reparacion.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-reparacion-equipo',
  templateUrl: './abm-reparacion-equipo.component.html',
  styleUrls: ['./abm-reparacion-equipo.component.scss'],
})
export class AbmReparacionEquipoComponent implements OnInit {
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
  items: ReparacionEquipo[];
  item: ReparacionEquipo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: EquipoReparacionService //private wsdlE: EquipoIngresoService
  ) {
    this.items = [];
    this.item = new ReparacionEquipo();
  }

  ngOnInit(): void {
    this.procesando = false;
    this.id = this.route.snapshot.params.id;
    this.findID();
  }

  async findID() {
    try {
      if (this.id > 0) {
        let data = await this.wsdl.doFind(this.id).then();
        let res = JSON.parse(JSON.stringify(data));
        if (res.status == 200) {
          this.item = res.data;
          console.log(this.item);
        }
      } else {
        //this.dtItem = new Equipo();
      }
    } catch (error) {
      UturuncoUtils.showToas('Error inesperado', 'error');
    }
  }

  doAction() {
    this.item.personaRepara.id = JSON.parse(
      '' + UturuncoUtils.getSession('personal')
    ).id;
    /* validar */
    if (this.item.id == undefined) {
      this.doCreate();
    }
  }

  // crearDetalleEquipo() {
  //   this.dtItems.forEach((e) => {
  //     if (e.id == undefined) {
  //       this.dtItem = new ComIngresoEquipo();
  //       e.ordenTrabajo.id = this.item.id;
  //       this.dtItem = e;

  //       // try {
  //       //   this.procesando = true;
  //       //   // const res = await this.wsdl.doInsert(this.dtItem).then();
  //       //   // this.procesando = false;
  //       //   // console.log('datos', res);
  //       //   // const result = JSON.parse(JSON.stringify(res));

  //       //   // if (result.status == 200) {
  //       //   //   //this.dtItem = result.status;
  //       //   //   //UturuncoUtils.showToas('Se creo correctamente', 'success');
  //       //   //   //this.back();
  //       //   //   this.finalizado.emit(true);
  //       //   // } else if (result.status == 666) {
  //       //   //   // logout app o refresh token
  //       //   // } else {
  //       //   //   UturuncoUtils.showToas(result.msg, 'error');
  //       //   // }
  //       // } catch (error: any) {
  //       //   UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
  //       // }
  //     }
  //   });
  // }
  personasEncontrados(event: DatoPolicial) {
    if (event.id !== undefined) {
      this.item.personaRepara = event.persona;
      //this.item.ingresoRecibe = event.persona;
    } else {
      Swal.fire('Seleccione Persona');
    }
  }
  equiposEncontrados(event: Equipo) {
    if (event.id !== undefined) {
      this.item = new ReparacionEquipo();
      this.item.equipo.equipo = event;
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

  async doEdit() {
    try {
      this.procesando = true;
      const res = await this.wsdl.doUpdate(this.item, this.item.id).then();
      const result = JSON.parse(JSON.stringify(res));
      if (result.status == 200) {
        UturuncoUtils.showToas('Se actualizado correctamente', 'success');
        this.back();
        this.finalizado.emit(true);
      } else if (result.status == 666) {
        // logout app o refresh token
      } else {
        UturuncoUtils.showToas(result.msg, 'error');
      }
    } catch (error: any) {
      UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
    }
    this.procesando = false;
  }

  async doCreate() {
    try {
      this.procesando = true;
      console.log('datos', this.item);
      // const res = await this.wsdl.doInsert(this.item).then();
      // this.procesando = false;
      // console.log('datos', res);
      // const result = JSON.parse(JSON.stringify(res));

      // if (result.status == 200) {
      //   //this.dtItem = result.status;
      //crearDetalleEquipo()
      //   UturuncoUtils.showToas('Se creo correctamente', 'success');
      //   this.back();
      //   this.finalizado.emit(true);
      // } else if (result.status == 666) {
      //   // logout app o refresh token
      // } else {
      //   UturuncoUtils.showToas(result.msg, 'error');
      // }
    } catch (error: any) {
      UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
    }
  }
  //agregar la fila en memoria
  addRow() {
    this.items.unshift(this.item);
    console.log('addrow', this.item);
    this.item = new ReparacionEquipo();
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