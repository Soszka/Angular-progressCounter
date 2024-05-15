import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { TrainingComponent } from './training/training.component';
import { ProgressComponent } from './progress/progress.component';
import { CaloriesComponent } from './calories/calories.component';
import { TrainingExerciseComponent } from './training/training-exercises/training-exercise/training-exercise.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'training/edit', component: TrainingExerciseComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'calories', component: CaloriesComponent },
];
