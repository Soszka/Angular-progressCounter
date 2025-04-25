import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-home-adventages',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './home-adventages.component.html',
  styleUrl: './home-adventages.component.scss',
})
export class HomeAdventagesComponent {
  headerTitle: string = 'Dlaczego warto monitorować progres siłowy ?';
  descriptionText: string = `Monitorowanie postępów siłowych pozwala skutecznie śledzić rozwój i dostosować trening do aktualnych potrzeb, co wspiera stałą poprawę wyników.`;
  router = inject(Router);

  navigateToProgress() {
    this.router.navigate(['/progress']);
  }
}
