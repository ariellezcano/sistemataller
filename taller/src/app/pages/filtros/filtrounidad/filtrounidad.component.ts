import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Unidad } from 'src/app/modelo/index.models';
import { UnidadService } from 'src/app/servicio/index.service';


@Component({
  selector: 'app-filtrounidad',
  templateUrl: './filtrounidad.component.html',
  styleUrls: ['./filtrounidad.component.scss']
})

export class FiltrounidadComponent implements OnInit {
  @Output()
  resultado = new EventEmitter<Unidad>();

  @Input()
  set dibujar(item: Unidad){
    this.item = item
    this.items = [];
    this.items.push(this.item);
  }

  criterio!: string;

  items!: Unidad[];
  item!: Unidad;

  constructor(private wsdl: UnidadService) { }

  ngOnInit() {
    this.items = []
  }

  compareFnUni(c1: Unidad, c2: Unidad): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  seleccionaruni(event: Unidad) {
    this.resultado.emit(event);

  }

  async buscarUnidad() {
    const crit = "(c.nombre like '%" + this.criterio + "%') AND c.activo=true";
    let data = await this.wsdl.doCriteria(crit, false, null, " ORDER BY c.nombre ASC", 1, 100).then();

    const result = JSON.parse(JSON.stringify(data));
    
    if (result.status === 200) {
      this.items = result.data;
      if (this.items.length == 1){
        this.item = this.items[0];
        this.resultado.emit(this.item)
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
