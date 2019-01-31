import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';

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

  ChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  subs  = new  Subscription;

  constructor(private store: Store<AppState>) {

   }

  ngOnInit() {

    this.subs = this.store.select('ui').subscribe(ui =>  {
      this.cargando = ui.isLoading;
      console.log(this.cargando);
    } );

    this.subs = this.store.select('ingresoEgreso').subscribe( items => {
          this.calculateIE( items.itemsIngresoEgreso );
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
      }

}
