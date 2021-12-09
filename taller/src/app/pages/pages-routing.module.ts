import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { TableroAreaComponent } from './componentes/tablero-area/tablero-area.component';
import { AbmIngresoEquipoComponent } from './frm-abm/abm-ingreso-equipo/abm-ingreso-equipo.component';
import { AbmReporteExternoComponent } from './frm-abm/abm-reporte-externo/abm-reporte-externo.component';
import { AbmReporteMovilComponent } from './frm-abm/abm-reporte-movil/abm-reporte-movil.component';
import { LstComunicacionesComponent } from './lst/lst-comunicaciones/lst-comunicaciones.component';
import { LstEquiposComponent } from './lst/lst-equipos/lst-equipos.component';
import { LstImpresorasComponent } from './lst/lst-impresoras/lst-impresoras.component';
import { LstInformaticaComponent } from './lst/lst-informatica/lst-informatica.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'principal', component: PrincipalComponent },
      { path: 'areas', component: TableroAreaComponent },
      {
        path: 'lst-equipos',
        children: [
          {
            path: 'abm/:id',
            component: AbmIngresoEquipoComponent,
          },
          {
            path: '',
            component: LstEquiposComponent,
          },
        ],
      },
      {
        path: 'lst-comunicaciones',
        children: [
          {
            path: '',
            component: LstComunicacionesComponent,
          },
        ],
      },
      {
        path: 'lst-informatica',
        children: [
          {
            path: '',
            component: LstInformaticaComponent,
          },
        ],
      },
      {
        path: 'lst-impresora',
        children: [
          {
            path: '',
            component: LstImpresorasComponent,
          },
        ],
      },
      {
        path: 'reporte',
        children: [
          {
            path: 'abm',
            component: AbmReporteMovilComponent,
          },
        ],
      },
      {
        path: 'servicio-externo',
        children: [
          {
            path: 'abm',
            component: AbmReporteExternoComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
