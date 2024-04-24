import { Component } from '@angular/core';
import { TitleComponent } from '../../shared/title/title.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-features',
  standalone: true,
  imports: [TitleComponent, MatIconModule],
  templateUrl: './home-features.component.html',
  styleUrl: './home-features.component.scss'
})
export class HomeFeaturesComponent {
  subtitle = "Co znajdziesz na ...";
  title = "Stronie";
  titleColor = "rgba(0, 0, 150)"
  features = [
    { 
      icon: 'fitness_center', 
      title: 'DODAWANIE TRENINGÓW', 
      description: 'Stwórz indywidualne plany treningowe odpowiadające Twoim celom.' 
    },
    { 
      icon: 'timeline', 
      title: 'ANALIZA POSTĘPÓW', 
      description: 'Obserwuj swoje postępy i wyniki, mierząc rozwój swoich umiejętności.' 
    },
    { 
      icon: 'access_time', 
      title: 'ZARZĄDZANIE CZASEM', 
      description: 'Zaplanuj treningi i zarządzaj czasem efektywnie, by osiągnąć maksymalny progres.' 
    },
    { 
      icon: 'trending_up', 
      title: 'ANALIZA WYNIKÓW', 
      description: 'Analityczne przeglądy Twoich osiągnięć pomogą w dostosowaniu treningów.' 
    },
    { 
      icon: 'flag', 
      title: 'OSIĄGANIE CELÓW', 
      description: 'Ustawiaj realistyczne cele i obserwuj ich spełnienie, by motywować się do pracy.' 
    },
    { 
      icon: 'bar_chart', 
      title: 'STATYSTYKI I RAPORTY', 
      description: 'Otrzymuj szczegółowe raporty i analizy dotyczące Twojej aktywności treningowej.' 
    }
  ];
}
