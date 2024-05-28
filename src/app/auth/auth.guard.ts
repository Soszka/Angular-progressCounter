import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../training/training-dialogs/info-dialog/info-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: { information: 'Najpierw musisz się zalogować!' }
      });
      this.router.navigate(['/auth']);
      return false;
    }
  }
}