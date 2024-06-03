import { Component, input } from '@angular/core';
import { NavigationComponent } from '../shared/navigation/navigation.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { TitleComponent } from '../shared/title/title.component';
import { CaloriesCarouselComponent } from './calories-carousel/calories-carousel.component';
import { ButtonComponent } from '../shared/button/button.component';

@Component({
  selector: 'app-calories',
  standalone: true,
  imports: [
    NavigationComponent, 
    FooterComponent, 
    TitleComponent, 
    CaloriesCarouselComponent,
    ButtonComponent
  ],
  templateUrl: './calories.component.html',
  styleUrl: './calories.component.scss'
})
export class CaloriesComponent {
  navBackground = input('linear-gradient(to top, rgb(19, 0, 0), rgb(128, 0, 0))');
  footerBackground = input('linear-gradient(to right, rgb(130, 0, 0), rgb(40, 0, 0))');
  footerAuthorColor = input('rgb(210, 9, 9)');
  expandedLinkColor = input('rgb(94, 0, 0)');
  expandedActiveLinkColor = input('white');
  expandedActiveLinkBg = input('linear-gradient(to bottom, rgb(19, 0, 0), rgb(128, 0, 0))');
  subtitle = input("Pomyśl o ...");
  title = input("KALORIACH");
  titleColor = input("rgb(100, 0, 0)")

  description = `Liczenie kalorii jest to zbyt obszerna dziedzina, żeby zmieścić informacje na 
    jej temat na jednej podstronie. Dlatego też kaloriom została poświęcona 
    całkowicie odrębna aplikacja. Jeżli intersuje cie tematyka zapotrzebowania kalorycznego 
    czy też monitorowania dziennego spożycia kalorycznego
    kliknij w przycisk poniżej a na pewno się nie zawiedziesz !`
}

