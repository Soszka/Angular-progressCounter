import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModifyTrainingDialogComponent } from '../training-dialogs/modify-training-dialog/modify-training-dialog.component';

@Component({
  selector: 'app-training-description',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './training-description.component.html',
  styleUrl: './training-description.component.scss'
})
export class TrainingDescriptionComponent {

  treiningDescription = `
    W sekcji z treningami masz możliwość stworzenia swojego indywidualnego planu treningowego.
    Do każdego z treningów będziesz mógł dodawać ćwiczenia, a następnie zapisywać swoje wyniki.
    Pamiętaj, że gdy zdecydujesz się usunąć któryś z treningów, cała historia związana z osiągnięciami
  `
  dialog = inject(MatDialog)

  openModifyDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.enterAnimationDuration = enterAnimationDuration;
    dialogConfig.exitAnimationDuration = exitAnimationDuration;

    if (window.innerWidth <= 1024) {
      dialogConfig.width = '100vw';
      dialogConfig.height = '100vh';
      dialogConfig.maxWidth = '100vw';
      dialogConfig.maxHeight = '100vh';
    } else {
      dialogConfig.width = '1000px';
      dialogConfig.maxHeight = '550px';
    }

    this.dialog.open(ModifyTrainingDialogComponent, dialogConfig);
  }
}
