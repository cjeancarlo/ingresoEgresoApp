import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { IngresoEgresoModule } from '../ingreso-egreso/ingreso-egreso.module';
import { StoreModule } from '@ngrx/store';
import { IngresoEgresoReducer } from '../ingreso-egreso/ingreso-egreso.reducers';


@NgModule({
  declarations: [  DashboardComponent ],
  imports: [
    StoreModule.forFeature('ingresoEgreso', IngresoEgresoReducer),
    CommonModule,
    IngresoEgresoModule,
    SharedModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
