import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-progress-charts-description',
  standalone: true,
  imports: [ MatCardModule ],
  templateUrl: './progress-charts-description.component.html',
  styleUrl: './progress-charts-description.component.scss'
})
export class ProgressChartsDescriptionComponent {
  content = `
    W okresie od 19.11.2023 do 23.03.2024 wyciskanie na sztandze płasko wykonano 8 razy. Największy ciężar jaki podniesiono w tym okresie miał miejsce 10.01.2024 i było to 85 kg. 
    Twoje wyniki pokazują znaczącą poprawę w obszarze siły. Warto zauważyć, że regularność treningów, 
    mimo że nie była bardzo wysoka (8 sesji w ciągu około czterech miesięcy), pozwoliła osiągnąć widoczne efekty
   `
   recomendation = `
    Zwiększenie częstotliwości treningów - o ile stan zdrowia na to pozwala, warto rozważyć zwiększenie liczby sesji treningowych, aby jeszcze bardziej przyspieszyć progres.
   `
}
