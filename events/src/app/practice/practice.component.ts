import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css'],
})
export class PracticeComponent {
  @Input() showPractice = false;

  @Input() getValueFromParent: any;

  @Output() sendEventToParent = new EventEmitter();
  years: number = 0;

  demo1: string = 'Heineken is by far the best beer';

  demo2(): void {
    console.log('Nope, Staropramen is');
  }

  buttonClicked(): void {
    console.log('Hey parent, button was clicked');
    this.sendEventToParent.emit(this.years);
  }
}
