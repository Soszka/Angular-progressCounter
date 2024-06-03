import { Component, input, inject} from '@angular/core';
import { NavigationComponent } from '../../shared/navigation/navigation.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-splash',
  standalone: true,
  imports: [NavigationComponent, ButtonComponent],
  templateUrl: './home-splash.component.html',
  styleUrl: './home-splash.component.scss'
})
export class HomeSplashComponent {
  navBackground = input('inherit');
  expandedLinkColor = input('white');
  expandedActiveLinkColor = input('rgb(17, 0, 78)');
  expandedActiveLinkBg = input('white');
  title: string = 'Licznik Progresu';
  subtitle: string = 'Regularnie monitoruj i osiągaj swoje cele treningowe';
  description = `Licznik Progresu to Twoje centrum zarządzania treningiem, które pomaga śledzić postępy,
   planować sesje treningowe i osiągać cele siłowe szybciej i efektywniej. Niezależnie od tego, 
   czy jesteś nowicjuszem, czy zaawansowanym sportowcem, nasze narzędzie dostosuje się do Twoich potrzeb.
  `;

  router = inject(Router)

  navigateToAuth() {
    this.router.navigate(['/auth']); 
  }
}
