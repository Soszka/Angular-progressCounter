import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../../../shared/button/button.component';

@Component({
  selector: 'app-exercise-position-details-dialog',
  standalone: true,
  imports: [ MatButtonModule, MatIconModule, ButtonComponent ],
  templateUrl: './exercise-position-details-dialog.component.html',
  styleUrl: './exercise-position-details-dialog.component.scss'
})
export class ExercisePositionDetailsDialogComponent {
  dialogRef = inject(MatDialogRef);
  exercise: { name: string; date: string; repetitions: number; weight: number } = inject(MAT_DIALOG_DATA);

  onClose() {
    this.dialogRef.close();
  }

  onRemovePosition() {
    console.log('usunięto pozycję')
  }
}
