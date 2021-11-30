import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntregaEquipoUnidades, Equipo } from 'src/app/modelo/index.models';
import { EntregaEquipoUnidadService } from 'src/app/servicio/componentes/entrega-equipo-unidad.service';
import { EquipoService } from 'src/app/servicio/index.service';

@Component({
  selector: 'app-fil-entrega-unidad',
  templateUrl: './fil-entrega-unidad.component.html',
  styleUrls: ['./fil-entrega-unidad.component.scss'],
})
export class FilEntregaUnidadComponent implements OnInit {
  @Output()
  resultado = new EventEmitter<EntregaEquipoUnidades>();

  criterio!: string;

  items!: EntregaEquipoUnidades[];
  item!: EntregaEquipoUnidades;

  @Input()
  set dibujar(item: Equipo) {
    this.criterio = '';
    this.item = new EntregaEquipoUnidades();
    this.item.equipo = item;
    this.items = [];
    if (item.id != undefined) {
      this.items.push(this.item);
    }
  }

  constructor(private wsdl: EntregaEquipoUnidadService) {}

  ngOnInit() {
    this.items = [];
  }

  compareFnEq(c1: EntregaEquipoUnidades, c2: EntregaEquipoUnidades): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  seleccionar(event: EntregaEquipoUnidades) {
    this.resultado.emit(event);
  }

  async buscar() {
    const crit =
      "(c.equipo.nroSerie like '%" + this.criterio + "%') AND c.activo=true";
    let data = await this.wsdl
      .doCriteria(
        crit,
        false,
        null,
        ' ORDER BY c.equipo.modelo.nombre ASC',
        1,
        100
      )
      .then();

    const result = JSON.parse(JSON.stringify(data));

    if (result.status === 200) {
      this.items = result.data;
      if (this.items.length == 1) {
        this.item = this.items[0];
        this.resultado.emit(this.item);
      }
    } else if (result.status === 666) {
      // logout app o refresh token
      this.items = [];
    } else {
      //  this.persona = new Persona();
      this.items = [];
    }
    //  this.resultado.emit(this.items);
  }
}
