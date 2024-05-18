import { Component, input } from '@angular/core';
import { NavigationComponent } from '../shared/navigation/navigation.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { TitleComponent } from '../shared/title/title.component';
import { ProgressFormComponent } from './progress-form/progress-form.component';
import { ProgressChartsComponent } from './progress-charts/progress-charts.component';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [ 
    NavigationComponent, 
    FooterComponent, 
    TitleComponent, 
    ProgressFormComponent,
    ProgressChartsComponent
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent {
  navBackground = input('linear-gradient(to top, rgb(224, 0, 0), rgb(46, 0, 0))');
  footerBackground = input('linear-gradient(to right, rgb(201, 8, 8), rgb(78, 0, 0))');
  footerAuthorColor = input('rgb(230, 9, 9)');
  subtitle = input("Przeanalizuj swój ...");
  title = input("POSTĘP");
  titleColor = input("rgb(218, 17, 17)")
}
