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
    <div>
      <h1>{{ pageTitle }}</h1>
      <pm-products></pm-products>
    </div>
  `,
})

// creating the class of the component to support the view
// name of the class is also the name of the entire component
// export keyword makes the class importable by other parts of the app
export class AppComponent {
  pageTitle: string = 'Acme Product Management';
}
