import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ButtonComponent } from '../../../shared/button/button.component';
import { MatInputModule } from '@angular/material/input';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { TrainingsStore } from '../../../store/trainings.store';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-training-dialog',
  standalone: true,
  imports: [ 
    ButtonComponent, 
    MatInputModule, 
    FormsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './add-training-dialog.component.html',
  styleUrl: './add-training-dialog.component.scss'
})
export class AddTrainingDialogComponent {

  trainingName: string = '';
  trainingStore = inject(TrainingsStore);
  dialog = inject(MatDialog);

  constructor( public dialogRef: MatDialogRef<AddTrainingDialogComponent> ) {}
  
  onSave(enterAnimationDuration: string, exitAnimationDuration: string): void {
    if (this.trainingName.trim()) {
      const formattedTrainingName = this.trainingName.toUpperCase();
      this.trainingStore.addTraining(formattedTrainingName);
      const information = "Pomyślnie dodano nowy trening do planu treningowego!";
      this.dialogRef.close();
      
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { information };
      dialogConfig.enterAnimationDuration = enterAnimationDuration;
      dialogConfig.exitAnimationDuration = exitAnimationDuration;

      if (window.innerWidth <= 768) {
        dialogConfig.width = '100vw';
        dialogConfig.height = '100vh';
        dialogConfig.maxWidth = '100vw';
        dialogConfig.maxHeight = '100vh';
      } else {
        dialogConfig.width = '600px';
        dialogConfig.height = 'auto';
      }

      this.dialog.open(InfoDialogComponent, dialogConfig);
    }
  }

  onClose(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
