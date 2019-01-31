import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  itemsIE: IngresoEgreso[];
  subitemsIE = new Subscription;
  constructor( private store: Store<AppState> , 
    private ingresoEgresoService:IngresoEgresoService) { }

  ngOnInit() {
    this.store.select('ingresoEgreso')
    .subscribe( ingresoEgreso =>  {
        this.itemsIE = ingresoEgreso.itemsIngresoEgreso;
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

  ngOnDestroy () {
      this.subitemsIE.unsubscribe();
  }

}
