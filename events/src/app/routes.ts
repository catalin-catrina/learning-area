import { Routes } from '@angular/router';
import { Error404Component } from './errors/error-404/error-404.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { EventsListcomponent } from './events/events-list.component';
import { EventRouteActivatorService } from './shared/event-route-activator.service';
import { EventsListResolverService } from './shared/events-list-resolver.service';

export const appRoutes: Routes = [
  {
    path: 'events',
    component: EventsListcomponent,
    // translates to: "before resolving this route, call this EventsListResolverService, and when that resolver finishes and returns you some data, add this data to the route as a property called events"
    resolve: { events: EventsListResolverService },
  },
  {
    path: 'events/new',
    component: CreateEventComponent,
    canDeactivate: ['canDeactivateCreateEvent'],
  },
  {
    path: 'events/:id',
    component: EventDetailsComponent,
    canActivate: [EventRouteActivatorService],
  },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  // this says: when the route starts with /user, load the UserModule (then((m) => m.UserModule) from this path (import('./user/user.module'))
  // loading the user.module using a dynamic import. dynamic imports return a promise that contains the module to be imported, and we need to return the UserModule class from that import, so we add .then, and that contains the imported module, and from that module we return the UserModule class.
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
];
