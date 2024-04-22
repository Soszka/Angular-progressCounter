import { Component } from '@angular/core';
import { NavigationComponent } from '../shared/navigation/navigation.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { TitleComponent } from '../shared/title/title.component';
import { CaloriesCarouselComponent } from './calories-carousel/calories-carousel.component';

@Component({
  selector: 'app-calories',
  standalone: true,
  imports: [NavigationComponent, FooterComponent, TitleComponent, CaloriesCarouselComponent],
  templateUrl: './calories.component.html',
  styleUrl: './calories.component.scss'
})
export class CaloriesComponent {
  navBackground = 'linear-gradient(to top, rgb(224, 0, 0), rgb(46, 0, 0))';
  footerBackground = 'linear-gradient(to right, rgb(201, 8, 8), rgb(78, 0, 0))';
  footerAuthorColor = 'rgb(230, 9, 9)';
  subtitle = "Pomyśl o ...";
  title = "KALORIACH";
  titleColor = "rgb(218, 17, 17)"
}

