import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { information: 'Najpierw musisz się zalogować!' };

      if (window.innerWidth <= 768) {
        dialogConfig.width = '100vw';
        dialogConfig.height = '100vh';
        dialogConfig.maxWidth = '100vw';
        dialogConfig.maxHeight = '100vh';
      } else {
        dialogConfig.width = '550px';
      }

      this.dialog.open(InfoDialogComponent, dialogConfig);
      this.router.navigate(['/auth']);
      return false;
    }
  }
}