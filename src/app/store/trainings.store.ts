import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { TrainingDataService } from '../api/training-data.service';
import { Training, TrainingsState } from '../training/training.model';
import { inject } from '@angular/core';

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
          console.log(trainings);
          patchState(store, { trainings, loading: false });
        },
        error: (err: any) => {
          patchState(store, { error: err.message, loading: false });
        }
      });
    }
  }))
);
