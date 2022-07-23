import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventsListComponent } from './events-list/events-list.component';
import { CanDeactivateCreateEventGuard } from './guards/can-deactivate-create-event.guard';
import { EventGuard } from './guards/event.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'events',
    component: EventsListComponent,
  },
  {
    path: 'events/new',
    component: EventCreateComponent,
    canDeactivate: [CanDeactivateCreateEventGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'events/:id',
    component: EventDetailsComponent,
    canActivate: [EventGuard],
  },

  { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: 'events', pathMatch: 'full' },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
