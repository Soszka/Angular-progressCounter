import { Component, inject, OnInit, computed } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialog
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ButtonComponent } from '../../../shared/button/button.component';
import { AddTrainingDialogComponent } from '../add-training-dialog/add-training-dialog.component';
import { RemovingConfirmDialogComponent } from '../removing-confirm-dialog/removing-confirm-dialog.component';
import { TrainingsStore } from '../../../store/trainings.store';

@Component({
  selector: 'app-modify-training-dialog',
  standalone: true,
  imports: [ 
    MatButtonModule, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent,
    MatTableModule,
    ButtonComponent
  ],
  templateUrl: './modify-training-dialog.component.html',
  styleUrl: './modify-training-dialog.component.scss'
})
export class ModifyTrainingDialogComponent {

  displayedColumns: string[] = ['name', 'exercisesCount', 'remove'];
  trainingStore = inject(TrainingsStore);

  dataSource = computed(() => this.trainingStore.trainings().map(training => ({
    name: training.category,
    exercisesCount: training.exercises.length
  })));

  constructor(
    public dialogRef: MatDialogRef<ModifyTrainingDialogComponent>, 
    public dialog: MatDialog) {}

  ngOnInit() {
    this.trainingStore.loadTrainings();
  }

  onAddTraining(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddTrainingDialogComponent, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  onRemoveTraining(trainingName: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const messages = { 
      confirmMessage: "Czy na pewno chcesz usunąć wybrany trening z twojego planu treningowego? Gdy to zrobisz, cała historia związana z tym treningiem w planie treningowym zostanie trwale usunięta.",
      successMessage: "Pomyślnie usunięto wybrany trening z twojego planu treningowego." 
    }
    this.dialog.open(RemovingConfirmDialogComponent, {
      width: '700px',
      data: { messages, trainingName },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
