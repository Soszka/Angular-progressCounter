import { Injectable, signal, inject, computed } from '@angular/core';
import { TrainingsStore } from './../store/trainings.store';
import { Exercise, Training, ExerciseDailyData } from '../training/training.model';


@Injectable({ providedIn: 'root' })
export class TrainingService {
  currentIndex = signal(0);
  store = inject(TrainingsStore);
  loading = computed(() => this.store.loading());
  processedTrainings = computed(() => this.calculateProcessedTrainings());
  allExercises = computed(() => {
    return this.processedTrainings().reduce((exercises: Exercise[], training: Training) => {
      return exercises.concat(training.exercises);
    }, []);
  });

  constructor() {}

  private calculateProcessedTrainings(): Training[] {
    return this.store.trainings().map(training => ({
      ...training,
      exercises: training.exercises.map(exercise => ({
        ...exercise,
        maxWeight: this.calculateMaxWeight(exercise.dailyData),
        lastEdited: this.findLastEditedDate(exercise.dailyData)
      }))
    }));
  }

  private calculateMaxWeight(dailyData: ExerciseDailyData[]): number {
    return Math.max(...dailyData.map(data => data.weight));
  }

  private findLastEditedDate(dailyData: ExerciseDailyData[]): string {
    return dailyData.reduce((latest, current) => {
      return latest > current.date ? latest : current.date;
    }, '');
  }

  getCurrentExercise() {
    return this.allExercises()[this.currentIndex()];
  }

  setCurrentIndex(index: number) {
    if (index < 0) {
      index = this.allExercises().length - 1;
    } else if (index >= this.allExercises().length) {
      index = 0;
    }
    this.currentIndex.set(index);
  }

  findExerciseByName(name: string): Exercise | undefined {
    return this.allExercises().find(exercise => exercise.name.toLowerCase() === name.toLowerCase());
  }

  setCurrentExerciseByName(name: string) {
    const index = this.allExercises().findIndex(exercise => exercise.name.toLowerCase() === name.toLowerCase());
    if (index !== -1) {
      this.setCurrentIndex(index);
    }
  }
}