import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { WgCargandoComponent } from './widgets/wg-cargando/wg-cargando.component';
import { WgPaginateComponent } from './widgets/wg-paginate/wg-paginate.component';
import { LstEquiposComponent } from './lst/lst-equipos/lst-equipos.component';
import { AbmIngresoEquipoComponent } from './frm-abm/abm-ingreso-equipo/abm-ingreso-equipo.component';
import { NavComponent } from './compartido/nav/nav.component';
import { FooterComponent } from './compartido/footer/footer.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { FilPersonaComponent } from './filtros/fil-persona/fil-persona.component';
import { FiltroEquipoComponent } from './filtros/filtro-equipo/filtro-equipo.component';
import { FiltrounidadComponent } from './filtros/filtrounidad/filtrounidad.component';
import { TableroAreaComponent } from './componentes/tablero-area/tablero-area.component';
import { LstComunicacionesComponent } from './lst/lst-comunicaciones/lst-comunicaciones.component';
import { LstInformaticaComponent } from './lst/lst-informatica/lst-informatica.component';
import { LstImpresorasComponent } from './lst/lst-impresoras/lst-impresoras.component';

@NgModule({
  declarations: [
    PagesComponent,
    WgCargandoComponent,
    WgPaginateComponent,
    NavComponent,
    FooterComponent,
    LstEquiposComponent,
    AbmIngresoEquipoComponent,
    PrincipalComponent,
    FilPersonaComponent,
    FiltroEquipoComponent,
    FiltrounidadComponent,
    TableroAreaComponent,
    LstComunicacionesComponent,
    LstInformaticaComponent,
    LstImpresorasComponent,
    //declarar paginas de pages
  ],
  exports: [],
  imports: [BrowserModule, FormsModule, HttpClientModule, PagesRoutingModule],
  providers: [],
  bootstrap: [PagesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
