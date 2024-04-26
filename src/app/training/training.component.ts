import { Component } from '@angular/core';
import { NavigationComponent } from '../shared/navigation/navigation.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { TitleComponent } from '../shared/title/title.component';
import { TrainingExercisesComponent } from './training-exercises/training-exercises.component';
import { TrainingDescriptionComponent } from './training-description/training-description.component';
import { TrainingExerciseComponent } from './training-exercises/training-exercise/training-exercise.component';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [ 
    NavigationComponent, 
    FooterComponent, 
    TitleComponent,
    TrainingExercisesComponent,
    TrainingDescriptionComponent,
    TrainingExerciseComponent
  ],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss'
})
export class TrainingComponent {
  navBackground = 'linear-gradient(to top, rgb(13, 53, 228), rgb(1, 0, 53))';
  footerBackground = 'linear-gradient(to right, rgb(16, 37, 230), rgb(1, 0, 52))';
  footerAuthorColor = 'rgb(27, 93, 235)';
  subtitle = "Sprawdź swój ...";
  title = "TRENING";
  titleColor = "rgb(4, 1, 172)"
}
