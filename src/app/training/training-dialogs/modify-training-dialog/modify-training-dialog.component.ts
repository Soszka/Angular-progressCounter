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
  dialog = inject(MatDialog)

  dataSource = computed(() => this.trainingStore.trainings().map(training => ({
    name: training.category,
    exercisesCount: training.exercises.length
  })));

  constructor( public dialogRef: MatDialogRef<ModifyTrainingDialogComponent> ) {}

  ngOnInit() {
    this.trainingStore.loadTrainings();
  }

  onAddTraining(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.enterAnimationDuration = enterAnimationDuration;
    dialogConfig.exitAnimationDuration = exitAnimationDuration;

    if (window.innerWidth <= 768) {
      dialogConfig.width = '100vw';
      dialogConfig.height = '100vh';
      dialogConfig.maxWidth = '100vw';
      dialogConfig.maxHeight = '100vh';
    } else {
      dialogConfig.width = 'auto';
      dialogConfig.height = 'auto';
    }
    this.dialog.open(AddTrainingDialogComponent, dialogConfig );
  }

  onRemoveTraining(trainingName: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const messages = { 
      confirmMessage: "Czy na pewno chcesz usunąć wybrany trening z twojego planu treningowego? Gdy to zrobisz, cała historia związana z tym treningiem w planie treningowym zostanie trwale usunięta.",
      successMessage: "Pomyślnie usunięto wybrany trening z twojego planu treningowego." 
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { type: 'training', messages, trainingName };
    dialogConfig.enterAnimationDuration = enterAnimationDuration;
    dialogConfig.exitAnimationDuration = exitAnimationDuration;

    if (window.innerWidth <= 768) {
      dialogConfig.width = '100vw';
      dialogConfig.height = '100vh';
      dialogConfig.maxWidth = '100vw';
      dialogConfig.maxHeight = '100vh';
    } else {
      dialogConfig.width = '700px';
      dialogConfig.height = 'auto';
    }

    this.dialog.open(RemovingConfirmDialogComponent, dialogConfig);
  }

  onClose(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
