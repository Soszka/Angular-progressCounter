import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../shared/button/button.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NavigationComponent } from '../../../shared/navigation/navigation.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ExerciseDailyData } from '../../training.service';
import { ExerciseUiData } from '../../training.service';
import { TrainingService } from '../../training.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddExercisePositionDialogComponent } from '../../training-dialogs/add-exercise-position-dialog/add-exercise-position-dialog.component';
import { RemovingConfirmDialogComponent } from '../../training-dialogs/removing-confirm-dialog/removing-confirm-dialog.component';


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
  ],
  templateUrl: './training-exercise.component.html',
  styleUrl: './training-exercise.component.scss'
})
export class TrainingExerciseComponent {
  displayedColumns: string[] = ['date', 'repetitions', 'weight', 'remove'];
  dataSource!: MatTableDataSource<ExerciseDailyData>;
  navBackground = 'linear-gradient(to top, rgb(13, 53, 228), rgb(1, 0, 53))';
  footerBackground = 'linear-gradient(to right, rgb(16, 37, 230), rgb(1, 0, 52))';
  footerAuthorColor = 'rgb(27, 93, 235)';
  subtitle = "Sprawdź swój ...";
  title = "TRENING";
  titleColor = "rgb(4, 1, 172)"
  exerciseName!: string;
  exerciseData!: ExerciseUiData;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private route: ActivatedRoute, 
    private trainingService: TrainingService,
    private router: Router,
    public dialog: MatDialog
  ) {} 

  ngAfterViewInit() {
    this.route.paramMap.subscribe(params => {
      const exerciseName = params.get('exercise');
      this.loadExerciseData(exerciseName);
    });
  }

  loadExerciseData(exerciseName: string | null) {
    const exercise = exerciseName ? this.trainingService.findExerciseByName(exerciseName.replace(/-/g, ' ')) : null;
    this.exerciseName = exercise ? exercise.name : 'Nieznane Ćwiczenie';
    this.exerciseData = exercise || this.getDefaultExerciseData();
    this.dataSource = new MatTableDataSource<ExerciseDailyData>(this.exerciseData.dailyData);
    this.dataSource.paginator = this.paginator;
  }

  getDefaultExerciseData(): ExerciseUiData {
    return {
      name: 'Nieznane Ćwiczenie',
      icon: '',
      lastEdited: '',
      maxWeight: 0,
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
    const currentIndex = this.trainingService.allExercises.findIndex(ex => ex.name === this.exerciseData.name);
    const newIndex = (currentIndex + offset + this.trainingService.allExercises.length) % this.trainingService.allExercises.length;
    const newExercise = this.trainingService.allExercises[newIndex];
    this.router.navigate(['/training', newExercise.name.toLowerCase().replace(/ /g, '-')]);
  }

  onAddExercisePosition(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddExercisePositionDialogComponent, {
      width: '1000px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  onRemoveExercise(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const messages = { 
      confirmMessage: "Czy na pewno chcesz usunąć wybrane ćwiczenie z twojego planu treningowego? Gdy to zrobisz, cała historia związana z tym ćwiczeniem zostanie trwale usunięta.",
      successMessage: "Pomyślnie usunięto wybrane ćwiczenie z twojego planu treningowego." 
    }
    this.dialog.open(RemovingConfirmDialogComponent, {
      width: '600px',
      data: { messages },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  onRemovePosition(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const messages = { 
      confirmMessage: "Czy na pewno chcesz usunąć wybraną pozycję ?",
      successMessage: "Pomyślnie usunięto wybraną pozycję z historii twojego ćwiczenia" 
    }
    this.dialog.open(RemovingConfirmDialogComponent, {
      width: '600px',
      data: { messages },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
