import { Component } from '@angular/core';
import { MatDialogRef, MatDialog} from '@angular/material/dialog';
import { ButtonComponent } from '../../../shared/button/button.component';
import { MatInputModule } from '@angular/material/input';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-add-exercise-dialog',
  standalone: true,
  imports: [ ButtonComponent, MatInputModule ],
  templateUrl: './add-exercise-dialog.component.html',
  styleUrl: './add-exercise-dialog.component.scss'
})
export class AddExerciseDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddExerciseDialogComponent>, 
    public dialog: MatDialog) {}
  
  onSave(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const information = "Pomyślnie dodano nową pozycje do historii twojego ćwiczenia";
    this.dialogRef.close();
    this.dialog.open(InfoDialogComponent, {
      width: '600px',
      data: { information },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
