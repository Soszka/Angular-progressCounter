import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent } from 'rxjs';
import { MatDialogConfig } from '@angular/material/dialog';
import { InfoDialogComponent } from '../../training/training-dialogs/info-dialog/info-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialog = inject(MatDialog);
  private originalWidth: number = window.innerWidth;

  constructor() {
    this.initResizeListener();
  }

  private initResizeListener(): void {
    fromEvent(window, 'resize').subscribe(() => this.onResize());
  }

  private onResize(): void {
    const currentWidth = window.innerWidth;
    if (this.originalWidth !== currentWidth) {
      this.closeAllDialogs();
      this.originalWidth = currentWidth; 
    }
  }

  private closeAllDialogs(): void {
    this.dialog.closeAll();
  }

  openDialog(component: any, data: any, width: string, height: string, enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    dialogConfig.enterAnimationDuration = enterAnimationDuration;
    dialogConfig.exitAnimationDuration = exitAnimationDuration;

    if (window.innerWidth <= 768) {
      dialogConfig.width = '100vw';
      dialogConfig.height = '100vh';
      dialogConfig.maxWidth = '100vw';
      dialogConfig.maxHeight = '100vh';
    } else {
      dialogConfig.width = width;
      dialogConfig.height = height;
      dialogConfig.maxHeight = '500px';
    }

    return this.dialog.open(component, dialogConfig);
  }

  openInfoDialog(message: string, enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { information: message };
    dialogConfig.enterAnimationDuration = enterAnimationDuration;
    dialogConfig.exitAnimationDuration = exitAnimationDuration;

    if (window.innerWidth <= 768) {
      dialogConfig.width = '100vw';
      dialogConfig.height = '100vh';
      dialogConfig.maxWidth = '100vw';
      dialogConfig.maxHeight = '100vh';
    } else {
      dialogConfig.width = '600px';
      dialogConfig.height = 'auto';
    }

    this.dialog.open(InfoDialogComponent, dialogConfig);
  }
}