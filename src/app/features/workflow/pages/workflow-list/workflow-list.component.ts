import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkflowListComponent {

  user$: Observable<User | null>;

  constructor(public auth: AuthService) {
    this.user$ = this.auth.user$;
  }

  deleteWorkflow() {
    alert('Workflow deleted');
  }
}
