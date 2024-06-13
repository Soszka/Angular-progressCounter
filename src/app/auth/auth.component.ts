import { Component, inject, input } from '@angular/core';
import { takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { patchState } from '@ngrx/signals';
import { MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from '../shared/services/dialog.service';

export interface ExampleUser {
  name: string;
  email: string;
  password: string;
}

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
    InfoDialogComponent  
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  navBackground = input('linear-gradient(to top, rgb(47, 202, 0), rgb(11, 46, 0))');
  footerBackground = input('linear-gradient(to right, rgb(23, 207, 6), rgb(15, 58, 2))');
  footerAuthorColor = input('rgb(24, 230, 5)');
  expandedLinkColor = input('rgb(0, 105, 23)');
  expandedActiveLinkColor = input('white');
  expandedActiveLinkBg = input('linear-gradient(to bottom, rgb(23, 207, 6), rgb(15, 58, 2))');
  subtitle = input('Zacznij od ...');
  title = input('Zalogowania');
  titleColor = input('rgb(19, 168, 14)');

  displayedColumns: string[] = ['name', 'email', 'password'];
  dataSource!: ExampleUser[]

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  errorMessage = '';
  hide = true;
  user: User | null = null

  exampleUsers: ExampleUser[] = [
    { name: 'Użytkownik 1', email: 'tester1@tester.com', password: 'Tester1' },
    { name: 'Użytkownik 2', email: 'tester2@tester.com', password: 'Tester2' },
    { name: 'Użytkownik 3', email: 'tester3@tester.com', password: 'Tester3' },
  ];
  loginDescription = `Aplikacja nie posiada możliwości założenia konta. Istnieje jednak możliwość przetestowania aplikacji wybierając
    jedno z trzech kont testowych z poniższej tabeli. Dane które wprowadzisz po wyborze użytkownika będą 
    zapisywane na serwerze, ale po pewnym czasie zostaną usunięte.` 

  dialog = inject(MatDialog);
  authService = inject(AuthService);
  router = inject(Router);
  auth = inject(Auth)
  store = inject(TrainingsStore);
  dialogService = inject(DialogService)

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.dataSource = this.exampleUsers;
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
        patchState(this.store, { loading: true });
        this.authService.login(emailValue, passwordValue).subscribe({
          next: () => {
            patchState(this.store, { loading: false });
            this.dialogService.openInfoDialog('Pomyślnie zalogowano!', '300ms', '300ms');
          },
          error: () => {
            patchState(this.store, { loading: false });
            this.dialogService.openInfoDialog('Nieprawidłowy email lub hasło! Spróbuj ponownie.', '300ms', '300ms');
          }
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
      this.dialogService.openInfoDialog('Pomyślnie wylogowano!', '300ms', '300ms');
    });
  }
}
