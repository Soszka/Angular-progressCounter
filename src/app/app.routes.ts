import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { TrainingComponent } from './training/training.component';
import { ProgressComponent } from './progress/progress.component';
import { CaloriesComponent } from './calories/calories.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'calories', component: CaloriesComponent },
];
