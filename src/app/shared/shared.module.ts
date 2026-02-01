import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { RelativeDatePipe } from './pipes/relative-date.pipe';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    StatusBadgeComponent,
    RelativeDatePipe,
    TableComponent
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    StatusBadgeComponent,
    TableComponent,
    RelativeDatePipe
  ]
})
export class SharedModule {}
