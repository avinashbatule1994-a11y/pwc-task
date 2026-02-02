import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { RelativeDatePipe } from './pipes/relative-date.pipe';
import { TableComponent } from './components/table/table.component';
import { ChartComponent } from './components/chart/chart.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    StatusBadgeComponent,
    RelativeDatePipe,
    TableComponent,
    ChartComponent
  ],
  imports: [CommonModule,NgChartsModule],
  exports: [
    ChartComponent,
    CommonModule,
    StatusBadgeComponent,
    TableComponent,
    RelativeDatePipe
  ]
})
export class SharedModule {}
