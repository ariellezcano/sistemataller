import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DatoPolicial,
  Diagnosticos,
  DiagnosticosEquipo,
} from 'src/app/modelo/index.models';
import { DiagnosticoEquipoService } from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-diagnostico-equipo',
  templateUrl: './abm-diagnostico-equipo.component.html',
  styleUrls: ['./abm-diagnostico-equipo.component.scss'],
})
export class AbmDiagnosticoEquipoComponent implements OnInit {
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
  items: DiagnosticosEquipo[];
  item: DiagnosticosEquipo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: DiagnosticoEquipoService
  ) {
    this.items = [];
    this.item = new DiagnosticosEquipo();
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
    this.item.ingresoEquipo.id = this.id;
    /* validar */
    if (this.item.id < 0) {
      this.doCreate();
    } else {
      this.doEdit();
    }
  }

  personasEncontrados(event: DatoPolicial) {
    if (event.id !== undefined) {
      this.item.personaDiagnostica = event.persona;
      //this.item.ingresoRecibe = event.persona;
    } else {
      Swal.fire('Seleccione Persona');
    }
  }
  selecciondiagnostico(event: Diagnosticos) {
    this.item.diagnostico = event;
    console.log('soy el papa', this.item.diagnostico);
  }
  // equiposEncontrados(event: Equipo) {
  //   if (event.id !== undefined) {
  //     this.dtItem.equipo = event;
  //   } else {
  //     Swal.fire('Seleccione Equipo');
  //   }
  // }
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
    //this.dtItem.ordenTrabajo = this.item;
    this.items.unshift(this.item);
    console.log('addrow', this.item);
    this.item = new DiagnosticosEquipo();
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

  colores(item: DiagnosticosEquipo) {
    let color = '';

    if (item.id == undefined) {
      color = 't-success';
    } else {
      color = 't-default';
    }

    return color;
  }

  back() {
    this.router.navigateByUrl(this.entity.toLowerCase());
  }
  getProceso() {
    return this.procesando;
  }
}
