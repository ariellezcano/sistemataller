import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ComIngresoEquipo,
  ReparacionEquipo,
} from 'src/app/modelo/index.models';
import { EquipoIngresoService } from 'src/app/servicio/componentes/equipo-ingreso.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lst-comunicaciones',
  templateUrl: './lst-comunicaciones.component.html',
  styleUrls: ['./lst-comunicaciones.component.scss'],
})
export class LstComunicacionesComponent implements OnInit {
  @ViewChild('close') cerrar!: ElementRef;
  @ViewChild('close1') cerrar1!: ElementRef;

  @Output()
  finalizado: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output()
  cancelado: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  exportar: boolean = false;
  items: ComIngresoEquipo[];
  item: ComIngresoEquipo;
  itemR!: ReparacionEquipo;
  procesando!: Boolean;
  public load!: boolean;

  entidad = 'lst-equipos';
  entity = 'lst-comunicaciones';

  diagnostico = 'diagnostico';
  constructor(private wsdl: EquipoIngresoService, private router: Router) {
    this.load = false;
    this.item = new ComIngresoEquipo();
    this.items = [];
    this.itemR = new ReparacionEquipo();
  }

  ngOnInit(): void {}

  preDelete(item: ComIngresoEquipo) {
    this.item = new ComIngresoEquipo();
    this.item = item;

    Swal.fire({
      title: 'Esta Seguro?',
      text:
        '¡No podrás recuperar este archivo ' +
        item.equipo.tipoEquipo.nombre +
        '!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Eliminar!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.value) {
        this.delete();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        UturuncoUtils.showToas('Tu archivo esta seguro :)', 'warning');
      }
    });
  }

  async delete() {
    try {
      this.procesando = true;
      const res = await this.wsdl.doDelete(this.item.id).then();
      const result = JSON.parse(JSON.stringify(res));
      if (result.code == 200) {
        UturuncoUtils.showToas(result.msg, 'success');
        this.cancel();
      } else {
        UturuncoUtils.showToas(result.msg, 'error');
      }
    } catch (error: any) {
      UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
    }
    this.procesando = false;
  }

  accion(event: Boolean) {
    this.cerrar.nativeElement.click();
    if (event) {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Se actualizo correctamente el fichero.',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  cancel() {
    this.item = new ComIngresoEquipo();
    //this.fil.list();
  }

  async setResultCancel(event: Boolean) {
    UturuncoUtils.showToas('Operación cancelada', 'info');
  }

  setResult(event: any) {
    this.cancel();
  }

  evento(event: Boolean) {
    UturuncoUtils.showToas('Se creo correctamente', 'success');
    this.cerrar.nativeElement.click();
    //this.fil.list();
  }

  linkear(id?: Number) {
    this.router.navigateByUrl(this.entidad + '/abm/' + id);
  }
  linkeardiagnostico() {
    this.router.navigateByUrl(this.diagnostico + '/abm');
  }

  colores(item: ComIngresoEquipo) {
    let color = '';

    if (item.id == undefined) {
      color = 't-success';
    } else {
      color = 't-default';
    }

    return color;
  }

  colores1(valor: any) {
    let color = '';
    switch (valor) {
      case 1:
        color = 't-success';
        break;
      case 11:
        color = 't-light';
        break;
      case 10:
        color = 't-violeta';
        break;
      case 8:
        color = 't-danger';
        break;
      case 9:
        color = 't-warning';
        break;
      default:
        color = 't-default';
        break;
    }
    return color;
  }

  async doEditEntrega1() {
    try {
      this.procesando = true;
      console.log('itm', this.item);
      const res = await this.wsdl.doUpdate(this.item, this.item.id).then();
      const result = JSON.parse(JSON.stringify(res));
      if (result.status == 200) {
        UturuncoUtils.showToas('Se actualizó correctamente', 'success');
        this.finalizado.emit(true);
        this.back();
        this.cerrar1.nativeElement.click();
      } else if (result.status == 666) {
        // logout app o refresh token
      } else {
        UturuncoUtils.showToas(result.msg, 'error');
      }
    } catch (error: any) {
      UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
      console.log('error', error);
    } finally {
      this.procesando = false;
    }
  }

  select(item: ComIngresoEquipo) {
    this.item = new ComIngresoEquipo();
    this.item = item;
  }

  async exportTableToExcel(tableID: any, filename = '') {
    this.exportar = true;
    await UturuncoUtils.delay(300);
    await UturuncoUtils.exportTableToExcel(tableID, filename).then();

    this.exportar = false;
  }

  back() {
    this.router.navigateByUrl(this.entity);
  }

  scroll(value: any[]) {
    console.log('valor', value);
    const valor = '';
    if (value.length > 5) {
      const valor = 'table-responsive';
      return valor;
    } else {
      return console.log('no hay mas de 10');
    }
  }
}
