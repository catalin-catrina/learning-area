import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './events-list.component.html',
})
export class EventsListcomponent implements OnInit {
  showPractice = false; // true to show practice component
  myName: string = 'Catalin';
  events: any;

  constructor(
    private eventService: EventService,
    private toastr: ToastrService,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): any {
    // we don't need to subscribe to the service to get the data anymore because we do it in our resolver (so that the page only loads when we got all data). the data is on the route now so we need to get it from there.
    // this.eventService.getEvents().subscribe((events) => (this.events = events));

    // what we pass into activatedRoute.snapshot.data[], in this case, 'events', needs to match the name we gave the data in our route
    this.events = this.activatedroute.snapshot.data['events'];
  }

  handleThumbnailClick(eventName: string) {
    this.toastr.success(eventName);
  }

  parentResponse(event: number): void {
    console.log(
      `Hi to you too, child component! I received the value you passed to me: ${event}`
    );
  }
}
