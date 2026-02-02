import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/features/workflow/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {

  private url = '/assets/mock/user.json';

  constructor(private http: HttpClient) {}

  // 🔹 Get users (JSON + localStorage merged)
  getUsers(): Observable<User[]> {
    const localUsers = this.getStoredUsers();

    // If local users exist, return them
    if (localUsers.length) {
      return of(localUsers);
    }

    // Else load from JSON and cache
    return this.http.get<User[]>(this.url).pipe(
      tap(users => localStorage.setItem('users', JSON.stringify(users)))
    );
  }

  // 🔹 Signup logic
  createUser(user: User): void {
    const users = this.getStoredUsers();

    if (users.some(u => u.email === user.email)) {
      alert('User already exists');
      return;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  private getStoredUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
}
