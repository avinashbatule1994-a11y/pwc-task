
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { map } from 'rxjs/operators';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  /* ================= KPI STREAMS ================= */

  avgCompletionTime$ = this.dashboardService.averageCompletionTime$;

  overdueCount$ = this.dashboardService.overdueWorkflows$.pipe(
    map(list => list.length)
  );

  /* ================= STATUS TABLE ================= */

  statusData$ = this.dashboardService.statusCounts$.pipe(
    map(counts =>
      Object.entries(counts).map(([status, count]) => ({
        status,
        count
      }))
    )
  );

  /* ================= PIE CHART ================= */

  chartData$ = this.dashboardService.statusCounts$.pipe(
    map(counts => ({
      labels: Object.keys(counts),
      datasets: [
        {
          data: Object.values(counts)
        }
      ]
    }))
  );

  emptyChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{ data: [] }]
  };

  chartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  constructor(private dashboardService: DashboardService) {}
}
