import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  private subs: Subscription;
  cargando: boolean;

  constructor( public authService: AuthService, private store: Store<AppState>) { }

  ngOnInit() {
    this.subs = this.store.select('ui').subscribe(ui =>  this.cargando = ui.isLoading );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
      }
  login( data) {
    this.authService.login(data.email, data.password);

  }

}
