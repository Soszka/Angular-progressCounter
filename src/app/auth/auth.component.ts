import { Component } from '@angular/core';
import { takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { merge } from 'rxjs';
import { NavigationComponent } from '../shared/navigation/navigation.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { TitleComponent } from '../shared/title/title.component';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NavigationComponent, 
    FooterComponent, 
    TitleComponent, 
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
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

  email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage = '';
  hide = true;

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'Musisz wprowadzić wartość';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Nieprawidłowy email';
    } else {
      this.errorMessage = '';
    }
  }
}
