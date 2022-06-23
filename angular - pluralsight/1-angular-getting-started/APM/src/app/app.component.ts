// this file defines an angular component called AppComponent
// a component includes a class and a decorator.

// import Component decorator from the angular/core library
import { Component } from '@angular/core';

// define the Component decorator (template and metadata)
@Component({
  // pm = our product management application (identifier as part of the app, pm because used when created project with angular/cli)
  // root = root app component (name that represents this component)
  // selector is the name of the component when we use the directive (custom element) in the HTML
  // in HTML we use <pm-root></pm-root>
  selector: 'pm-root',
  // template is the view's HTML
  template: `
    <nav class="navbar navbar-expand navbar-light bg-light">
      <a class="navbar-brand">{{ pageTitle }}</a>
      <ul class="nav nav-pills">
        <!-- 3. once we have the routes configured, we tie those routes to actions. first we identify which actions to tie to which routes, then we add the routerLink directive as an attribute to any clickable element in a component's template.
        - enclose routerLink in square brackets and bind it to a link parameters array. the first element of the link parameters array is the route's path, all other elements are values for the route parameters
        - use the RouterOutlet (router-outlet) directive to identify where to display the routed component's view. this is most often specified in the host component template
        - when a route is activated, the route component's view is displayed at the location of the <router-outlet>
      -->
        <li><a class="nav-link" [routerLink]="['/welcome']">Home</a></li>
        <li><a class="nav-link" routerLink="/products">Product List</a></li>
      </ul>
    </nav>
    <div class="container">
      <!-- when the app launches, the default route is activated so the welcome view displays -->
      <!-- when we click on Product List the routerLink directive now activates the ProductList route so the ProductList view appears -->
      <router-outlet></router-outlet>
    </div>
  `,
})

// creating the class of the component to support the view
// name of the class is also the name of the entire component
// export keyword makes the class importable by other parts of the app
export class AppComponent {
  pageTitle: string = 'Acme Product Management';
}
