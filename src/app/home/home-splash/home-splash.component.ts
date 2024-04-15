import { Component } from '@angular/core';
import { NavigationComponent } from '../../shared/navigation/navigation.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-splash',
  standalone: true,
  imports: [NavigationComponent, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './home-splash.component.html',
  styleUrl: './home-splash.component.scss'
})
export class HomeSplashComponent {
  navBackground: string = 'inherit';
  title: string = 'Licznik Progresu';
  subtitle: string = 'Regularnie monitoruj i osiągaj swoje cele treningowe';
  description = `Licznik Progresu to Twoje centrum zarządzania treningiem, które pomaga śledzić postępy,
   planować sesje treningowe i osiągać cele siłowe szybciej i efektywniej. Niezależnie od tego, 
   czy jesteś nowicjuszem, czy zaawansowanym sportowcem, nasze narzędzie dostosuje się do Twoich potrzeb.
  `;

  constructor(private router: Router) {}

  navigateToAuth() {
    this.router.navigate(['/auth']); 
  }
}
