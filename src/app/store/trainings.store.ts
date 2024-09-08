import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { TrainingDataService } from '../api/training-data.service';
import {
  Training,
  TrainingsState,
  ExerciseDailyData,
} from '../training/training.model';
import { inject } from '@angular/core';
import { Observable, tap, finalize } from 'rxjs';

const initialState: TrainingsState = {
  trainings: [],
  loading: false,
  error: undefined,
};

export const TrainingsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, trainingDataService = inject(TrainingDataService)) => ({
    setLoadingTrue() {
      patchState(store, { loading: true });
    },
    setLoadingFalse() {
      patchState(store, { loading: false });
    },
    loadTrainings() {
      this.setLoadingTrue();
      trainingDataService.getTrainings().subscribe({
        next: (trainings: Training[]) => {
          patchState(store, { trainings, loading: false });
        },
      });
    },
    addTraining(trainingName: string) {
      this.setLoadingTrue();
      trainingDataService.addTraining(trainingName).subscribe({
        next: () => {
          this.loadTrainings();
          this.setLoadingFalse();
        },
      });
    },
    deleteTraining(trainingName: string): Observable<void> {
      this.setLoadingTrue();
      return trainingDataService.deleteTraining(trainingName).pipe(
        tap(() => this.loadTrainings()),
        finalize(() => this.setLoadingFalse())
      );
    },
    addExercise(trainingName: string, exerciseName: string) {
      this.setLoadingTrue();
      trainingDataService.addExercise(trainingName, exerciseName).subscribe({
        next: () => {
          this.loadTrainings();
          this.setLoadingFalse();
        },
      });
    },
    deleteExercise(
      trainingName: string,
      exerciseName: string
    ): Observable<void> {
      this.setLoadingTrue();
      return trainingDataService
        .deleteExercise(trainingName, exerciseName)
        .pipe(
          tap(() => this.loadTrainings()),
          finalize(() => this.setLoadingFalse())
        );
    },
    deleteExercisePosition(
      trainingName: string,
      exerciseName: string,
      date: string
    ): Observable<void> {
      this.setLoadingTrue();
      return trainingDataService
        .deleteExercisePosition(trainingName, exerciseName, date)
        .pipe(
          tap(() => this.loadTrainings()),
          finalize(() => this.setLoadingFalse())
        );
    },
    addExercisePosition(
      trainingName: string,
      exerciseName: string,
      newPosition: ExerciseDailyData
    ): Observable<void> {
      this.setLoadingTrue();
      return trainingDataService
        .addExercisePosition(trainingName, exerciseName, newPosition)
        .pipe(
          tap(() => this.loadTrainings()),
          finalize(() => this.setLoadingFalse())
        );
    },
  }))
);
