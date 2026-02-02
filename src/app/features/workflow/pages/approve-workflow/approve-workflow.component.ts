// import { Component, ChangeDetectionStrategy } from '@angular/core';

// @Component({
//   selector: 'app-approve-workflow',
//   templateUrl: './approve-workflow.component.html',
//   styleUrls: ['./approve-workflow.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class ApproveWorkflowComponent {

//   approve() {
//     alert('Workflow Approved');
//   }

//   reject() {
//     alert('Workflow Rejected');
//   }
// }
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { WorkflowService } from '../../services/workflow.service';
import { Workflow } from '../../models/workflow.model';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-approve-workflow',
  templateUrl: './approve-workflow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApproveWorkflowComponent {

  workflows$ = this.workflowService.workflows$;

  constructor(
    private workflowService: WorkflowService,
    private auth: AuthService
  ) {}

  approve(workflow: Workflow) {
    const user = this.auth.currentUser;

    if (!user || !['ADMIN', 'MANAGER'].includes(user.role)) {
      alert('Not authorized');
      return;
    }

    this.workflowService.update({
      ...workflow,
      status: 'Approved'
    });
  }

  reject(workflow: Workflow) {
    this.workflowService.update({
      ...workflow,
      status: 'Rejected'
    });
  }
}
