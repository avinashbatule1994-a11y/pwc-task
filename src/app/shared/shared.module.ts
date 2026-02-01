import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { RelativeDatePipe } from './pipes/relative-date.pipe';

@NgModule({
  declarations: [
    StatusBadgeComponent,
    RelativeDatePipe
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    StatusBadgeComponent,
    RelativeDatePipe
  ]
})
export class SharedModule {}
