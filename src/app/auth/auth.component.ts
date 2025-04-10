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
import { DialogService } from '../shared/services/dialog.service';
import { AuthUsersDialogComponent } from './auth-users-dialog/auth-users-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatSnackBarModule,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  footerBackground = input('inherit');
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
  snackBar = inject(MatSnackBar);

  testButtonLabel = 'Kliknij tutaj aby przetestować aplikację';

  // Dynamic logout items to be rendered using *ngFor
  logoutItems = [
    {
      icon: 'fitness_center',
      text: 'modyfikować swój trening w sekcji z treningami',
    },
    {
      icon: 'add_circle_outline',
      text: 'dodawać nowe ćwiczenia oraz pozycje',
    },
    {
      icon: 'show_chart',
      text: 'analizować wykresy w sekcji z postępem',
    },
    {
      icon: 'recommend',
      text: 'otrzymywać odpowiednie rekomendacje',
    },
  ];

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

      if (emailValue && passwordValue) {
        this.store.setLoadingTrue();
        this.authService.login(emailValue, passwordValue).subscribe({
          next: () => {
            this.store.setLoadingFalse();
            this.router.navigate(['/training']);
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
    } else {
      this.dialogService.openInfoDialog(
        'Uzupełnij poprawnie wszystkie pola!',
        '300ms',
        '300ms'
      );
    }
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

  onTestButtonClick(): void {
    if (this.testButtonLabel === 'Kliknij tutaj aby przetestować aplikację') {
      this.email.setValue('tester1@tester.com');
      this.password.setValue('Tester1');
      this.snackBar.open(
        'Wprowadzono dane testowego użytkownika. Teraz kliknij " Zaloguj "',
        '',
        {
          duration: 7000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        }
      );
      this.testButtonLabel = 'Kliknij tutaj żeby wybrać innych użytkowników';
    } else {
      this.showUsersDialog('300ms', '300ms');
    }
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
