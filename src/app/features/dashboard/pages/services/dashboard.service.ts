import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { WorkflowService } from 'src/app/features/workflow/services/workflow.service';

@Injectable({ providedIn: 'root' })
export class DashboardService {

  workflows$ = this.workflowService.workflows$;

  /** Status counts */
  statusCounts$ = this.workflows$.pipe(
    map(workflows =>
      workflows.reduce((acc, w) => {
        acc[w.status] = (acc[w.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    )
  );

  /** Overdue workflows */
  overdueWorkflows$ = this.workflows$.pipe(
    map(workflows =>
      workflows.filter(w =>
        new Date(w.dueDate) < new Date() &&
        w.status !== 'Approved'
      )
    )
  );

  /** Average completion time (days) */
  averageCompletionTime$ = this.workflows$.pipe(
    map(workflows => {
      const completed = workflows.filter(w => w.status === 'Approved');
      if (!completed.length) return 0;

      const totalDays = completed.reduce((sum, w) => {
        const diff =
          (new Date(w.dueDate).getTime() -
           new Date(w.createdAt).getTime()) / 86400000;
        return sum + diff;
      }, 0);

      return Math.round(totalDays / completed.length);
    })
  );

  constructor(private workflowService: WorkflowService) {}
}
