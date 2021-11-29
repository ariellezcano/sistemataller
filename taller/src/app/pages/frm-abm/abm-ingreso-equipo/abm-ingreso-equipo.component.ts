import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DatoPolicial,
  Equipo,
  EquipoIngreso,
  Unidad,
} from 'src/app/modelo/index.models';
import { EquipoIngresoService } from 'src/app/servicio/componentes/equipo-ingreso.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-ingreso-equipo',
  templateUrl: './abm-ingreso-equipo.component.html',
  styleUrls: ['./abm-ingreso-equipo.component.scss'],
})
export class AbmIngresoEquipoComponent implements OnInit {
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
  items: EquipoIngreso[];
  item: EquipoIngreso;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: EquipoIngresoService
  ) {
    this.items = [];
    this.item = new EquipoIngreso();
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
        //this.item = new Equipo();
      }
    } catch (error) {
      UturuncoUtils.showToas('Error inesperado', 'error');
    }
  }

  doAction(f: NgForm) {
    /* validar */
    if (this.item.id > 0) {
      this.doEdit();
    } else {
      this.doCreate();
    }
  }

  personasEncontrados(event: DatoPolicial) {
    if (event.id !== undefined) {
      this.item.ingresoEntrega = event.persona;
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
  unidadesEncontradas(event: Unidad) {
    if (event.id !== undefined) {
      this.item.unidad = event;
    } else {
      Swal.fire('Seleccione unidad');
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
      this.item.unidad.id = 1;
      // this.item.unidad.regional.id = 1;

      console.log('datos', this.item);
      const res = await this.wsdl.doInsert(this.item).then();
      this.procesando = false;
      console.log('datos', res);
      const result = JSON.parse(JSON.stringify(res));

      if (result.status == 200) {
        //this.item = result.status;
        UturuncoUtils.showToas('Se creo correctamente', 'success');
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
  }
  //agregar la fila en memoria
  addRow() {
    this.items.unshift(this.item);
    this.item = new EquipoIngreso();
  }
  //elimina la fila en memoria
  deleteRow(indice: any) {
    this.items.splice(indice, 1);
  }

  back() {
    this.router.navigateByUrl(this.entity.toLowerCase());
  }
  getProceso() {
    return this.procesando;
  }
}
