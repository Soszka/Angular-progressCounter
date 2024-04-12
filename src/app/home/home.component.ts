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
  footerBackground = 'linear-gradient(to right, rgb(141, 0, 197), rgb(18, 0, 29))';
  footerAuthorColor = 'rgb(171, 19, 231)';
}
