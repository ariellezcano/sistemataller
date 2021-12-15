import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Diagnosticos, DiagnosticosEquipo } from 'src/app/modelo/index.models';
import {
  DiagnosticoEquipoService,
  DiagnosticoService,
} from 'src/app/servicio/index.service';

@Component({
  selector: 'app-combo-diagnostico-equipo',
  templateUrl: './combo-diagnostico-equipo.component.html',
  styleUrls: ['./combo-diagnostico-equipo.component.scss'],
})
export class ComboDiagnosticoEquipoComponent implements OnInit {
  @Input()
  set dibujar(item: Diagnosticos) {
    this.item = item;
  }

  item: Diagnosticos;
  items: Diagnosticos[];
  @Output()
  emity: EventEmitter<Diagnosticos> = new EventEmitter<Diagnosticos>();
  @Output()
  opcionseleccionada!: Diagnosticos;

  constructor(private wsdl: DiagnosticoService) {
    this.item = new Diagnosticos();
    this.items = [];
    this.listar();
    // this.opcionseleccionada = "";
  }

  ngOnInit(): void {
    this.listar();
  }
  //captura el dato del combo

  capturar(event: Diagnosticos) {
    this.item = event;
    //Swal.fire(event.nombre)
    //console.log(event.nombre)
    this.emity.emit(this.item);
  }

  compareFnDiag(c1: Diagnosticos, c2: Diagnosticos): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  listar() {
    this.wsdl.getList(1, 100).then((data: any) => {
      this.items = data.data;
      this.items.sort((x: any, y: any) => {
        if (x.nombre > y.nombre) {
          return 1;
        }
        if (x.nombre < y.nombre) {
          return -1;
        }
        return 0;
      });
    });
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
}
