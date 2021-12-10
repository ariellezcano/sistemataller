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
import { FilEquipoReparacionComponent } from './filtros/fil-equipo-reparacion/fil-equipo-reparacion.component';
import { FilEntregaUnidadComponent } from './filtros/fil-entrega-unidad/fil-entrega-unidad.component';
import { ReporteMovilesComponent } from './componentes/reporte-moviles/reporte-moviles.component';
import { ReporteExternoComponent } from './componentes/reporte-externo/reporte-externo.component';
import { AbmReporteMovilComponent } from './frm-abm/abm-reporte-movil/abm-reporte-movil.component';
import { FilMovilComponent } from './filtros/fil-movil/fil-movil.component';
import { AbmReporteExternoComponent } from './frm-abm/abm-reporte-externo/abm-reporte-externo.component';
import { AbmReparacionEquipoComponent } from './frm-abm/abm-reparacion-equipo/abm-reparacion-equipo.component';
import { AbmDiagnosticoComponent } from './frm-abm/abm-diagnostico/abm-diagnostico.component';
import { AbmDiagnosticoEquipoComponent } from './frm-abm/abm-diagnostico-equipo/abm-diagnostico-equipo.component';

@NgModule({
  declarations: [
    PagesComponent,
    WgCargandoComponent,
    WgPaginateComponent,
    NavComponent,
    FooterComponent,
    PrincipalComponent,
    TableroAreaComponent,
    AbmIngresoEquipoComponent,

    FilPersonaComponent,
    FiltroEquipoComponent,
    FiltrounidadComponent,
    FilEntregaUnidadComponent,
    FilEquipoReparacionComponent,
    FilMovilComponent,

    LstComunicacionesComponent,
    LstInformaticaComponent,
    LstImpresorasComponent,
    LstEquiposComponent,
    ReporteMovilesComponent,
    ReporteExternoComponent,
    AbmReporteMovilComponent,
    AbmReporteExternoComponent,
    AbmReparacionEquipoComponent,
    AbmDiagnosticoComponent,
    AbmDiagnosticoEquipoComponent,

    //declarar paginas de pages
  ],
  exports: [],
  imports: [BrowserModule, FormsModule, HttpClientModule, PagesRoutingModule],
  providers: [],
  bootstrap: [PagesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
