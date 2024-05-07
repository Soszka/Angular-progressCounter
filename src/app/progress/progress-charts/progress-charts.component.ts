import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ProgressChartsDescriptionComponent } from './progress-charts-description/progress-charts-description.component';

@Component({
  selector: 'app-progress-charts',
  standalone: true,
  imports: [ NgxChartsModule, ProgressChartsDescriptionComponent ],
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
  chartData!: any[];
  frequencyData!: any[];
  yAxisLabel = 'CIĘŻAR ( KG )';
  frequencyYAxisLabel = 'ILOŚĆ ĆWICZEŃ';
  
  data = { 
    name: "WYCISKANIE NA ŁAWCE PŁASKIEJ", 
    dailyData: [
      { date: "2023-11-19", repetitions: 8, weight: 48 },
      { date: "2023-12-03", repetitions: 8, weight: 50 },
      { date: "2023-12-17", repetitions: 8, weight: 52 },
      { date: "2023-12-31", repetitions: 8, weight: 55 },
      { date: "2024-01-14", repetitions: 8, weight: 60 },
      { date: "2024-01-28", repetitions: 6, weight: 65 },
      { date: "2024-02-11", repetitions: 6, weight: 70 },
      { date: "2024-02-25", repetitions: 6, weight: 75 },
      { date: "2024-03-11", repetitions: 6, weight: 80 },
      { date: "2024-03-25", repetitions: 6, weight: 85 }
    ]
  }

  constructor() {
    this.chartData = [{
      name: this.data.name,
      series: this.data.dailyData.map(item => ({
        name: item.date,
        value: item.weight
      }))
    }];
    this.processFrequencyData();
  }

  processFrequencyData() {
    const counts: { [key: string]: number } = {};
    this.data.dailyData.forEach(item => {
      const month = item.date.slice(0, 7); // yyyy-mm
      if (counts[month]) {
        counts[month]++;
      } else {
        counts[month] = 1;
      }
    });

    this.frequencyData = Object.keys(counts).map(month => {
      return {
        name: month,
        value: counts[month]
      };
    });
  }
}
