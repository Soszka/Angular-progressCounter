import { Component, input } from '@angular/core';
import { HomeAdventagesComponent } from './home-adventages/home-adventages.component';
import { HomeSplashComponent } from './home-splash/home-splash.component';
import { HomeFeaturesComponent } from './home-features/home-features.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { HomeFaqComponent } from './home-faq/home-faq.component';
import { CaloriesComponent } from './calories/calories.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeAdventagesComponent,
    HomeSplashComponent,
    HomeFeaturesComponent,
    HomeFaqComponent,
    FooterComponent,
    CaloriesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  footerBackground = input('rgb(0, 30, 94)');
  footerAuthorColor = input('rgb(27, 93, 235)');
}
