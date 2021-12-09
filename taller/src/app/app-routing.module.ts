import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/compartido/login/login.component';
import { ReporteExternoComponent } from './pages/componentes/reporte-externo/reporte-externo.component';
import { ReporteMovilesComponent } from './pages/componentes/reporte-moviles/reporte-moviles.component';
import { AbmReporteMovilComponent } from './pages/frm-abm/abm-reporte-movil/abm-reporte-movil.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  // {
  //   path: 'reporte-movil',
  //   children: [
  //     {
  //       path: '',
  //       component: ReporteMovilesComponent,
  //     },
  //   ],
  // },
  {
    path: 'reporte-externo',
    children: [
      {
        path: '',
        component: ReporteExternoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
