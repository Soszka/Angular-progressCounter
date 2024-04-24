import { Component } from '@angular/core';
import { TitleComponent } from '../../shared/title/title.component';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-home-faq',
  standalone: true,
  imports: [TitleComponent, MatExpansionModule],
  templateUrl: './home-faq.component.html',
  styleUrl: './home-faq.component.scss'
})
export class HomeFaqComponent {
  subtitle = "Najczęściej zadawane ...";
  title = "pytania";
  titleColor = "rgba(0, 0, 150)";
  faqs = [
    { 
      question: 'Jak zacząć korzystać z aplikacji ?', 
      answer: 'Rozpoczęcie pracy z naszą aplikacją jest proste! Zaloguj się, ustaw swój plan treningowy i zacznij śledzić swoje sesje treningowe już dziś.' 
    },
    { 
      question: 'Czy mogę śledzić różne rodzaje aktywności ?', 
      answer: 'Nie, nasza aplikacja nie pozwala na monitorowanie różnorodnych form aktywności fizycznej. Skupia się wyłącznie na treningu siłowym' 
    },
    { 
      question: 'Jak mogę ustawić cele treningowe ?', 
      answer: 'Możesz ustawić swoje cele treningowe w sekcji  TRENING, gdzie określisz swoje cele dotyczące siły jaką planujesz osiągnąć' 
    },
    { 
      question: 'Czy aplikacja oferuje spersonalizowane plany treningowe ?', 
      answer: 'Tak, nasz system analizuje Twoje dotychczasowe postępy i proponuje dostosować plany treningowe, aby pomóc Ci osiągnąć optymalne wyniki.' 
    },
    { 
      question: 'Jak aplikacja pomaga w monitorowaniu postępu ?', 
      answer: 'Aplikacja zbiera dane z każdego treningu, analizuje je i prezentuje w formie przejrzystych wykresów, które pokazują Twoje postępy w czasie.' 
    },
    { 
      question: 'Jak mogę monitorować swoje spalanie kalorii ?', 
      answer: 'Aplikacja nie skupia się na spalaniu kalorii. Jest ona przeznaczona do monitorowania progresu siłowego. Jeżeli jednak intersuje cie tematyka zapotrzebowaia kalorycznego to w zakładce KALORIE znajdziesz link do strony, która na pewno cię zainteresuje' 
    },
    { 
      question: 'Czy mogę zmienić język apliakcji ?', 
      answer: 'Niestety nie ma możliwości zmiany języku aplikacji. Korzystać z niej można tylko i wyłącznie w języku polskim' 
    }
  ];

  panelOpenState = false;
}
