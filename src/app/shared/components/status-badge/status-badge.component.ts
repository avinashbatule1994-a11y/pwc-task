import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusBadgeComponent {
  @Input() status!: 'Draft' | 'In Review' | 'Approved' | 'Rejected';
}
