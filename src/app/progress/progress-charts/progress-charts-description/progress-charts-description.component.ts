import { Component, inject, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProgressService } from '../../progress.service';

@Component({
  selector: 'app-progress-charts-description',
  standalone: true,
  imports: [ MatCardModule ],
  templateUrl: './progress-charts-description.component.html',
  styleUrl: './progress-charts-description.component.scss'
})
export class ProgressChartsDescriptionComponent {

  progressService = inject(ProgressService);

  sessionCount = computed(() => this.progressService.sessionCount());
  maxWeight = computed(() => this.progressService.maxWeight());
  progress = computed(() => this.progressService.progress());
  selectedPeriod = computed(() => this.progressService.selectedPeriod());

  getRecomendedSessions(range: string): number {
    const sessionsPerMonth = 8;
    const dateRangeMap: { [key: string]: number } = {
      '1m': 1,
      '3m': 3,
      '6m': 6,
      '1y': 12,
      '5y': 60,
    };
    return dateRangeMap[range] * sessionsPerMonth;
  }

  content = computed(() => {
    const sessionCount = this.sessionCount();
    const maxWeight = this.maxWeight();
    const period = this.selectedPeriod();
    const progress = this.progress();
    const range = this.progressService.selectedRange();
    const recomendedSessions = this.getRecomendedSessions(range!);

    if (sessionCount > recomendedSessions && progress) {
      return `W ciągu ${period}, wykonano ${sessionCount} sesji treningowych. Największy ciężar podniesiony w tym okresie to ${maxWeight} kg. 
        Twoje wyniki pokazują znaczącą poprawę siły. Jednż z przyczyn na pewno jest twoja wysoka i regularna częstotliwość treningowa.`;
    } else if (sessionCount > recomendedSessions && !progress) {
      return `W ciągu ${period}, wykonano ${sessionCount} sesji treningowych. Największy ciężar podniesiony w tym okresie to ${maxWeight} kg. 
        Duża częstotliwość sesji treningowych może być przyczyną braku progressu siłowego `;
    } else if (sessionCount <= recomendedSessions && progress) {
      return `W ciągu ${period}, wykonano ${sessionCount} sesji treningowych. Największy ciężar podniesiony w tym okresie to ${maxWeight} kg. 
        Twoje wyniki pokazują znaczącą poprawę siły, pomimo tego, że twoja częstotliwość treningowa nie jest wysoka.`;
    } else {
      return `W ciągu ${period}, wykonano ${sessionCount} sesji treningowych. Największy ciężar podniesiony w tym okresie to ${maxWeight} kg. 
        Nie zaobserwowano znaczącej poprawy siły. Rozważ zwiększenie częstotliwości treningowej.`;
    }
  });

  recommendation = computed(() => {
    const sessionCount = this.sessionCount();
    const progress = this.progress();
    const range = this.progressService.selectedRange();
    const recomendedSessions = this.getRecomendedSessions(range!);
    console.log(progress)

    if (sessionCount > recomendedSessions && progress) {
      return `Gratulacje! Osiągnąłeś świetny wynik dzięki swojej wysokiej częstotliwości treningowej. Upewnij się jednak, że twoje ciało ma wystarczająco dużo czasu na regenerację, aby uniknąć przetrenowania. 
        Kontynuuj monitorowanie swoich postępów i dostosowuj plan treningowy, aby dalej osiągać cele.`;
    } else if (sessionCount > recomendedSessions && !progress) {
      return `Twoja wysoka częstotliwość treningów może prowadzić do przetrenowania i braku postępów. Rozważ zmniejszenie liczby sesji i skup się na jakości treningów oraz odpowiedniej regeneracji.
        Pamiętaj, że regeneracja jest kluczowa dla poprawy siły i wydolności.`;
    } else if (sessionCount <= recomendedSessions && progress) {
      return `Pomimo umiarkowanej częstotliwości treningów osiągnąłeś znaczący progres. To pokazuje, że twoje podejście do treningów jest skuteczne.
        Możesz rozważyć lekkie zwiększenie liczby sesji treningowych, jeśli twoje zdrowie na to pozwala, aby zobaczyć, czy przyniesie to dalsze korzyści.`;
    } else {
      return `Nie zaobserwowano znaczącej poprawy siły. Może to wynikać z niskiej częstotliwości treningów. Zwiększenie liczby sesji treningowych może pomóc przyspieszyć progres.
        Spróbuj stopniowo zwiększać intensywność i częstotliwość treningów, aby zobaczyć lepsze wyniki.`;
    }
  });
}
