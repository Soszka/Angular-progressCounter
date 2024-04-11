import { Component } from '@angular/core';
import { NavigationComponent } from './shared/navigation/navigation.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavigationComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Licznik Progressu';
}
