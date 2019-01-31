import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

import { filter, map } from 'rxjs/operators';
import { SetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';
import { BeginLoadingAction, EndLoadingAction } from '../shared/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService  {

  private subInitIngresoEgresoListener: Subscription = new Subscription;
  private subIngresoEgresoItem: Subscription = new Subscription;

  constructor( private afDb: AngularFirestore , private authService: AuthService, private store:Store<AppState> ) { }


  createIngresoEgreso(ingresoEgreso: IngresoEgreso): Promise<any> {
    return this.afDb.doc(`${this.authService.getUSer().uid}/ingresos-egresos`)
      .collection('items').add({ ...ingresoEgreso });
  }


  deleteIngresoEgreso(uid: string): Promise<any> {
    return this.afDb.doc
    (`${this.authService.getUSer().uid}/ingresos-egresos/items/${uid}`)
      .delete();
  }

  initIngresoEgresoListener() {
    this.store.select('userAuth')
      .pipe(
        filter(userAuth => userAuth.user !== null)
      )
      .subscribe(userAuth => {
        this.IngresoEgresoItem(userAuth.user.uid);
      });

  }

private IngresoEgresoItem( uid: string) {
 const path = (`${ uid }/ingresos-egresos/items/`);

 this.store.dispatch(new BeginLoadingAction());
 
 this.subInitIngresoEgresoListener =  this.afDb.collection(path)
    .snapshotChanges()
    .pipe(
      map( (docData: Array<DocumentChangeAction<{}>>) => {
            return  docData.map( d => {
              return {
                    uid:  d.payload.doc.id,
                     ...d.payload.doc.data()
                };
            });
        }
      )
    ).subscribe( (data: any[]) => {
      this.store.dispatch(new SetItemsAction(data));
      this.store.dispatch(
        new EndLoadingAction()
      );
  });
  }

  cancelSubcription(): void {
    this.subInitIngresoEgresoListener.unsubscribe();
    this.subIngresoEgresoItem.unsubscribe();
  }

}
