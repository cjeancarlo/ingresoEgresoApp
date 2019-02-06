import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as fireB from 'firebase';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { BeginLoadingAction, EndLoadingAction } from '../shared/ui.actions';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { SetUserAction, UnsetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService  {
  private actualUser: User;
  private userSubs =  new  Subscription();

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private afDB: AngularFirestore,
              private store: Store<AppState>) {

  }

  initAuthListener () {
    
    this.userSubs = this.afAuth.authState.subscribe( ( fbUser: fireB.User ) => {
      if (fbUser) {
        this.afDB.doc(`${ fbUser.uid }/usuario`).valueChanges().subscribe(
          (data: any) => {
            const newUser = new User (data);
            this.store.dispatch( new SetUserAction( newUser ) );
            this.actualUser = newUser;
            //  console.log(newUser);
          }
        );

      } /* else  {

        this.actualUser =  null;
        this.userSubs.unsubscribe();

      }*/

    });
  }

 createUser (nombre: string, email: string, password: string) {

  this.store.dispatch( new BeginLoadingAction() );

  this.afAuth.auth
    .createUserWithEmailAndPassword(email, password)
      .then(r => {
        const user: User = {
           uid: r.user.uid,
          nombre: nombre,
          email: email
        };
          this.afDB.doc(`${ user.uid }/usuario` )
          .set(user)
            .then( () => {
              this.store.dispatch( new EndLoadingAction() );
              this.router.navigate(['/']);
        });

        console.log(r);
      })
      .catch(e => {
        this.displayError(e.message);
        console.error(e.message);
      });
}

login(email: string, password: string ) {
  this.store.dispatch( new BeginLoadingAction() );

  this.afAuth.auth.signInWithEmailAndPassword(email,  password).then(
    r => {
          this.store.dispatch( new EndLoadingAction() );
          this.router.navigate(['/']);
    }
  ) .catch(e => {
    this.displayError(e.message);
    console.error(e);
  });
}

logout() {
  this.store.dispatch(new UnsetUserAction());
  this.store.dispatch( new EndLoadingAction());
  this.afAuth.auth.signOut();
 
  this.userSubs.unsubscribe();
  this.router.navigate(['/login']);
  }


  isAuth() {
    return this.afAuth.authState
      .pipe(
        map( (fbUSer) =>  {
            if  (fbUSer === null) {
              this.router.navigate(['/login']);
            };
          return fbUSer !== null;
        }  )
    );
  }

  getUSer() {
        return { ...this.actualUser };
  }
  private displayError(e: string ) {
  Swal.fire({
    title: 'Error!',
    text: e,
    type: 'error',
    confirmButtonText: 'Cool'
  });
  this.store.dispatch( new EndLoadingAction() );
}


}
