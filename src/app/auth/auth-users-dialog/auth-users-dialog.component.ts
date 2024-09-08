import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ButtonComponent } from '../../shared/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface ExampleUser {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-auth-users-dialog',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    ButtonComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './auth-users-dialog.component.html',
  styleUrl: './auth-users-dialog.component.scss',
})
export class AuthUsersDialogComponent {
  displayedColumns: string[] = ['name', 'email', 'password'];
  dataSource!: ExampleUser[];
  dialog = inject(MatDialog);

  exampleUsers: ExampleUser[] = [
    { name: 'Użytkownik 1', email: 'tester1@tester.com', password: 'Tester1' },
    { name: 'Użytkownik 2', email: 'tester2@tester.com', password: 'Tester2' },
    { name: 'Użytkownik 3', email: 'tester3@tester.com', password: 'Tester3' },
  ];
  loginDescription = `Aplikacja nie posiada możliwości założenia konta. Istnieje jednak możliwość przetestowania aplikacji wybierając
    jedno z trzech kont testowych z poniższej tabeli. Dane które wprowadzisz po wyborze użytkownika będą 
    zapisywane na serwerze, ale po pewnym czasie zostaną usunięte.`;

  constructor(public dialogRef: MatDialogRef<AuthUsersDialogComponent>) {}

  ngOnInit() {
    this.dataSource = this.exampleUsers;
  }

  onClose(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
