import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root',
})
export class EventsListResolverService implements Resolve<any> {
  constructor(private eventService: EventService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // we first call getEvents() which returns an observable, and then we call map on that observable, which gives us access to the events that are passed in on that stream, and then we just return those events
    // its just a very basic implementation, we're receiving events into this function and then returning them right back out as they were - does not do anything, demonstration purposes only
    // typically when listening to an observable you call subscribe() on it, but because this is in a Resolver, we need to actually return the observable to Angular, so that Angular can watch the observable and see when it finishes. If we were to call subscribe, the value that would be returned would not be the/an observable, subscribe() returns a subscription, not an observable, so we use map() which does kind of the same thing as subscribe() in this case AND it also returns the observable
    return this.eventService.getEvents().pipe(map((events) => events));
  }
}
