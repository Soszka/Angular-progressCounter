import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { TrainingComponent } from './training/training.component';
import { ProgressComponent } from './progress/progress.component';
import { CaloriesComponent } from './calories/calories.component';
import { TrainingExerciseComponent } from './training/training-exercises/training-exercise/training-exercise.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] },
  { path: 'training/edit', component: TrainingExerciseComponent, canActivate: [AuthGuard] },
  { path: 'progress', component: ProgressComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  { path: 'calories', component: CaloriesComponent },
];
