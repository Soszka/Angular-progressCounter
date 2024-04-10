import { Component } from '@angular/core';
import { HomeAdventagesComponent } from './home-adventages/home-adventages.component';
import { HomeSplashComponent } from './home-splash/home-splash.component';
import { HomeFeaturesComponent } from './home-features/home-features.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeAdventagesComponent, HomeSplashComponent, HomeFeaturesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
