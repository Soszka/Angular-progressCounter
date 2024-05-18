import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe} from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-progress-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ 
    MatFormFieldModule, 
    MatDatepickerModule, 
    FormsModule, 
    ReactiveFormsModule, 
    JsonPipe, 
    MatSelectModule,
    ButtonComponent
  ],
  templateUrl: './progress-form.component.html',
  styleUrl: './progress-form.component.scss'
})
export class ProgressFormComponent {
  trainingList: string[] = ['Push', 'Pull', 'Legs'];
  exercisesList: string[] = ['Wyciskanie na sztandzie', 'Wyciskanie na porączach', 'Wyciskanie Wąsko', 'Rozpiętki', 'Triceps na sznurku'];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
}
