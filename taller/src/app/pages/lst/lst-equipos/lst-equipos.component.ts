import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntregaEquipoUnidades } from 'src/app/modelo/index.models';
import { EntregaEquipoUnidadService } from 'src/app/servicio/componentes/entrega-equipo-unidad.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lst-equipos',
  templateUrl: './lst-equipos.component.html',
  styleUrls: ['./lst-equipos.component.scss'],
})
export class LstEquiposComponent implements OnInit {
  // @ViewChild(FilEquipoComponent, { static: true })
  //fil!: FilEquipoComponent;
  @ViewChild('close')
  cerrar!: ElementRef;

  exportar: boolean = false;
  items: EntregaEquipoUnidades[];
  item: EntregaEquipoUnidades;

  procesando!: Boolean;
  public load!: boolean;

  entidad = 'principal/equipo';
  constructor(
    private wsdl: EntregaEquipoUnidadService,
    private router: Router
  ) {
    this.load = false;
    this.item = new EntregaEquipoUnidades();
    this.items = [];
  }

  ngOnInit(): void {}

  preDelete(item: EntregaEquipoUnidades) {
    this.item = new EntregaEquipoUnidades();
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

  cancel() {
    this.item = new EntregaEquipoUnidades();
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

  colores(valor: any) {
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

  async exportTableToExcel(tableID: any, filename = '') {
    this.exportar = true;
    await UturuncoUtils.delay(300);
    await UturuncoUtils.exportTableToExcel(tableID, filename).then();

    this.exportar = false;
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
