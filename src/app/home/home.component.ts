import { Component } from '@angular/core';
import { HomeAdventagesComponent } from './home-adventages/home-adventages.component';
import { HomeSplashComponent } from './home-splash/home-splash.component';
import { HomeFeaturesComponent } from './home-features/home-features.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeAdventagesComponent, HomeSplashComponent, HomeFeaturesComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  footerBackground = 'linear-gradient(to right, rgb(5, 7, 146), rgb(3, 3, 41))';
  footerAuthorColor = 'rgb(27, 93, 235)';
}
