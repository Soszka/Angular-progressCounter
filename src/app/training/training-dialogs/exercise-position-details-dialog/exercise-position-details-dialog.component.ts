import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../../../shared/button/button.component';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../../training.service';
import { TrainingsStore } from '../../../store/trainings.store';
import { RemovingConfirmDialogComponent } from '../removing-confirm-dialog/removing-confirm-dialog.component';

@Component({
  selector: 'app-exercise-position-details-dialog',
  standalone: true,
  imports: [ MatButtonModule, MatIconModule, ButtonComponent ],
  templateUrl: './exercise-position-details-dialog.component.html',
  styleUrl: './exercise-position-details-dialog.component.scss'
})
export class ExercisePositionDetailsDialogComponent {

  dialogRef = inject(MatDialogRef);
  dialog = inject(MatDialog);
  trainingService = inject(TrainingService);
  store = inject(TrainingsStore);
  exercise: { name: string; date: string; repetitions: number; weight: number } = inject(MAT_DIALOG_DATA);

  onClose() {
    this.dialogRef.close();
  }

  onRemovePosition() {
    const messages = {
      confirmMessage: "Czy na pewno chcesz usunąć wybraną pozycję?",
      successMessage: "Pomyślnie usunięto wybraną pozycję z historii twojego ćwiczenia"
    };

    const data = {
      type: 'position',
      trainingName: this.trainingService.getCurrentTrainingName(), 
      exerciseName: this.exercise.name,
      date: this.exercise.date,
      messages
    };

    const confirmDialogRef = this.dialog.open(RemovingConfirmDialogComponent, {
      data,
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms'
    });

    confirmDialogRef.afterClosed().subscribe(() => {
      this.dialogRef.close();
    });
  }
}
