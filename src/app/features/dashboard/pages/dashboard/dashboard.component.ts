// // // import { Component, ChangeDetectionStrategy } from '@angular/core';
// // // import { DashboardService } from '../services/dashboard.service';
// // // import { map } from 'rxjs/operators';

// // // @Component({
// // //   selector: 'app-dashboard',
// // //   templateUrl: './dashboard.component.html',
// // //   changeDetection: ChangeDetectionStrategy.OnPush
// // // })
// // // export class DashboardComponent {

// // //   avgCompletionTime$ = this.dashboardService.averageCompletionTime$;
// // //   overdueCount$ = this.dashboardService.overdueWorkflows$.pipe(
// // //     map(list => list.length)
// // //   );

// // //   statusChartData$ = this.dashboardService.statusCounts$.pipe(
// // //     map(counts => ({
// // //       labels: Object.keys(counts),
// // //       datasets: [
// // //         {
// // //           label: 'Workflows',
// // //           data: Object.values(counts)
// // //         }
// // //       ]
// // //     }))
// // //   );

// // //   constructor(private dashboardService: DashboardService) {}
// // // }
// // import { ChangeDetectionStrategy, Component } from '@angular/core';
// // import { map } from 'rxjs/operators';
// // import { DashboardService } from '../services/dashboard.service';

// // @Component({
// //   selector: 'app-dashboard',
// //   templateUrl: './dashboard.component.html',
// //   changeDetection: ChangeDetectionStrategy.OnPush
// // })
// // export class DashboardComponent {

// //   avgCompletionTime$ = this.dashboardService.averageCompletionTime$;

// //   overdueCount$ = this.dashboardService.overdueWorkflows$.pipe(
// //     map(list => list.length)
// //   );

// //   constructor(private dashboardService: DashboardService) {}
// // }

// import { ChangeDetectionStrategy, Component } from '@angular/core';
// import { DashboardService } from '../services/dashboard.service';
// import { map } from 'rxjs/operators';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class DashboardComponent {

//   // KPI observables
//   avgCompletionTime$ = this.dashboardService.averageCompletionTime$;

//   overdueCount$ = this.dashboardService.overdueWorkflows$.pipe(
//     map(list => list.length)
//   );

//   // STATUS TABLE
//   displayedColumns: string[] = ['status', 'count'];

//   statusData$ = this.dashboardService.statusCounts$.pipe(
//     map(counts =>
//       Object.entries(counts).map(([status, count]) => ({
//         status,
//         count
//       }))
//     )
//   );

//   constructor(private dashboardService: DashboardService) {}
// }
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  // KPI streams
  avgCompletionTime$ = this.dashboardService.averageCompletionTime$;

  overdueCount$ = this.dashboardService.overdueWorkflows$.pipe(
    map(list => list.length)
  );

  // Table data
  statusData$ = this.dashboardService.statusCounts$.pipe(
    map(counts =>
      Object.entries(counts).map(([status, count]) => ({
        status,
        count
      }))
    )
  );

  displayedColumns: string[] = ['status', 'count'];

  constructor(private dashboardService: DashboardService) {}
}
