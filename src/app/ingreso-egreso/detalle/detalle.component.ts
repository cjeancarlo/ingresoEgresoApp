import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';

import { IngresoEgresoService } from '../ingreso-egreso.service';
import * as fromIngresoEgresoReducer from '../ingreso-egreso.reducers';

import Swal from 'sweetalert2';
import { BeginLoadingAction, EndLoadingAction } from '../../shared/ui.actions';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

     itemsIE: IngresoEgreso[];
     subs:   Subscription  = new  Subscription;


  constructor(private store: Store<fromIngresoEgresoReducer.IngresoEgresoAppState>,
    private ingresoEgresoService: IngresoEgresoService) {
        this.store.dispatch(new BeginLoadingAction  ());
   }

  ngOnInit() {

    this.subs = this.store.select('ingresoEgreso')
    .subscribe( items => {
      console.log(items);
      this.itemsIE = items.itemsIngresoEgreso;

    });
  }

  eliminarIngresoEgreso( uid: string ) {

    this.ingresoEgresoService.deleteIngresoEgreso( uid ).then( () => {

      Swal.fire({
        title: 'Registro Eliminado!',
        text:   `registro ${ uid }   ` ,
        type: 'info',
        confirmButtonText: 'Ok'
      });
    }

    );

}


  ngOnDestroy(): void {
    this.subs.unsubscribe();

  }


}
