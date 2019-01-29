import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Router } from '@angular/router';
import * as fireB from 'firebase';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private afDB: AngularFirestore ) { }


 createUser (nombre: string, email: string, password: string) {

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
  this.afAuth.auth.signInWithEmailAndPassword(email,  password).then(
    r => {
        // console.log(r);
          this.router.navigate(['/']);
    }
  ) .catch(e => {
    this.displayError(e.message);
    console.error(e);
  });
}

logout() {
  this.afAuth.auth.signOut();
  this.router.navigate(['/login']);
  }

 initAuthListener () {
    this.afAuth.authState.subscribe( ( fbUser: fireB.User ) => {
      console.log(fbUser);
    });
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


  private displayError(e: string ){
  Swal.fire({
    title: 'Error!',
    text: e,
    type: 'error',
    confirmButtonText: 'Cool'
  });
}
}
