import { Component, inject, computed } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ButtonComponent } from '../../shared/button/button.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TrainingService } from '../training.service';
import { AddExerciseDialogComponent } from '../training-dialogs/add-exercise-dialog/add-exercise-dialog.component';
import { TrainingsStore } from '../../store/trainings.store';
import { DialogService } from '../../shared/services/dialog.service';

@Component({
  selector: 'app-training-exercises',
  standalone: true,
  imports: [
    MatTabsModule,
    ButtonComponent,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './training-exercises.component.html',
  styleUrl: './training-exercises.component.scss',
})
export class TrainingExercisesComponent {
  store = inject(TrainingsStore);
  dialogService = inject(DialogService);
  trainingService = inject(TrainingService);
  router = inject(Router);
  trainings = computed(() => this.trainingService.processedTrainings());

  images: string[] = [
    'assets/trainingPhoto1.jpg',
    'assets/home_adventages_photo.jpg',
    'assets/splash_foto.jpg',
    'assets/trainingPhoto4.jpg',
  ];

  ngOnInit() {
    this.store.loadTrainings();
  }

  onEditClick(exerciseName: string) {
    this.trainingService.setCurrentExerciseByName(exerciseName);
    this.router.navigate(['/training/edit']);
  }

  getCyclicImage(index: number): string {
    const imageIndex = index % this.images.length;
    return this.images[imageIndex];
  }

  onAddExercise(
    trainingName: string,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialogService.openDialog(
      AddExerciseDialogComponent,
      { trainingName },
      '600px',
      'auto',
      enterAnimationDuration,
      exitAnimationDuration
    );

    dialogRef.afterClosed().subscribe(() => {
      this.store.loadTrainings();
    });
  }
}
