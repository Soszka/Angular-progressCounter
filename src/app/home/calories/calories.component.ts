import { Component, input } from '@angular/core';
import { NavigationComponent } from '../../shared/navigation/navigation.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { TitleComponent } from '../../shared/title/title.component';
import { CaloriesCarouselComponent } from './calories-carousel/calories-carousel.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-calories',
  standalone: true,
  imports: [
    TitleComponent,
    CaloriesCarouselComponent,
    ButtonComponent,
    MatCard,
    MatIcon,
  ],
  templateUrl: './calories.component.html',
  styleUrl: './calories.component.scss',
})
export class CaloriesComponent {
  subtitle = input('Pomyśl o ...');
  title = input('KALORIACH');
  titleColor = input('rgba(0, 0, 150)');

  description = `Liczenie kalorii jest to zbyt obszerna dziedzina, żeby zmieścić informacje na 
    jej temat na jednej podstronie. Dlatego też kaloriom została poświęcona 
    całkowicie odrębna aplikacja. Jeżli intersuje cie tematyka zapotrzebowania kalorycznego 
    czy też monitorowania dziennego spożycia kalorycznego
    kliknij w przycisk poniżej a na pewno się nie zawiedziesz !`;
}
