import { Component, Inject,} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA }from '@angular/material/dialog';
import { ButtonComponent } from '../../../shared/button/button.component';

@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [ 
    ButtonComponent,
  ],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.scss'
})
export class InfoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  
  closeDialog() {
    this.dialogRef.close(); 
  }
}
