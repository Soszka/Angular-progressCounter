import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { ModifyTrainingDialogComponent } from '../training-dialogs/modify-training-dialog/modify-training-dialog.component';
import { DialogService } from '../../shared/services/dialog.service';

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
  dialogService = inject(DialogService);

  openModifyDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialogService.openDialog(
      ModifyTrainingDialogComponent,
      {},
      '1000px',
      'auto', 
      enterAnimationDuration,
      exitAnimationDuration
    );
  }
}
