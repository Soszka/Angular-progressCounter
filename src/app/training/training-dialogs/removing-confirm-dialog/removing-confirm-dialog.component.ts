import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ButtonComponent } from '../../../shared/button/button.component';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-removing-confirm-dialog',
  standalone: true,
  imports: [ ButtonComponent ],
  templateUrl: './removing-confirm-dialog.component.html',
  styleUrl: './removing-confirm-dialog.component.scss'
})
export class RemovingConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<RemovingConfirmDialogComponent>, 
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onRemove(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const information = this.data.messages.successMessage;
    this.dialogRef.close();
    this.dialog.open(InfoDialogComponent, {
      width: '600px',
      data: { information },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
}
