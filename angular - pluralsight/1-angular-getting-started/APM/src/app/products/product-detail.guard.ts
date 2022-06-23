import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

// adding a guard using cli:
// ng g g products/product-detail

// since a guard is a service, it needs to be registered with an angular injector
// the cli registers this guard with the root application injector using the providedIn property, it implements the CanActivate interface and builds the start of the canActivate method
// the canActivate() method has two parameters:
// ActivatedRouteSnapshot to provide current route information
// RouterStateSnapshot to provide router state information
// the canActivate() method can return an Observable, a Promise, or a simple boolean value

// the cli does everything, all we need is to write the logic for the guard
// basically we need to check route URL and ensure the ID passed in is valid
// if not valid we navigate back to Product List page

@Injectable({
  providedIn: 'root',
})
export class ProductDetailGuard implements CanActivate {
  // navigation requires the router, so the first thing we need is a constructor, and inject in the Router
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // in the canActivate method we need to read the parameter from the route
    // canActivate has a parameter that gives us the ActivatedRouteSnapshot which contains info about a route at any particular momment in time
    const id = Number(route.paramMap.get('id'));
    if (isNaN(id) || id < 1) {
      alert('Invalid product id');
      // activate a route with code and route to Product List page
      this.router.navigate(['/products']);
      return false;
    }
    return true;
  }
}
