import { Component, ChangeDetectionStrategy } from '@angular/core';
import { WorkflowService } from '../../services/workflow.service';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkflowListComponent {

  workflows$ = this.workflowService.workflows$;

  constructor(private workflowService: WorkflowService) {}

  trackById(_: number, item: any) {
    return item.id;
  }

  delete(id: number) {
    this.workflowService.delete(id);
  }
}
