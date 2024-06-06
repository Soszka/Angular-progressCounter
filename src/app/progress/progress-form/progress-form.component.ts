import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { Training, Exercise } from '../../training/training.model';
import { TrainingsStore } from '../../store/trainings.store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoDialogComponent } from '../../training/training-dialogs/info-dialog/info-dialog.component';
import { ProgressService } from '../progress.service';

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

  trainingList = computed(() => this.store.trainings() || []);
  exercisesList = computed(() => this.progressService.selectedTraining()?.exercises);
  
  dateRanges = [
    { label: 'OSTATNI MIESIĄC', value: '1m' },
    { label: 'OSTATNIE 3 MIESIĄCE', value: '3m' },
    { label: 'OSTATNIE 6 MIESIĘCY', value: '6m' },
    { label: 'OSTATNI ROK', value: '1y' },
    { label: 'OSTATNIE 5 LAT', value: '5y' }
  ];

  store = inject(TrainingsStore);
  dialog = inject(MatDialog);
  progressService = inject(ProgressService);

  ngOnInit() {
    this.store.loadTrainings();
  }

  updateSelectedTraining(training: Training) {
    this.progressService.setSelectedTraining(training);
    this.progressService.setSelectedExercise(undefined);
  }

  updateSelectedExercise(exercise: Exercise) {
    this.progressService.setSelectedExercise(exercise);
  }

  updateSelectedRange(range: string) {
    this.progressService.setSelectedRange(range);
  }

  checkProgress() {
    const training = this.progressService.selectedTraining();
    const exercise = this.progressService.selectedExercise();
    const range = this.progressService.selectedRange();

    if (!training || !exercise || !range) {
      this.showInfoDialog('Proszę uzupełnić wszystkie pola!');
    } else {
      this.progressService.updateFilteredData();
      if (!this.progressService.hasFilteredData()) {
        this.showInfoDialog('Nie znaleziono sesji treningowych dla wybranego zakresu. Wybierz inny zakres.');
      }
    }
  }

  private showInfoDialog(information: string): void {
    const dialogConfig: MatDialogConfig = {
      data: { information },
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms'
    };

    if (window.innerWidth <= 768) {
      dialogConfig.width = '100vw';
      dialogConfig.height = '100vh';
      dialogConfig.maxWidth = '100vw';
      dialogConfig.maxHeight = '100vh';
    } else {
      dialogConfig.width = '600px';
    }

    this.dialog.open(InfoDialogComponent, dialogConfig);
  }

  ngOnDestroy() {
    this.progressService.resetState();
  }
}
