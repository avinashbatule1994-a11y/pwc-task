// // import { Component, ChangeDetectionStrategy } from '@angular/core';
// // import { WorkflowService } from '../../services/workflow.service';
// // import { Workflow } from '../../models/workflow.model';

// // @Component({
// //   selector: 'app-approve-workflow',
// //   templateUrl: './approve-workflow.component.html',
// //   changeDetection: ChangeDetectionStrategy.OnPush
// // })
// // export class ApproveWorkflowComponent {

// //   workflows$ = this.workflowService.workflows$;

// //   constructor(private workflowService: WorkflowService) {}

// //   approve(workflow: Workflow) {
// //     this.workflowService.approve(workflow.id);
// //   }

// //   reject(workflow: Workflow) {
// //     this.workflowService.reject(workflow.id);
// //   }
// // }
// import { Component, ChangeDetectionStrategy } from '@angular/core';
// import { WorkflowService } from '../../services/workflow.service';

// @Component({
//   selector: 'app-approve-workflow',
//   templateUrl: './approve-workflow.component.html',
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class ApproveWorkflowComponent {
//   workflows$ = this.workflowService.workflows$;

//   constructor(private workflowService: WorkflowService) {}

//   approve(id: number) {
//     this.workflowService.approve(id);
//   }

//   reject(id: number) {
//     this.workflowService.reject(id);
//   }
// }
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
}
