import { Component } from '@angular/core';
import { NavigationComponent } from '../shared/navigation/navigation.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { TitleComponent } from '../shared/title/title.component';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [NavigationComponent, FooterComponent, TitleComponent],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent {
  navBackground: string = 'linear-gradient(to top, rgb(153, 153, 153),rgb(27, 27, 27))';
  footerBackground = 'linear-gradient(to right, rgb(153, 153, 153),rgb(27, 27, 27))';
  footerAuthorColor = 'rgb(218, 218, 218)';
  subtitle = "Przeanalizuj swój ...";
  title = "POSTĘP";
  titleColor = "rgb(120, 120, 120)"
}
