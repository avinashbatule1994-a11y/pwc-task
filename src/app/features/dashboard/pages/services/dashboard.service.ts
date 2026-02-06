// import { Injectable } from '@angular/core';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { WorkflowService } from 'src/app/features/workflow/services/workflow.service';
import { DashboardStats } from '../../models/dashboard.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DashboardService {

  workflows$ = this.workflowService.workflows$;

  statusCounts$ = this.workflows$.pipe(
    map(workflows =>
      workflows.reduce((acc, wf) => {
        acc[wf.status] = (acc[wf.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    )
  );

  overdueWorkflows$ = this.workflows$.pipe(
    map(workflows =>
      workflows.filter(
        wf =>
          new Date(wf.dueDate) < new Date() &&
          wf.status !== 'Approved'
      )
    )
  );

  averageCompletionTime$ = this.workflows$.pipe(
    map(workflows => {
      const completed = workflows.filter(w => w.completedAt);
      if (!completed.length) return 0;

      const totalDays = completed.reduce((sum, wf) => {
        const created = new Date(wf.createdAt).getTime();
        const completedAt = new Date(wf.completedAt!).getTime();
        return sum + (completedAt - created) / (1000 * 60 * 60 * 24);
      }, 0);

      return Math.round(totalDays / completed.length);
    })
  );

    getStats(): Observable<DashboardStats> {
        return this.http.get<DashboardStats>('/api/dashboard/stats');
    }
  constructor(private workflowService: WorkflowService, private http:HttpClient) {}
}
