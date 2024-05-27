import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Training, Exercise, ExerciseDailyData } from '../training/training.model';

@Injectable({ providedIn: 'root' })
export class ProgressService {

  selectedTraining = signal<Training | undefined>(undefined);
  selectedExercise = signal<Exercise | undefined>(undefined);
  selectedRange = signal<string | undefined>(undefined);
  filteredData = signal<ExerciseDailyData[]>([]);
  hasFilteredData = signal<boolean>(false);
  sessionCount = signal<number>(0);
  maxWeight = signal<number>(0);
  progress = signal<boolean>(false);
  selectedPeriod = signal<string>('');

  setSelectedTraining(training: Training | undefined) {
    this.selectedTraining.set(training);
  }

  setSelectedExercise(exercise: Exercise | undefined) {
    this.selectedExercise.set(exercise);
  }

  setSelectedRange(range: string | undefined) {
    this.selectedRange.set(range);
    this.selectedPeriod.set(this.getPeriodLabel(range)); 
  }

  getPeriodLabel(range: string | undefined): string {
    const periodMap: { [key: string]: string } = {
      '1m': 'ostatniego miesiąca',
      '3m': 'ostatnich trzech miesięcy',
      '6m': 'ostatnich sześciu miesięcy',
      '1y': 'ostatniego roku',
      '5y': 'ostatnich pięciu lat'
    };
    return range ? periodMap[range] : '';
  }
  
  updateFilteredData() {
    const training = this.selectedTraining();
    const exercise = this.selectedExercise();
    const range = this.selectedRange();

    if (!training || !exercise || !range) {
      this.filteredData.set([]);
      this.hasFilteredData.set(false);
      return;
    }

    const dateRangeMap: { [key: string]: number } = {
      '1m': 1,
      '3m': 3,
      '6m': 6,
      '1y': 12,
      '5y': 60,
    };

    const now = new Date();
    const startDate = new Date();
    startDate.setMonth(now.getMonth() - dateRangeMap[range]);

    const filtered = exercise.dailyData.filter(data => new Date(data.date) >= startDate);
    this.filteredData.set(filtered);
    this.hasFilteredData.set(filtered.length > 0);
    this.calculateStats(filtered);
  }

  calculateStats(filteredData: ExerciseDailyData[]) {
    if (filteredData.length === 0) {
      this.sessionCount.set(0);
      this.maxWeight.set(0);
      this.progress.set(false);
      return;
    }

    const sortedData = filteredData.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const sessionCount = sortedData.length;
    const maxWeight = Math.max(...sortedData.map(data => data.weight));
    const firstWeight = sortedData[0].weight;
    const lastWeight = sortedData[sortedData.length - 1].weight;
    const progress = lastWeight > firstWeight;

    console.log(`First weight: ${firstWeight}, Last weight: ${lastWeight}, Progress: ${progress}`);

    this.sessionCount.set(sessionCount);
    this.maxWeight.set(maxWeight);
    this.progress.set(progress);
  }


  resetState() {
    this.setSelectedTraining(undefined);
    this.setSelectedExercise(undefined);
    this.setSelectedRange(undefined);
    this.filteredData.set([]);
    this.hasFilteredData.set(false);
  }
}