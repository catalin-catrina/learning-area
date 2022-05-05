// app's root angular module

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';

// we idenfity the class as an angular module by attaching the NgModule decorator and passing in metadata defining the details of this angular module
@NgModule({
  // define which components belong to this module so that Angular can locate their selectors
  // everything we declare must be imported
  declarations: [AppComponent, ProductListComponent],
  // define external modules we want available to all components that belong to this angular module (angular modules, 3rd party, or our own / custom)
  // here we import BrowserModule which every browser app must import
  imports: [BrowserModule],
  // start up component of the app; the start up component should contain the selector we use in the index.html file
  // bootswtrap here lists AppComponent as the startup component for our app
  bootstrap: [AppComponent],
})
// we define the angular module using a class
export class AppModule {}
