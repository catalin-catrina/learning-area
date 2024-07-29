import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HigherOrderMappingOperatorsComponent } from "./higher-order-mapping-operators/higher-order-mapping-operators.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HigherOrderMappingOperatorsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rxjs-studies';
}
