// import { Injectable } from "@angular/core";
// import { AuthService } from "../auth/auth.service";
// import { Observable } from "rxjs";
// import { CanActivate, Router } from "@angular/router";

// @Injectable({providedIn:'root'})
// export class AuthGuard implements CanActivate{
// constructor (private auth:AuthService,private router:Router){}

// canActivate():boolean {
//     if(!this.auth.isLoggedIn()){
//         this.router.navigate(['/auth/login'])
//         return false
//     }
//     return true
// }
// }import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkAuth(state.url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkAuth(state.url);
  }

  private checkAuth(returnUrl: string): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/auth/login'], {
      queryParams: { returnUrl }
    });
    return false;
  }
}
