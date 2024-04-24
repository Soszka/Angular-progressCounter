import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-training-exercises',
  standalone: true,
  imports: [MatTabsModule, ButtonComponent ],
  templateUrl: './training-exercises.component.html',
  styleUrl: './training-exercises.component.scss'
})
export class TrainingExercisesComponent {

}
