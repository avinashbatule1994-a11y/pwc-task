import { Component, Input } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  @Input() data!: ChartData;
  @Input() type: ChartType = 'bar';
}
