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
import { TrainingsStore } from '../../store/trainings.store';
import { MatDialogConfig } from '@angular/material/dialog';

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

  store = inject(TrainingsStore);
  trainingService = inject(TrainingService);
  router = inject(Router);
  dialog = inject(MatDialog);
  trainings = computed(() => this.trainingService.processedTrainings());

  ngOnInit() {
    this.store.loadTrainings();
  }

  onEditClick(exerciseName: string) {
    this.trainingService.setCurrentExerciseByName(exerciseName);
    this.router.navigate(['/training/edit']);
  }

  onAddExercise(trainingName: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.data = { trainingName };
    dialogConfig.enterAnimationDuration = enterAnimationDuration;
    dialogConfig.exitAnimationDuration = exitAnimationDuration;
  
    if (window.innerWidth <= 768) {
      dialogConfig.width = '100vw';
      dialogConfig.height = '100vh';
      dialogConfig.maxWidth = '100vw';
      dialogConfig.maxHeight = '100vh';
    } else {
      dialogConfig.width = '600px';
    }
  
    const dialogRef = this.dialog.open(AddExerciseDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.store.loadTrainings();
    });
  }
}
