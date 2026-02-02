import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  avgCompletionTime$ = this.dashboardService.averageCompletionTime$;
  overdueCount$ = this.dashboardService.overdueWorkflows$.pipe(
    map(list => list.length)
  );

  statusChartData$ = this.dashboardService.statusCounts$.pipe(
    map(counts => ({
      labels: Object.keys(counts),
      datasets: [
        {
          label: 'Workflows',
          data: Object.values(counts)
        }
      ]
    }))
  );

  constructor(private dashboardService: DashboardService) {}
}
