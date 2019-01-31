import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

 
  constructor(private authService: AuthService) { }

  ngOnInit() {}

  getUserName(): string {
    return this.authService.getUSer().nombre;
  }

}
