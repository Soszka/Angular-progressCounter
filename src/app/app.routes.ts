import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'training', 
    loadComponent: () => import('./training/training.component').then(m => m.TrainingComponent),
    canActivate: [AuthGuard] 
  },
  { 
    path: 'training/edit', 
    loadComponent: () => import('./training/training-exercises/training-exercise/training-exercise.component').then(m => m.TrainingExerciseComponent), 
  },
  { 
    path: 'progress', 
    loadComponent: () => import('./progress/progress.component').then(m => m.ProgressComponent), 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'auth', 
    loadComponent: () => import('./auth/auth.component').then(m => m.AuthComponent) 
  },
  { 
    path: 'calories', 
    loadComponent: () => import('./calories/calories.component').then(m => m.CaloriesComponent) 
  },
];
