import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ComIngresoEquipo } from 'src/app/modelo/index.models';
import { EquipoIngresoService } from 'src/app/servicio/componentes/equipo-ingreso.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';

@Component({
  selector: 'app-recibo-entrega',
  templateUrl: './recibo-entrega.component.html',
  styleUrls: ['./recibo-entrega.component.scss'],
})
export class ReciboEntregaComponent implements OnInit {
  id!: number;
  aclaracion = '';
  entity = 'lst-equipos';
  v = '';

  @ViewChild('form', { static: false })
  form!: NgForm;

  @Output()
  finalizado = new EventEmitter<Boolean>();

  /* declaracion de la variable tipo marca */
  /* declaracion de la variable tipo marca */

  @Input()
  item!: ComIngresoEquipo;
  router: any;

  /*   wsdl es el servicio que se va a comunicar entre la api y la vista.
   */
  constructor(
    private route: ActivatedRoute,
    private wsdl: EquipoIngresoService
  ) {
    this.route.paramMap.subscribe((p: any) => {
      this.id = p.params.id;
      // this.buscar(this.id);
    });
  }
  // async buscar(id: any) {
  //   let data = await this.wsdl.doFind(id).then();
  //   console.log(data, this.id);
  //   const result = JSON.parse(JSON.stringify(data));
  //   // alert(JSON.stringify(data))
  //   if (result.status === 200) {
  //     this.item = result.data;
  //     if (this.item.movilPol != undefined) {
  //       this.buscarvehiculo(this.item.movilPol);
  //     }
  //   } else if (result.status === 666) {
  //     // logout app o refresh token
  //     this.item = new EntregaEquipoUnidades();
  //   } else {
  //     //  this.persona = new Persona();
  //     this.item = new EntregaEquipoUnidades();
  //   }
  // }

  /**
   * ngOnInit se ejecuta cuando se termina de dibujar la vista
   * y solicita los primeros 100 datos de la tabla de BD
   */
  ngOnInit() {}

  // @Input()
  // set select(item: EntregaEquipoUnidades) {
  //   if (item.id === undefined) {
  //     this.item = new EntregaEquipoUnidades();
  //   } else {
  //     this.item = new EntregaEquipoUnidades();
  //     this.item = item;
  //   }
  // }

  back() {
    this.router.navigateByUrl(this.entity.toLowerCase());
  }
  //impresion de pantalla
  imprimir() {
    window.print();
  }

  devolver(valor: string) {
    return UturuncoUtils.devolucionTE(valor);
  }

  //devuelve movil policial
  // async buscarvehiculo(item: number) {
  //   const crit = 'c.id = ' + item + ' ';
  //   let data = await this.wsdlM
  //     .doCriteria(crit, false, null, 'ORDER BY c.id ASC', 1, 100)
  //     .then();

  //   const result = JSON.parse(JSON.stringify(data));
  //   if (result.status === 200) {
  //     this.v =
  //       ', instalado en el móvil ' +
  //       result.data[0].identificacionPol +
  //       ' Dominio: ' +
  //       result.data[0].dominio;
  //   }
  // }

  fecha(fecha: Date) {
    var fecha_formateada = moment(moment(fecha).toDate())
      .locale('es')
      .format('DD [de] MMMM [del] YYYY');
    return fecha_formateada;
  }

  instrumento(value: any) {
    let valor = '';
    switch (value) {
      case 'PC':
        valor = 'PROVISION CON CARGO';
        break;
      case 'PP':
        valor = 'PRESTAMO PROVISORIO';
        break;
      default:
        valor = 'SIN INSTRUMENTO';
        break;
    }
    return valor;
  }
}
