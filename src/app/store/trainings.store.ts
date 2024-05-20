import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { TrainingDataService } from '../api/training-data.service';
import { Training, TrainingsState, ExerciseDailyData } from '../training/training.model';
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
    loadTrainings() {
      patchState(store, { loading: true });
      trainingDataService.getTrainings().subscribe({
        next: (trainings: Training[]) => {
          patchState(store, { trainings, loading: false });
        },
        error: (err: any) => {
          patchState(store, { error: err.message, loading: false });
        }
      });
    },
    addTraining(trainingName: string) {
      patchState(store, { loading: true });
      trainingDataService.addTraining(trainingName).subscribe({
        next: () => {
          this.loadTrainings();
          patchState(store, { loading: false });
        },
        error: (err: any) => {
          patchState(store, { error: err.message, loading: false });
        }
      });
    },
    deleteTraining(trainingName: string): Observable<void> {
      patchState(store, { loading: true });
      return trainingDataService.deleteTraining(trainingName).pipe(
        tap(() => this.loadTrainings()),
        finalize(() => patchState(store, { loading: false }))
      );
    },
    addExercise(trainingName: string, exerciseName: string) {
      patchState(store, { loading: true });
      trainingDataService.addExercise(trainingName, exerciseName).subscribe({
        next: () => {
          this.loadTrainings();
          patchState(store, { loading: false });
        },
        error: (err: any) => {
          patchState(store, { error: err.message, loading: false });
        }
      });
    },
    deleteExercise(trainingName: string, exerciseName: string): Observable<void> {
      patchState(store, { loading: true });
      return trainingDataService.deleteExercise(trainingName, exerciseName).pipe(
        tap(() => this.loadTrainings()),
        finalize(() => patchState(store, { loading: false }))
      );
    },
    deleteExercisePosition(trainingName: string, exerciseName: string, date: string): Observable<void> {
      patchState(store, { loading: true });
      return trainingDataService.deleteExercisePosition(trainingName, exerciseName, date).pipe(
        tap(() => this.loadTrainings()),
        finalize(() => patchState(store, { loading: false }))
      );
    },
    addExercisePosition(trainingName: string, exerciseName: string, newPosition: ExerciseDailyData) {
      patchState(store, { loading: true });
      trainingDataService.addExercisePosition(trainingName, exerciseName, newPosition).subscribe({
        next: () => {
          this.loadTrainings();
          patchState(store, { loading: false });
        },
        error: (err: any) => {
          patchState(store, { error: err.message, loading: false });
        }
      });
    }
  }))
);
