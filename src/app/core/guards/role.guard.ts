import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { UserRole } from "src/app/models/user.model";

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles = route.data['roles'] as UserRole[];

    if (!allowedRoles.includes(this.auth.currentUser!.role)) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
