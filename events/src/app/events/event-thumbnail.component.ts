import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'event-thumbnail',
  template: `
    <div
      [routerLink]="['/events', event.id]"
      class="card"
      style="margin: 20px 20px 20px 0; padding: 20px; min-height: 200px"
    >
      <h2 class="card-title">{{ event.name }}</h2>
      <div>Date: {{ event?.date }}</div>
      <div
        [class.green]="event?.time == '8:00 am'"
        [ngClass]="{
          bold: event?.time == '8:00 am',
          letterSpacing: event?.time == '8:00 am'
        }"
        [ngClass]="getStartTimeClass()"
        [ngStyle]="{ color: event?.time == '10:00 am' ? 'blue' : '' }"
        [ngSwitch]="event?.time"
      >
        Time: {{ event?.time }}
        <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
        <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
        <span *ngSwitchDefault>(Normal Start)</span>
      </div>

      <div>Price: \${{ event?.price }}</div>
      <div *ngIf="event?.location">
        <span>Location: {{ event?.location?.address }}</span>

        <span class="pad-left"
          >{{ event?.location?.city }}, {{ event?.location?.country }}</span
        >
      </div>
      <div *ngIf="event?.onlineUrl">Online URL: {{ event?.onlineUrl }}</div>
    </div>
  `,
  styles: [
    `
      .pad-left {
        margin-left: 10px;
      }

      .card div {
        color: #333;
      }

      .green {
        color: green !important;
      }

      .bold {
        font-weight: 800;
      }

      .letter-spacing {
        letter-spacing: 2px;
      }

      .greyBackground {
        background-color: #eee;
      }
    `,
  ],
})
export class EventThumbnailComponent {
  @Input() event: any;

  getStartTimeClass() {
    let isEarlyTime = this.event && this.event.time == '8:00 am';
    if (isEarlyTime) return { greyBackground: isEarlyTime };
    else return {};
  }
}
