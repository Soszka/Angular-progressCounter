import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialog = inject(MatDialog);
  private originalHeight: number = window.innerHeight;

  constructor() {
    this.initResizeListener();
  }

  private initResizeListener(): void {
    window.addEventListener('resize', () => {
      this.onResize();
    });
  }

  private onResize(): void {
    const currentHeight = window.innerHeight;
    const resizeDifference = this.originalHeight - currentHeight;
    if (resizeDifference < 100) {
      this.closeAllDialogs();
    }
  }

  private closeAllDialogs(): void {
    this.dialog.closeAll();
  }
}