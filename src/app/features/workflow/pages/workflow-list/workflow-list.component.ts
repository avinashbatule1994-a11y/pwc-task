// import { Component, ChangeDetectionStrategy } from '@angular/core';
// import { WorkflowService } from '../../services/workflow.service';

// @Component({
//   selector: 'app-workflow-list',
//   templateUrl: './workflow-list.component.html',
//   styleUrls: ['./workflow-list.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class WorkflowListComponent {

//   workflows$ = this.workflowService.workflows$;

//   constructor(private workflowService: WorkflowService) {}

//   trackById(_: number, item: any) {
//     return item.id;
//   }

//   delete(id: number) {
//     this.workflowService.delete(id);
//   }
// }
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface Workflow {
  id: number;
  name: string;
  status: 'Draft' | 'In Review' | 'Approved' | 'Rejected';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
}

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.scss']
})
export class WorkflowListComponent {

  displayedColumns = ['name', 'status', 'priority', 'dueDate', 'actions'];

  dataSource = new MatTableDataSource<Workflow>([
    {
      id: 1,
      name: 'Vendor Onboarding',
      status: 'In Review',
      priority: 'Medium',
      dueDate: '2026-02-05'
    },
    {
      id: 2,
      name: 'Purchase Approval',
      status: 'Approved',
      priority: 'High',
      dueDate: '2026-02-01'
    },
    {
      id: 3,
      name: 'Security Review',
      status: 'Draft',
      priority: 'Medium',
      dueDate: '2026-02-12'
    },
    {
      id: 4,
      name: 'Budget Reforecast',
      status: 'Rejected',
      priority: 'High',
      dueDate: '2026-02-04'
    }
  ]);

  applySearch(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }


  filterStatus(status: string) {
    this.dataSource.filterPredicate = (data) =>
      status ? data.status === status : true;

    this.dataSource.filter = status;
  }

  create() {
    alert('Create clicked');
  }

  edit(row: Workflow) {
    alert(`Edit: ${row.name}`);
  }

  delete(row: Workflow) {
    alert(`Delete: ${row.name}`);
  }

  approve(row: Workflow) {
    alert(`Approve: ${row.name}`);
  }
}
