import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialog} from '@angular/material/dialog';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TrainingService } from '../../training.service';
import { TrainingsStore } from '../../../store/trainings.store';
import { ExerciseDailyData } from '../../training.model';

@Component({
  selector: 'app-add-exercise-position-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ 
    ButtonComponent, 
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  templateUrl: './add-exercise-position-dialog.component.html',
  styleUrl: './add-exercise-position-dialog.component.scss'
})
export class AddExercisePositionDialogComponent {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  trainingService = inject(TrainingService);
  store = inject(TrainingsStore);

  constructor(
    public dialogRef: MatDialogRef<AddExercisePositionDialogComponent>, 
    public dialog: MatDialog,
    private _formBuilder: FormBuilder
  ) {}

  onSave(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const date = this.firstFormGroup.value.firstCtrl;
    const weight = this.secondFormGroup.value.secondCtrl;
    const repetitions = this.thirdFormGroup.value.thirdCtrl;

    if (date && weight && repetitions) {
      const newPosition: ExerciseDailyData = {
        date,
        weight: parseInt(weight, 10),
        repetitions: parseInt(repetitions, 10)
      };

      const currentTrainingName = this.trainingService.getCurrentTrainingName();
      const currentExerciseName = this.trainingService.getCurrentExercise().name;
      this.store.addExercisePosition(currentTrainingName, currentExerciseName, newPosition);

      const information = "Pomyślnie dodano nową pozycję do historii twojego ćwiczenia";
      this.dialogRef.close();
      this.dialog.open(InfoDialogComponent, {
        width: '600px',
        data: { information },
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
  }
}
