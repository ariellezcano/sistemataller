import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Diagnosticos } from 'src/app/modelo/index.models';
import { DiagnosticoService } from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';

@Component({
  selector: 'app-abm-diagnostico',
  templateUrl: './abm-diagnostico.component.html',
  styleUrls: ['./abm-diagnostico.component.scss'],
})
export class AbmDiagnosticoComponent implements OnInit {
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
  items: Diagnosticos[];
  item: Diagnosticos;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: DiagnosticoService
  ) {
    this.item = new Diagnosticos();
    this.items = [];
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
    /* validar */
    if (!this.item.id) {
      this.doCreate();
    }
  }

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
    this.item = new Diagnosticos();
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
