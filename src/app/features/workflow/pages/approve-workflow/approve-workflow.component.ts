
import { Component } from '@angular/core';
import { WorkflowService } from '../../services/workflow.service';
import { Workflow } from '../../models/workflow.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-approve-workflow',
  templateUrl: './approve-workflow.component.html'
})
export class ApproveWorkflowComponent {

  /**
   * Subscribe using async pipe
   */
  workflows$: Observable<Workflow[]> =
    this.workflowService.workflows$;

  /**
   * Columns must MATCH template definitions
   */
  displayedColumns: string[] = [
    'name',
    'status',
    'priority',
    'dueDate',
    'actions'
  ];

  constructor(private workflowService: WorkflowService) {}

  approve(id: number): void {
    this.workflowService.approve(id);
  }

  reject(id: number): void {
    this.workflowService.reject(id);
  }

  pending(id: number): void {
    this.workflowService.pending(id);
  }

  draft(id: number): void {
    this.workflowService.draft(id);
  }
}
