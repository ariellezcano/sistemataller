import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { AbmIngresoEquipoComponent } from './frm-abm/abm-ingreso-equipo/abm-ingreso-equipo.component';
import { LstEquiposComponent } from './lst/lst-equipos/lst-equipos.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'principal', component: PrincipalComponent },
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
