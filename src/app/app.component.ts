import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DialogService } from './shared/services/dialog.service';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Licznik Progressu';
  dialogService = inject(DialogService);

  ngOnInit() {
    AOS.init({
      once: true,
      duration: 1250,
    });
  }
}
