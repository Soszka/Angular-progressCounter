import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialog} from '@angular/material/dialog';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
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

  trainingService = inject(TrainingService);
  store = inject(TrainingsStore);
  _formBuilder = inject(FormBuilder);
  dialog = inject(MatDialog);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', [Validators.required, this.dateValidator.bind(this)]],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', [Validators.required, Validators.max(1000)]],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', [Validators.required, Validators.max(100)]],
  });

  constructor( public dialogRef: MatDialogRef<AddExercisePositionDialogComponent> ) {}

  ngOnInit() {
    this.secondFormGroup.get('secondCtrl')?.valueChanges.subscribe(value => {
      const weight = Number(value);
      if (weight > 1000) {
        this.secondFormGroup.get('secondCtrl')?.setValue('1000');
      }
    });
    this.thirdFormGroup.get('thirdCtrl')?.valueChanges.subscribe(value => {
      const repetitions = Number(value);
      if (repetitions > 100) {
        this.thirdFormGroup.get('thirdCtrl')?.setValue('100');
      }
    });
  }

  onSave(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const date = this.firstFormGroup.value.firstCtrl;
    const weight = this.secondFormGroup.value.secondCtrl;
    const repetitions = this.thirdFormGroup.value.thirdCtrl;

    if (!date || !this.isValidDate(date)) {
      const information = "Wprowadź prawidłową datę";
      this.dialog.open(InfoDialogComponent, {
        width: '600px',
        data: { information },
        enterAnimationDuration,
        exitAnimationDuration,
      });
      return;
    }

    const formattedDate = new Date(date).toLocaleDateString('en-CA'); 
    const currentExercise = this.trainingService.getCurrentExercise();
    if (currentExercise.dailyData.some(data => data.date === formattedDate)) {
      const information = "Pozycje o takiej dacie już istnieje! Nie można mieć dwóch pozycji z taką samą datą";
      this.dialog.open(InfoDialogComponent, {
        width: '600px',
        data: { information },
        enterAnimationDuration,
        exitAnimationDuration,
      });
      return;
    }

    if (date && weight && repetitions) {
      const formattedDate = new Date(date).toLocaleDateString('en-CA');
      const newPosition: ExerciseDailyData = {
        date: formattedDate,
        weight: parseInt(weight, 10),
        repetitions: parseInt(repetitions, 10)
      };

      const currentTrainingName = this.trainingService.getCurrentTrainingName();
      const currentExerciseName = this.trainingService.getCurrentExercise().name;
      this.store.addExercisePosition(currentTrainingName, currentExerciseName, newPosition).subscribe({
        next: () => {
          this.dialogRef.close(true);  
          const information = "Pomyślnie dodano nową pozycję do historii twojego ćwiczenia";
          this.dialog.open(InfoDialogComponent, {
            width: '600px',
            data: { information },
            enterAnimationDuration,
            exitAnimationDuration,
          });
        },
      });
    }
  }

  isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    const today = new Date();
    const year = date.getFullYear();
    return year >= 2020 && date <= today;
  }

  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const dateString = control.value;
    if (!dateString || !this.isValidDate(dateString)) {
      return { 'invalidDate': true };
    }
    return null;
  }
}
