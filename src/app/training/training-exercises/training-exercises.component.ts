import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ButtonComponent } from '../../shared/button/button.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TrainingService } from '../training.service';
import { ExerciseUiData } from '../training.service';
import { MatDialog } from '@angular/material/dialog';
import { AddExerciseDialogComponent } from '../training-dialogs/add-exercise-dialog/add-exercise-dialog.component';

@Component({
  selector: 'app-training-exercises',
  standalone: true,
  imports: [ 
    MatTabsModule, 
    ButtonComponent, 
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './training-exercises.component.html',
  styleUrl: './training-exercises.component.scss'
})
export class TrainingExercisesComponent {
  pushExercises!: ExerciseUiData[];
  pullExercises!: ExerciseUiData[];
  legsExercises!: ExerciseUiData[];
  exerciseName!: string; 

  constructor(
    private router: Router,
    private trainingService: TrainingService,
    public dialog: MatDialog) {} 

  ngOnInit() {
    this.pushExercises = this.trainingService.exercises.pushExercises;
    this.pullExercises = this.trainingService.exercises.pullExercises;
    this.legsExercises = this.trainingService.exercises.legsExercises;
  }

  onEditClick(exerciseName: string) {
    const formattedName = exerciseName.toLowerCase().replace(' ', '-');
    this.router.navigate(['/training', formattedName]);
  }

  onAddExercise(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddExerciseDialogComponent, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
