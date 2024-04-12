import { Component } from '@angular/core';
import { NavigationComponent } from '../shared/navigation/navigation.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { TitleComponent } from '../shared/title/title.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NavigationComponent, FooterComponent, TitleComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  navBackground = 'linear-gradient(to top, rgb(47, 202, 0),rgb(11, 46, 0))';
  footerBackground = 'linear-gradient(to right, rgb(23, 207, 6), rgb(15, 58, 2))';
  footerAuthorColor = 'rgb(24, 230, 5)';
  subtitle = "Zacznij od ...";
  title = "Zalogowania";
  titleColor = "rgb(19, 168, 14)"
}
