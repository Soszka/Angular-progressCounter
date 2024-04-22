import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home-adventages',
  standalone: true,
  imports: [MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './home-adventages.component.html',
  styleUrl: './home-adventages.component.scss'
})
export class HomeAdventagesComponent {

  headerTitle: string = "Dlaczego warto monitorować progres siłowy ?";
  descriptionText: string = `Monitorowanie postępów siłowych umożliwia precyzyjne śledzenie rozwoju i 
    efektywności treningów. Dzięki regularnej analizie wyników, można szybko zidentyfikować, 
    które metody są najbardziej efektywne, dostosować plany treningowe do aktualnych potrzeb oraz zapewnić ciągłą adaptację i 
    optymalizację procesu treningowego, co prowadzi do stałej poprawy wyników.`;

  constructor(private router: Router) {}

  navigateToProgress() {
    this.router.navigate(['/progress']); 
  }
}
