import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-approve-workflow',
  templateUrl: './approve-workflow.component.html',
  styleUrls: ['./approve-workflow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApproveWorkflowComponent {

  approve() {
    alert('Workflow Approved');
  }

  reject() {
    alert('Workflow Rejected');
  }
}
