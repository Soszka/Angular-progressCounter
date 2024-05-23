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

  setSelectedTraining(training: Training | undefined) {
    this.selectedTraining.set(training);
  }

  setSelectedExercise(exercise: Exercise | undefined) {
    this.selectedExercise.set(exercise);
  }

  setSelectedRange(range: string | undefined) {
    this.selectedRange.set(range);
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
  }

  resetState() {
    this.setSelectedTraining(undefined);
    this.setSelectedExercise(undefined);
    this.setSelectedRange(undefined);
    this.filteredData.set([]);
    this.hasFilteredData.set(false);
  }
}