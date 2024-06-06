import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent } from 'rxjs';

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
}