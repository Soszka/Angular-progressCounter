import { Component } from '@angular/core';
import { NavigationComponent } from '../../shared/navigation/navigation.component';

@Component({
  selector: 'app-home-splash',
  standalone: true,
  imports: [NavigationComponent],
  templateUrl: './home-splash.component.html',
  styleUrl: './home-splash.component.scss'
})
export class HomeSplashComponent {
  navBackground: string = 'purple';
}
