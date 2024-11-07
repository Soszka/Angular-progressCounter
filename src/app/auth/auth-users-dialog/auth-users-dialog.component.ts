import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../../shared/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatSnackBarModule,
    MatTooltipModule,
  ],
  templateUrl: './auth-users-dialog.component.html',
  styleUrls: ['./auth-users-dialog.component.scss'],
})
export class AuthUsersDialogComponent {
  displayedColumns: string[] = ['name', 'email', 'password'];
  dataSource!: ExampleUser[];
  clipboard = inject(Clipboard);
  snackBar = inject(MatSnackBar);

  exampleUsers: ExampleUser[] = [
    { name: 'Użytkownik 1', email: 'tester1@tester.com', password: 'Tester1' },
    { name: 'Użytkownik 2', email: 'tester2@tester.com', password: 'Tester2' },
    { name: 'Użytkownik 3', email: 'tester3@tester.com', password: 'Tester3' },
  ];
  loginDescription = `Aplikacja nie posiada możliwości założenia konta. Istnieje jednak możliwość przetestowania aplikacji wybierając
    jedno z trzech kont testowych.`;

  constructor(public dialogRef: MatDialogRef<AuthUsersDialogComponent>) {}

  ngOnInit() {
    this.dataSource = this.exampleUsers;
  }

  onClose(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  copyToClipboard(value: string): void {
    this.clipboard.copy(value);
    this.snackBar.open('Skopiowano do schowka', '', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
    this.dialogRef.close();
  }
}
