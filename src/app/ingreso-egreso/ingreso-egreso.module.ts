import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdenPipe } from './pipe/orden.pipe';


// charts
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    EstadisticaComponent,
    DetalleComponent,
                  IngresoEgresoComponent,
                  OrdenPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule
  ]
})
export class IngresoEgresoModule { }
