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
    switch (this.data.type) {
      case 'training':
        this.trainingStore.deleteTraining(this.data.trainingName).subscribe(() => {
          this.onSuccess(this.data.messages.successMessage, enterAnimationDuration, exitAnimationDuration);
        });
        break;
      case 'exercise':
        this.trainingStore.deleteExercise(this.data.trainingName, this.data.exerciseName).subscribe(() => {
          this.router.navigate(['/training']);  
          this.onSuccess(this.data.messages.successMessage, enterAnimationDuration, exitAnimationDuration);
        });
        break;
      case 'position':
        this.trainingStore.deleteExercisePosition(this.data.trainingName, this.data.exerciseName, this.data.date).subscribe(() => {
          this.onSuccess(this.data.messages.successMessage, enterAnimationDuration, exitAnimationDuration);
        });
        break;
    }
  }
  
  onSuccess(message: string, enterAnimationDuration: string, exitAnimationDuration: string) {
    const information = message;
    this.dialogRef.close();
    this.dialog.open(InfoDialogComponent, {
      width: '600px',
      data: { information },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
}
