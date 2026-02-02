
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserRole } from 'src/app/features/workflow/models/user.model';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles = route.data['roles'] as UserRole[];
    const userRole = this.auth.currentUser?.role;

    return !!userRole && allowedRoles.includes(userRole);
  }
}
