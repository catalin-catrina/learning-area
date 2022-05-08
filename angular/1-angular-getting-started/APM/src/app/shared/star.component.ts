import { Component, OnChanges } from '@angular/core';

@Component({
  selector: 'pm-star',
  // we use relative pathing because both files are in the same folder as the component
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnChanges {
  rating: number = 4;
  cropWidth: number = 75;

  ngOnChanges(): void {
    this.cropWidth = (this.rating * 75) / 5;
  }
}
