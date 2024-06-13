import { Component, inject, OnInit, computed } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialog,
  MatDialogConfig
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ButtonComponent } from '../../../shared/button/button.component';
import { AddTrainingDialogComponent } from '../add-training-dialog/add-training-dialog.component';
import { RemovingConfirmDialogComponent } from '../removing-confirm-dialog/removing-confirm-dialog.component';
import { TrainingsStore } from '../../../store/trainings.store';
import { DialogService } from '../../../shared/services/dialog.service';

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
    ButtonComponent,
    MatIconModule
  ],
  templateUrl: './modify-training-dialog.component.html',
  styleUrl: './modify-training-dialog.component.scss'
})
export class ModifyTrainingDialogComponent implements OnInit {

  displayedColumns: string[] = ['name', 'exercisesCount', 'remove'];
  trainingStore = inject(TrainingsStore);
  dialog = inject(MatDialog);
  dialogService = inject(DialogService);

  dataSource = computed(() => this.trainingStore.trainings().map(training => ({
    name: training.category,
    exercisesCount: training.exercises.length
  })));

  constructor( public dialogRef: MatDialogRef<ModifyTrainingDialogComponent> ) {}

  ngOnInit() {
    this.trainingStore.loadTrainings();
  }

  onAddTraining(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialogService.openDialog(
      AddTrainingDialogComponent,
      {},
      '600px',
      'auto',
      enterAnimationDuration,
      exitAnimationDuration
    );
  }

  onRemoveTraining(trainingName: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const messages = { 
      confirmMessage: "Czy na pewno chcesz usunąć wybrany trening z twojego planu treningowego? Gdy to zrobisz, cała historia związana z tym treningiem w planie treningowym zostanie trwale usunięta.",
      successMessage: "Pomyślnie usunięto wybrany trening z twojego planu treningowego." 
    };

    this.dialogService.openDialog(
      RemovingConfirmDialogComponent,
      { type: 'training', messages, trainingName },
      '700px',
      'auto',
      enterAnimationDuration,
      exitAnimationDuration
    );
  }

  onClose(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
