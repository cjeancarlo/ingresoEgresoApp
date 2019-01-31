import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { BeginLoadingAction, EndLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

  forma: FormGroup;
  tipo = 'ingreso';
  cargando: boolean;
  private subs: Subscription = new Subscription;

  constructor( private ingresoEgresoService: IngresoEgresoService,
               private store: Store<AppState>) { }

  ngOnInit() {

    this.store.select('ui').subscribe( ui => {
        this.cargando = ui.isLoading;
    });

    this.forma = new FormGroup({
      'descripcion':  new FormControl('', Validators.required),
      'monto':  new FormControl(0, Validators.min(1)),
    });
  }

  crearIngresoEgreso() {

    this.store.dispatch( new BeginLoadingAction() );

    const ingresoEgresoObj = new IngresoEgreso({
    ...this.forma.value, tipo: this.tipo
  } );

  this.ingresoEgresoService.createIngresoEgreso(ingresoEgresoObj)
  .then( () => {


      Swal.fire({
        title: `registro de ${this.tipo} creado`,
        text: `Descripción ${ingresoEgresoObj.descripcion} `,
        type: 'success',
        confirmButtonText: 'Ok'
      });

      this.forma.reset({
        monto: 1
      });

      this.store.dispatch( new EndLoadingAction() );
  });
    // console.log(ingresoEgresoObj);
  }

}
