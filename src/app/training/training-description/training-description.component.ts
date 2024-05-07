import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { MatDialog } from '@angular/material/dialog';
import { ModifyTrainingDialogComponent } from '../training-dialogs/modify-training-dialog/modify-training-dialog.component';

@Component({
  selector: 'app-training-description',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './training-description.component.html',
  styleUrl: './training-description.component.scss'
})
export class TrainingDescriptionComponent {

  constructor(public dialog: MatDialog) {}

  openModifyDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ModifyTrainingDialogComponent, {
      width: '1000px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
