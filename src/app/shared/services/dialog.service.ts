import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialog = inject(MatDialog);

  constructor() {
    this.initResizeListener();
  }

  private initResizeListener(): void {
    window.addEventListener('resize', () => {
      this.closeAllDialogs();
    });
  }

  private closeAllDialogs(): void {
    this.dialog.closeAll();
  }
}