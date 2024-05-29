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
  dialog = inject(MatDialog)

  constructor( public dialogRef: MatDialogRef<AddExerciseDialogComponent> ) {}
  
  onSave(enterAnimationDuration: string, exitAnimationDuration: string): void {
    if (this.exerciseName.trim()) {
      const formattedExerciseName = this.exerciseName.toUpperCase();
      const allTrainings = this.trainingService.store.trainings();
      const exerciseExists = allTrainings.some(training =>
        training.exercises.some(ex => ex.name === formattedExerciseName)
      );
      if (exerciseExists) {
        const information = "Ćwiczenie o takiej nazwie już istnieje w jednym z treningów!";
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
