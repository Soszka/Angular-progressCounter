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
    ProgressChartsComponent,
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss',
})
export class ProgressComponent {
  navBackground = input('rgb(138, 0, 0)');
  footerBackground = input('rgb(138, 0, 0)');
  expandedLinkColor = input('rgb(145, 0, 0)');
  expandedActiveLinkColor = input('white');
  expandedActiveLinkBg = input('rgb(138, 0, 0)');
  subtitle = input('Przeanalizuj swój ...');
  title = input('POSTĘP');
  titleColor = input('rgb(182, 0, 0)');
}
