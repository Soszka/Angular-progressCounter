import { Component, inject, computed } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ProgressChartsDescriptionComponent } from './progress-charts-description/progress-charts-description.component';
import { ProgressService } from '../progress.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-progress-charts',
  standalone: true,
  imports: [ 
    NgxChartsModule, 
    ProgressChartsDescriptionComponent,
    MatCardModule
  ],
  templateUrl: './progress-charts.component.html',
  styleUrl: './progress-charts.component.scss'
})
export class ProgressChartsComponent {

  view: [number, number] = [1200, 350];
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['rgb(192, 0, 0)']
  };
  yAxisLabel = 'CIĘŻAR ( KG )';
  frequencyYAxisLabel = 'ILOŚĆ ĆWICZEŃ';

  progressService = inject(ProgressService);
  chartData = computed(() => this.getChartData());
  frequencyData = computed(() => this.getFrequencyData());
  hasFilteredData = computed(() => this.progressService.hasFilteredData());

  getChartData() {
    const filteredData = this.progressService.filteredData();
    const name = this.progressService.selectedExercise()?.name || '';

    if (!filteredData.length) {
      return [];
    }

    const sortedSeries = filteredData.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return [{
      name: name,
      series: sortedSeries.map(item => ({
        name: item.date,
        value: item.weight
      }))
    }];
  }

  getFrequencyData() {
    const filteredData = this.progressService.filteredData();
    const counts: { [key: string]: number } = {};

    filteredData.forEach(item => {
      const month = item.date.slice(0, 7);
      if (counts[month]) {
        counts[month]++;
      } else {
        counts[month] = 1;
      }
    });
    const sortedFrequencyData = Object.keys(counts)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map(month => ({
        name: month,
        value: counts[month]
      }));

    return sortedFrequencyData;
  }
}