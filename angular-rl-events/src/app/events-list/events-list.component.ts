import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent implements OnInit {
  events: any;
  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.eventsService
      .getEvents()
      .subscribe((events) => (this.events = events));
  }
}
