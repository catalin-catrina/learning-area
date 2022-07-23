import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { EventCreateComponent } from '../event-create/event-create.component';

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateCreateEventGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: EventCreateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component.isDirty) {
      return window.confirm(
        'You have not saved this event, are you sure you want to quit?'
      );
    }
    return false;
  }
}
