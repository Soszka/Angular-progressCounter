import { Component, inject} from '@angular/core';
import { MatDialogRef, MatDialog} from '@angular/material/dialog';
import { ButtonComponent } from '../../../shared/button/button.component';
import { MatInputModule } from '@angular/material/input';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TrainingsStore } from '../../../store/trainings.store';
import { FormsModule } from '@angular/forms';
import { TrainingService } from '../../training.service';

@Component({
  selector: 'app-add-exercise-dialog',
  standalone: true,
  imports: [ ButtonComponent, MatInputModule, FormsModule ],
  templateUrl: './add-exercise-dialog.component.html',
  styleUrl: './add-exercise-dialog.component.scss'
})
export class AddExerciseDialogComponent {

  exerciseName: string = '';
  trainingStore = inject(TrainingsStore);
  trainingService = inject(TrainingService);
  data = inject(MAT_DIALOG_DATA);

  constructor(
    public dialogRef: MatDialogRef<AddExerciseDialogComponent>, 
    public dialog: MatDialog) {}
  
  onSave(enterAnimationDuration: string, exitAnimationDuration: string): void {
    if (this.exerciseName.trim()) {
      const formattedExerciseName = this.exerciseName.toUpperCase();
      const currentTraining = this.trainingService.store.trainings().find(
        training => training.category === this.data.trainingName
      );
      if (currentTraining && currentTraining.exercises.some(ex => ex.name === formattedExerciseName)) {
        const information = "Ćwiczenie o takiej nazwie już istnieje w tym treningu!";
        this.dialog.open(InfoDialogComponent, {
          width: '600px',
          data: { information },
          enterAnimationDuration,
          exitAnimationDuration,
        });
        return;
      }
      this.trainingStore.addExercise(this.data.trainingName, formattedExerciseName);
      const information = "Pomyślnie dodano nowe ćwiczenie do treningu!";
      this.dialogRef.close();
      this.dialog.open(InfoDialogComponent, {
        width: '600px',
        data: { information },
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
  }
  

  onCancel() {
    this.dialogRef.close();
  }
}
