import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { inject } from '@angular/core';
import { TrainingsStore } from '../store/trainings.store';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [ MatProgressSpinnerModule ],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
  store = inject(TrainingsStore);
  isLoading = this.store.loading;
}
