// app's root angular module

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// we need to import FormsModule in order to use ngModel in the filter by input tag
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarComponent } from './shared/star.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './products/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './products/product-detail.guard';
import { ProductModule } from './products/product.module';

// we idenfity the class as an angular module by attaching the NgModule decorator and passing in metadata defining the details of this angular module
@NgModule({
  // define which components belong to this module so that Angular can locate their selectors
  // everything we declare must be imported
  declarations: [
    AppComponent,
    WelcomeComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent,
    ProductDetailComponent,
  ],
  // define external modules we want available to all components that belong to this angular module (angular modules, 3rd party, or our own / custom)
  // BrowserModule must be imported by every web app
  // RouterModule registers the router service provider, declares the router's directives and exposes the configured routes
  // RouterModule knows about our configured routes by passing them into the RouterModule by calling the forRoot() method. We configure the routes in the forRoot() method by passing in an array
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // 2. second step to do routing in an app is to add RouterModule to an Angular module imports array, then add each route to the array passed to the RouterModule's forRoot() method, and remember that order matters. the router will pick the first route that matches.
    // each route definition requires a path which defines the url path segment for the route
    // empty path '' == default route; '**' == wildcard route
    // most route definitions also include a component which is a reference to the component itself (its not a string and its not in "")
    RouterModule.forRoot([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        // hooking up the product detail guard to the appropiate route
        // we add the canActivate property to the route definition for the ProductDetailComponent and set it to an array
        // in the array we specify each guard we want to execute when activating the route
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent,
      },
      { path: 'welcome', component: WelcomeComponent },
      // '' is a default path and is triggered when the app loads
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      // ** is a wildcard path and is triggered when the url does not match any paths defined here in the configuration. often used for displaying a 404 not found page
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
    ]),
    ProductModule,
  ],
  // start up component of the app; the start up component should contain the selector we use in the index.html file
  // bootstrap here lists AppComponent as the startup component for our app
  bootstrap: [AppComponent],
})
// we define the angular module using a class
export class AppModule {}
