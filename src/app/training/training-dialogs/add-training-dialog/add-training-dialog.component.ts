import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ButtonComponent } from '../../../shared/button/button.component';
import { MatInputModule } from '@angular/material/input';
import { TrainingsStore } from '../../../store/trainings.store';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from '../../../shared/services/dialog.service';

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
  dialogService = inject(DialogService);  

  constructor( public dialogRef: MatDialogRef<AddTrainingDialogComponent> ) {}
  
  onSave(enterAnimationDuration: string, exitAnimationDuration: string): void {
    if (this.trainingName.trim()) {
      const formattedTrainingName = this.trainingName.toUpperCase();
      const existingTraining = this.trainingStore.trainings().find(training => training.category === formattedTrainingName);
      if (existingTraining) {
        this.dialogService.openInfoDialog("Trening o takiej nazwie już istnieje!", enterAnimationDuration, exitAnimationDuration);
        return;
      }
      this.trainingStore.addTraining(formattedTrainingName);
      const information = "Pomyślnie dodano nowy trening do planu treningowego!";
      this.dialogRef.close();
      this.dialogService.openInfoDialog(information, enterAnimationDuration, exitAnimationDuration); 
    }
  }

  onClose(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
