import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { FootbarComponent } from './footbar/footbar.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [SidebarComponent, FootbarComponent, NavbarComponent ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ SidebarComponent, FootbarComponent, NavbarComponent ]
})
export class SharedModule { }
