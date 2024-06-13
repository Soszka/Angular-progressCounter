import { Component, ViewChild, input, inject, effect} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../shared/button/button.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NavigationComponent } from '../../../shared/navigation/navigation.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../../shared/title/title.component';
import { MatButtonModule } from '@angular/material/button';
import { TrainingService} from '../../training.service';
import { Exercise, ExerciseDailyData } from '../../training.model';
import { MatDialog } from '@angular/material/dialog';
import { AddExercisePositionDialogComponent } from '../../training-dialogs/add-exercise-position-dialog/add-exercise-position-dialog.component';
import { RemovingConfirmDialogComponent } from '../../training-dialogs/removing-confirm-dialog/removing-confirm-dialog.component';
import { TrainingsStore } from '../../../store/trainings.store';
import { MatDialogConfig } from '@angular/material/dialog';
import { ExercisePositionDetailsDialogComponent } from '../../training-dialogs/exercise-position-details-dialog/exercise-position-details-dialog.component';
import { DialogService } from '../../../shared/services/dialog.service';

@Component({
  selector: 'app-training-exercise',
  standalone: true,
  imports: [ 
    MatIconModule, 
    ButtonComponent, 
    MatTableModule, 
    MatPaginatorModule,
    NavigationComponent, 
    FooterComponent,
    CommonModule,
    MatButtonModule,
    TitleComponent,
  ],
  templateUrl: './training-exercise.component.html',
  styleUrl: './training-exercise.component.scss'
})
export class TrainingExerciseComponent {

  displayedColumns: string[] = ['date', 'repetitions', 'weight', 'remove', 'details'];
  dataSource!: MatTableDataSource<ExerciseDailyData>;
  navBackground = input('linear-gradient(to top, rgb(13, 53, 228), rgb(1, 0, 53))');
  footerBackground = input('linear-gradient(to right, rgb(16, 37, 230), rgb(1, 0, 52))');
  footerAuthorColor = input('rgb(27, 93, 235)');
  expandedLinkColor = input('rgb(1, 3, 139)');
  subtitle = input("Sprawdź swój ...");
  title = input("TRENING");
  titleColor = input("rgb(4, 1, 172)");
  exerciseName!: string;
  exerciseData!: Exercise;

  store = inject(TrainingsStore);
  trainingService = inject(TrainingService);
  dialogService = inject(DialogService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.loadExerciseData();
  }

  loadExerciseData() {
    const exercise = this.trainingService.getCurrentExercise();
    this.exerciseName = exercise ? exercise.name : 'Nieznane Ćwiczenie';
    this.exerciseData = exercise || this.getDefaultExerciseData();
    this.exerciseData.dailyData.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
    this.dataSource = new MatTableDataSource<ExerciseDailyData>(this.exerciseData.dailyData);
    this.dataSource.paginator = this.paginator;
  }

  getDefaultExerciseData(): Exercise {
    this.trainingService.store.loadTrainings();
    return {
      name: 'Nieznane Ćwiczenie',
      dailyData: [] 
    };
  }

  nextExercise() {
    this.navigateExercise(1);
  }
  
  previousExercise() {
    this.navigateExercise(-1);
  }

  private navigateExercise(offset: number) {
    this.trainingService.setCurrentIndex(this.trainingService.currentIndex() + offset);
    this.loadExerciseData();
  }


  onAddExercisePosition(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialogService.openDialog(
      AddExercisePositionDialogComponent, 
      {}, 
      '1000px', 
      'auto',
      enterAnimationDuration,
      exitAnimationDuration
    ).afterClosed().subscribe(() => {
      this.loadExerciseData(); 
    });
  }

  onRemoveExercise(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const messages = {
      confirmMessage: "Czy na pewno chcesz usunąć wybrane ćwiczenie z twojego planu treningowego? Gdy to zrobisz, cała historia związana z tym ćwiczeniem zostanie trwale usunięta.",
      successMessage: "Pomyślnie usunięto wybrane ćwiczenie z twojego planu treningowego."
    };
  
    const data = {
      type: 'exercise',
      trainingName: this.trainingService.getCurrentTrainingName(),
      exerciseName: this.exerciseName,
      messages
    };
  
    this.dialogService.openDialog( 
      RemovingConfirmDialogComponent, 
      data, 
      '600px', 
      'auto',
      enterAnimationDuration, 
      exitAnimationDuration
    ).afterClosed().subscribe(() => {
      this.loadExerciseData(); 
    });
  }
  
  onRemovePosition(enterAnimationDuration: string, exitAnimationDuration: string, date: string): void {
    const messages = {
      confirmMessage: "Czy na pewno chcesz usunąć wybraną pozycję?",
      successMessage: "Pomyślnie usunięto wybraną pozycję z historii twojego ćwiczenia"
    };
  
    const data = {
      type: 'position',
      trainingName: this.trainingService.getCurrentTrainingName(),
      exerciseName: this.exerciseName,
      date,
      messages
    };
  
    this.dialogService.openDialog( 
      RemovingConfirmDialogComponent, 
      data, 
      '600px', 
      'auto',
      enterAnimationDuration, 
      exitAnimationDuration
    ).afterClosed().subscribe(() => {
      this.loadExerciseData(); 
    });
  }

  onShowDetails(date: string, repetitions: number, weight: number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialogService.openDialog(
      ExercisePositionDetailsDialogComponent,
      {
        name: this.exerciseName,
        date,
        repetitions,
        weight
      },
      '100vw',
      '100vh',
      enterAnimationDuration,
      exitAnimationDuration
    ).afterClosed().subscribe(() => {
      this.loadExerciseData();
    });
  }
}
