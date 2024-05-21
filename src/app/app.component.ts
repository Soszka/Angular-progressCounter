import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, LoadingSpinnerComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Licznik Progressu';
}
