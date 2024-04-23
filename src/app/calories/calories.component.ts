import { Component } from '@angular/core';
import { NavigationComponent } from '../shared/navigation/navigation.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { TitleComponent } from '../shared/title/title.component';
import { CaloriesCarouselComponent } from './calories-carousel/calories-carousel.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-calories',
  standalone: true,
  imports: [
    NavigationComponent, 
    FooterComponent, 
    TitleComponent, 
    CaloriesCarouselComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './calories.component.html',
  styleUrl: './calories.component.scss'
})
export class CaloriesComponent {
  navBackground = 'linear-gradient(to top, rgb(19, 0, 0), rgb(128, 0, 0))';
  footerBackground = 'linear-gradient(to right, rgb(130, 0, 0), rgb(40, 0, 0))';
  footerAuthorColor = 'rgb(210, 9, 9)';
  subtitle = "Pomyśl o ...";
  title = "KALORIACH";
  titleColor = "rgb(100, 0, 0)"
}

