import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../shared/button/button.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


export interface ExerciseElement {
  date: string;
  repetitions: number;
  weight: number;
}

const ExerciseElements: ExerciseElement[] = [
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
  imports: [MatIconModule, ButtonComponent, MatTableModule, MatPaginatorModule],
  templateUrl: './training-exercise.component.html',
  styleUrl: './training-exercise.component.scss'
})
export class TrainingExerciseComponent {
  displayedColumns: string[] = ['date', 'repetitions', 'weight', 'remove'];
  dataSource = new MatTableDataSource<ExerciseElement>(ExerciseElements);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
