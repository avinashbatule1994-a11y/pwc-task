
// import { Injectable } from "@angular/core";
// import { Router } from "@angular/router";
// import { BehaviorSubject } from "rxjs";
// import { User } from "src/app/features/workflow/models/user.model";

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private userSubject = new BehaviorSubject<User | null>(null);
//   user$ = this.userSubject.asObservable();

//   constructor(private router: Router) {
//     const stored = localStorage.getItem('user');
//     if (stored) {
//       this.userSubject.next(JSON.parse(stored));
//     }
//   }

//   login(user: User) {
//     localStorage.setItem('user', JSON.stringify(user));
//     this.userSubject.next(user);
//   }

//   logout() {
//     localStorage.removeItem('user');
//     this.userSubject.next(null);
//     this.router.navigate(['/auth/login']);
//   }

//   get currentUser(): User | null {
//     return this.userSubject.value;
//   }

//   isLoggedIn(): boolean {
//     return !!this.userSubject.value;
//   }
// }
// core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/features/workflow/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );

  user$ = this.userSubject.asObservable();

  login(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  };
  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  };
  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  };

  get currentUser() {
    return this.userSubject.value;
  }
}
