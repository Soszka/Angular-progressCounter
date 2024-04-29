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

const ExerciseElements: ExerciseDailyData[] = [
  { date: "2024-03-25", repetitions: 6, "weight": 85 },
  { date: "2024-03-11", repetitions: 6, "weight": 80 },
  { date: "2024-02-25", repetitions: 6, "weight": 75 },
  { date: "2024-02-11", repetitions: 6, "weight": 70 },
  { date: "2024-01-28", repetitions: 6, "weight": 65 },
  { date: "2024-01-14", repetitions: 8, "weight": 60 },
  { date: "2023-12-31", repetitions: 8, "weight": 55 },
  { date: "2023-12-17", repetitions: 8, "weight": 52 },
  { date: "2023-12-03", repetitions: 8, "weight": 50 },
  { date: "2023-11-19", repetitions: 8, "weight": 48 }
]

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
    MatButtonModule
  ],
  templateUrl: './training-exercise.component.html',
  styleUrl: './training-exercise.component.scss'
})
export class TrainingExerciseComponent {
  displayedColumns: string[] = ['date', 'repetitions', 'weight', 'remove'];
  dataSource = new MatTableDataSource<ExerciseDailyData>(ExerciseElements);
  navBackground = 'linear-gradient(to top, rgb(13, 53, 228), rgb(1, 0, 53))';
  footerBackground = 'linear-gradient(to right, rgb(16, 37, 230), rgb(1, 0, 52))';
  footerAuthorColor = 'rgb(27, 93, 235)';
  subtitle = "Sprawdź swój ...";
  title = "TRENING";
  titleColor = "rgb(4, 1, 172)"
  exerciseName!: string;
  exerciseData!: ExerciseUiData; 
  exerciseElements = ExerciseElements;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private route: ActivatedRoute, 
    private trainingService: TrainingService,
    private router: Router) {} 

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const exerciseName = params.get('exercise');
      this.loadExerciseData(exerciseName);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadExerciseData(exerciseName: string | null) {
    const exercise = exerciseName ? this.trainingService.findExerciseByName(exerciseName.replace(/-/g, ' ')) : null;
    this.exerciseName = exercise ? exercise.name : 'Nieznane Ćwiczenie';
    this.exerciseData = exercise || this.getDefaultExerciseData();
    this.dataSource.data = this.exerciseElements;
  }

  getDefaultExerciseData(): ExerciseUiData {
    return {
      name: 'Nieznane Ćwiczenie',
      icon: '',
      lastEdited: '',
      maxWeight: 0, 
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
}
