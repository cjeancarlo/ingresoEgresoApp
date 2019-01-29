import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  private subs: Subscription;
  cargando: boolean;

  constructor( public authService: AuthService, private store: Store<AppState>) { }

  ngOnInit() {
  this.subs =   this.store.select('ui').subscribe(ui =>  this.cargando = ui.isLoading );
  }

  ngOnDestroy(): void {
this.subs.unsubscribe();
  }

  onSubmit(data) {
    this.authService.createUser(data.nombre, data.email, data.password);
    }
  }

 


