import { Component, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../shared/button/button.component';
import { merge } from 'rxjs';
import { NavigationComponent } from '../shared/navigation/navigation.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { TitleComponent } from '../shared/title/title.component';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { TrainingsStore } from '../store/trainings.store';
import { InfoDialogComponent } from '../training/training-dialogs/info-dialog/info-dialog.component';
import { DialogService } from '../shared/services/dialog.service';
import { AuthUsersDialogComponent } from './auth-users-dialog/auth-users-dialog.component';

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
    MatButtonModule,
    ButtonComponent,
    MatTableModule,
    InfoDialogComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  footerBackground = input('inherit');
  footerAuthorColor = input('white');
  navBackground = input('inherit');
  expandedLinkColor = input('white');
  expandedActiveLinkColor = input('rgb(17, 0, 78)');
  expandedActiveLinkBg = input('white');
  subtitle = input('Zacznij od ...');
  title = input('Zalogowania');
  titleColor = input('rgba(0, 0, 130)');

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  errorMessage = '';
  hide = true;
  user: User | null = null;

  dialog = inject(MatDialog);
  authService = inject(AuthService);
  router = inject(Router);
  auth = inject(Auth);
  store = inject(TrainingsStore);
  dialogService = inject(DialogService);

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
    });
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

  onLogin() {
    if (this.email.valid && this.password.valid) {
      const emailValue = this.email.value;
      const passwordValue = this.password.value;

      if (emailValue !== null && passwordValue !== null) {
        this.store.setLoadingTrue();
        this.authService.login(emailValue, passwordValue).subscribe({
          next: () => {
            this.store.setLoadingFalse();
            this.dialogService.openInfoDialog(
              'Pomyślnie zalogowano!',
              '300ms',
              '300ms'
            );
          },
          error: () => {
            this.store.setLoadingFalse();
            this.dialogService.openInfoDialog(
              'Nieprawidłowy email lub hasło! Spróbuj ponownie.',
              '300ms',
              '300ms'
            );
          },
        });
      }
    }
  }

  get logoutDescription(): string {
    if (this.user) {
      return `Jesteś obecnie zalogowany jako użytkownik o adresie mailowym: ${this.user.email}. 
      Możesz teraz modyfikować swój trening w sekcji z treningami i weryfikować swoje rezultaty w sekcji progresu. 
      Kliknij przycisk poniżej aby się wylogować.`;
    }
    return '';
  }

  onLogout() {
    this.authService.logout().subscribe(() => {
      this.user = null;
      this.dialogService.openInfoDialog(
        'Pomyślnie wylogowano!',
        '300ms',
        '300ms'
      );
    });
  }

  showUsersDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialogService.openDialog(
      AuthUsersDialogComponent,
      {},
      'auto',
      'auto',
      enterAnimationDuration,
      exitAnimationDuration
    );
  }
}
