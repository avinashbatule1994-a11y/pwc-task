
import { Component } from '@angular/core';
import { WorkflowService } from '../../services/workflow.service';
import { Workflow } from '../../models/workflow.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-approve-workflow',
  templateUrl: './approve-workflow.component.html'
})
export class ApproveWorkflowComponent {

  workflows$: Observable<Workflow[]> =
    this.workflowService.workflows$;

  displayedColumns: string[] = ['name', 'status', 'actions'];

  constructor(private workflowService: WorkflowService) {}

  approve(id: number) {
    this.workflowService.approve(id);
  }

  reject(id: number) {
    this.workflowService.reject(id);
  }
  pending(id:number){
    this.workflowService.pending(id)
  }
  draft(id:number){
    this.workflowService.draft(id)
  }
}
