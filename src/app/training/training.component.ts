import { Component, input } from '@angular/core';
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
    TrainingExerciseComponent,
  ],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss',
})
export class TrainingComponent {
  navBackground = input('rgba(0, 0, 100)');
  footerBackground = input('rgba(0, 0, 100)');
  expandedLinkColor = input('rgb(1, 3, 139)');
  expandedActiveLinkColor = input('white');
  expandedActiveLinkBg = input('rgba(0, 0, 100)');
  subtitle = input('Sprawdź swój ...');
  title = input('TRENING');
  titleColor = input('rgba(0, 0, 120)');
}
