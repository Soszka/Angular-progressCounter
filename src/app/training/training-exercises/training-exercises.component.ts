import { Component, inject, computed } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ButtonComponent } from '../../shared/button/button.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TrainingService } from '../training.service';
import { MatDialog } from '@angular/material/dialog';
import { AddExerciseDialogComponent } from '../training-dialogs/add-exercise-dialog/add-exercise-dialog.component';


@Component({
  selector: 'app-training-exercises',
  standalone: true,
  imports: [ 
    MatTabsModule, 
    ButtonComponent, 
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './training-exercises.component.html',
  styleUrl: './training-exercises.component.scss'
})
export class TrainingExercisesComponent {

  trainingService = inject(TrainingService);
  trainings = this.trainingService.processedTrainings;
  loading = this.trainingService.loading;
  error = computed(() => this.trainingService.store.error?.());

  constructor(
    private router: Router,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.trainingService.store.loadTrainings();
  }

  onEditClick(exerciseName: string) {
    this.trainingService.setCurrentExerciseByName(exerciseName);
    this.router.navigate(['/training/edit']);
  }

  onAddExercise(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddExerciseDialogComponent, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
