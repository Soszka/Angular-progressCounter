import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { Training, Exercise } from '../../training/training.model';
import { TrainingsStore } from '../../store/trainings.store';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../../training/training-dialogs/info-dialog/info-dialog.component';

@Component({
  selector: 'app-progress-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ 
    MatFormFieldModule, 
    MatDatepickerModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatSelectModule,
    ButtonComponent
  ],
  templateUrl: './progress-form.component.html',
  styleUrl: './progress-form.component.scss'
})
export class ProgressFormComponent implements OnInit {

  trainingList = computed(() => this.store.trainings());
  exercisesList = computed(() => this.selectedTraining()?.exercises || []);
  
  selectedTraining = signal<Training | undefined>(undefined);
  selectedExercise = signal<Exercise | undefined>(undefined);
  selectedRange = signal<string | undefined>(undefined);

  dateRanges = [
    { label: 'OSTATNI MIESIĄC', value: '1m' },
    { label: 'OSTATNIE 3 MIESIĄCE', value: '3m' },
    { label: 'OSTATNIE 6 MIESIĘCY', value: '6m' },
    { label: 'OSTATNI ROK', value: '1y' },
    { label: 'OSTATNIE 5 LAT', value: '5y' }
  ];

  store = inject(TrainingsStore);
  dialog = inject(MatDialog);

  constructor() {}

  ngOnInit() {
    this.store.loadTrainings();
  }

  updateSelectedTraining(training: Training) {
    this.selectedTraining.set(training);
  }

  updateSelectedExercise(exercise: Exercise) {
    this.selectedExercise.set(exercise);
  }

  updateSelectedRange(range: string) {
    this.selectedRange.set(range);
  }

  checkProgress() {
    const training = this.selectedTraining();
    const exercise = this.selectedExercise();
    const range = this.selectedRange();

    if (!training || !exercise || !range) {
      this.dialog.open(InfoDialogComponent, {
        width: '600px',
        data: { information: 'Proszę uzupełnić wszystkie pola!' },
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
      });
    } else {
      console.log('zaznaczono', {
        training: training.category,
        exercise: exercise.name,
        range: range
      });
    }
  }
}
