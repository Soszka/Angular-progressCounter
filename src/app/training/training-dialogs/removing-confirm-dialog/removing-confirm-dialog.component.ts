import { Component, Inject, inject} from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ButtonComponent } from '../../../shared/button/button.component';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { TrainingsStore } from '../../../store/trainings.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-removing-confirm-dialog',
  standalone: true,
  imports: [ ButtonComponent ],
  templateUrl: './removing-confirm-dialog.component.html',
  styleUrl: './removing-confirm-dialog.component.scss'
})
export class RemovingConfirmDialogComponent {

  trainingStore = inject(TrainingsStore);
  router = inject(Router);

  constructor(
    public dialogRef: MatDialogRef<RemovingConfirmDialogComponent>, 
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onRemove(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const currentTraining = this.trainingStore.trainings().find(training => training.category === this.data.trainingName);
    const currentExercise = currentTraining?.exercises.find(exercise => exercise.name === this.data.exerciseName);

    switch (this.data.type) {
      case 'training':
        this.trainingStore.deleteTraining(this.data.trainingName).subscribe(() => {
          this.onSuccess(this.data.messages.successMessage, enterAnimationDuration, exitAnimationDuration);
        });
        break;
      case 'exercise':
        if (currentTraining && currentTraining.exercises.length <= 1) {
          this.dialogRef.close();
          this.showInfoDialog("Każdy trening musi mieć chociaż jedno ćwiczenie! Nie możesz usunąć jedynego ćwiczenia", enterAnimationDuration, exitAnimationDuration);
          return;
        }
        this.trainingStore.deleteExercise(this.data.trainingName, this.data.exerciseName).subscribe(() => {
          this.router.navigate(['/training']);  
          this.onSuccess(this.data.messages.successMessage, enterAnimationDuration, exitAnimationDuration);
        });
        break;
      case 'position':
        if (currentExercise && currentExercise.dailyData.length <= 1) {
          this.dialogRef.close();
          this.showInfoDialog("Każde ćwiczenie powinno mieć chociaż jedną pozycję! Nie możesz usunąć jedynej pozycji", enterAnimationDuration, exitAnimationDuration);
          return;
        }
        this.trainingStore.deleteExercisePosition(this.data.trainingName, this.data.exerciseName, this.data.date).subscribe(() => {
          this.onSuccess(this.data.messages.successMessage, enterAnimationDuration, exitAnimationDuration);
        });
        break;
    }
  }

  private showInfoDialog(message: string, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(InfoDialogComponent, {
      width: '600px',
      data: { information: message },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  
  onSuccess(message: string, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialogRef.close();
    this.showInfoDialog(message, enterAnimationDuration, exitAnimationDuration);
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
}
