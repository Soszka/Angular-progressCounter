import { Component, Inject, inject} from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ButtonComponent } from '../../../shared/button/button.component';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { TrainingsStore } from '../../../store/trainings.store';

@Component({
  selector: 'app-removing-confirm-dialog',
  standalone: true,
  imports: [ ButtonComponent ],
  templateUrl: './removing-confirm-dialog.component.html',
  styleUrl: './removing-confirm-dialog.component.scss'
})
export class RemovingConfirmDialogComponent {

  trainingStore = inject(TrainingsStore);

  constructor(
    public dialogRef: MatDialogRef<RemovingConfirmDialogComponent>, 
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onRemove(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.trainingStore.deleteTraining(this.data.trainingName).subscribe(() => {
      const information = this.data.messages.successMessage;
      this.dialogRef.close();
      this.dialog.open(InfoDialogComponent, {
        width: '600px',
        data: { information },
        enterAnimationDuration,
        exitAnimationDuration,
      });
    });
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
}
