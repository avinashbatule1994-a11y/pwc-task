import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/features/workflow/models/user.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {
  user$: Observable<User | null>;

  constructor(private auth: AuthService) {
    this.user$ = this.auth.user$;
  }

  logout() {
    this.auth.logout();
  }
}
