import { Component } from '@angular/core';
import { MatDialogRef, MatDialog} from '@angular/material/dialog';
import { ButtonComponent } from '../../../shared/button/button.component';
import { MatInputModule } from '@angular/material/input';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-add-training-dialog',
  standalone: true,
  imports: [ ButtonComponent, MatInputModule ],
  templateUrl: './add-training-dialog.component.html',
  styleUrl: './add-training-dialog.component.scss'
})
export class AddTrainingDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddTrainingDialogComponent>, 
    public dialog: MatDialog) {}
  
  onSave(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const information = "Pomyślnie dodano nowy trening do planu treningowego!";
    this.dialogRef.close();
    this.dialog.open(InfoDialogComponent, {
      width: '600px',
      data: { information },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
