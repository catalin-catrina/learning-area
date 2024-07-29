import { Component, OnInit } from '@angular/core';
import { concatMap, delay, mergeMap, of, range, switchMap } from 'rxjs';

@Component({
  selector: 'app-higher-order-mapping-operators',
  standalone: true,
  imports: [],
  templateUrl: './higher-order-mapping-operators.component.html',
  styleUrl: './higher-order-mapping-operators.component.css',
})
export class HigherOrderMappingOperatorsComponent implements OnInit {
  ngOnInit(): void {
    range(1, 5)
      .pipe(concatMap((i) => of(i).pipe(delay(this.randomDelay()))))
      .subscribe((v) => console.log('concatMap:', v));

    range(11, 5)
      .pipe(mergeMap((i) => of(i).pipe(delay(this.randomDelay()))))
      .subscribe((v) => console.log('mergeMap:', v));

    range(21, 5)
      .pipe(switchMap((i) => of(i).pipe(delay(this.randomDelay()))))
      .subscribe((v) => console.log('mergeMap:', v));
  }

  randomDelay() {
    return Math.floor(Math.random() * 1000) + 500;
  }
}
