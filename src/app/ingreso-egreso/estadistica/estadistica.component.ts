import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';

import * as fromIngresoEgresoReducer from '../ingreso-egreso.reducers';
import { BeginLoadingAction, EndLoadingAction } from '../../shared/ui.actions';



@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {


  ingresos: number;
  egresos: number;

  ctaIngresos: number;
  ctaEgresos: number;

  cargando = true;

  doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  doughnutChartData: number[];

  chartColors = [{
      backgroundColor: ['#28A745', '#DC3545']
    }];

     subs:   Subscription  = new  Subscription;
     subsUi: Subscription  = new  Subscription;

  constructor(private store: Store<fromIngresoEgresoReducer.IngresoEgresoAppState>) {
        this.store.dispatch(new BeginLoadingAction  ());
   }

  ngOnInit() {

    this.subsUi = this.store.select('ui').subscribe(ui =>  {
      this.cargando = ui.isLoading;
      console.log(this.cargando);
    });

    this.subs = this.store.select('ingresoEgreso')
    .subscribe( items => {
      console.log(items);
          this.calculateIE( items.itemsIngresoEgreso );
          this.store.dispatch( new EndLoadingAction() );
    });


  }

  calculateIE( ingresoEgresoArray: IngresoEgreso[] ) {

    this.ingresos  = this.egresos =  this.ctaEgresos = this.ctaIngresos = 0;

    ingresoEgresoArray.forEach(i => {
        if (i.tipo === 'ingreso') {
            this.ingresos += i.monto;
            this.ctaIngresos ++;
        } else {
          this.egresos += i.monto;
            this.ctaEgresos ++;
        }
    });

    this.doughnutChartData = [this.ingresos, this.egresos];

  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.subsUi.unsubscribe();
  }

}

