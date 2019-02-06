import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService,
              private ingresoEgresoService: IngresoEgresoService,
              private router: Router  ) { }

  ngOnInit() { }

  getUserName(): string {
    return this.authService.getUSer().nombre;
  }

  getUserEmail(): string {
    return this.authService.getUSer().email;
  }

  logout( ) {
      this.ingresoEgresoService.cancelSubcription();
      this.authService.logout();
      this.router.navigate(['/login']);

    }

}
