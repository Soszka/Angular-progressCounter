import { Component, ViewChild, input, inject } from '@angular/core';
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
    TitleComponent
  ],
  templateUrl: './training-exercise.component.html',
  styleUrl: './training-exercise.component.scss'
})
export class TrainingExerciseComponent {
  displayedColumns: string[] = ['date', 'repetitions', 'weight', 'remove'];
  dataSource!: MatTableDataSource<ExerciseDailyData>;
  navBackground = input('linear-gradient(to top, rgb(13, 53, 228), rgb(1, 0, 53))');
  footerBackground = input('linear-gradient(to right, rgb(16, 37, 230), rgb(1, 0, 52))');
  footerAuthorColor = input('rgb(27, 93, 235)');
  subtitle = input("Sprawdź swój ...");
  title = input("TRENING");
  titleColor = input("rgb(4, 1, 172)");
  exerciseName!: string;
  exerciseData!: Exercise;
  store = inject(TrainingsStore);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private trainingService: TrainingService, public dialog: MatDialog) {} 

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
    const dialogRef = this.dialog.open(AddExercisePositionDialogComponent, {
      width: '1000px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadExerciseData(); 
    });
  }

  onRemoveExercise(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const messages = { 
      confirmMessage: "Czy na pewno chcesz usunąć wybrane ćwiczenie z twojego planu treningowego? Gdy to zrobisz, cała historia związana z tym ćwiczeniem zostanie trwale usunięta.",
      successMessage: "Pomyślnie usunięto wybrane ćwiczenie z twojego planu treningowego." 
    };
    this.dialog.open(RemovingConfirmDialogComponent, {
      width: '600px',
      data: { 
        type: 'exercise', 
        trainingName: this.trainingService.getCurrentTrainingName(), 
        exerciseName: this.exerciseName, 
        messages 
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  
  onRemovePosition(enterAnimationDuration: string, exitAnimationDuration: string, date: string): void {
    const messages = { 
      confirmMessage: "Czy na pewno chcesz usunąć wybraną pozycję?",
      successMessage: "Pomyślnie usunięto wybraną pozycję z historii twojego ćwiczenia" 
    };
    const dialogRef = this.dialog.open(RemovingConfirmDialogComponent, {
      width: '600px',
      data: { 
        type: 'position', 
        trainingName: this.trainingService.getCurrentTrainingName(), 
        exerciseName: this.exerciseName, 
        date, 
        messages 
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.loadExerciseData(); 
    });
  }
}
