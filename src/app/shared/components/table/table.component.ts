import { Component, Input, TrackByFunction } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() columns: string[] = [];

  @Input() data: Array<Record<string, any>> = [];

  @Input()
  trackByFn: TrackByFunction<Record<string, any>> =
    (_: number, item: Record<string, any>) => item;
}
