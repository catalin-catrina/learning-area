import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [BrowserModule, RouterModule, RoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
