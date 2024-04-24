import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-button',
  standalone: true,
  imports: [  
    MatButtonModule, 
    CommonModule
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() fontSize!: string;
  @Input() backgroundColor!: string;
  @Input() width!: string;
  @Input() height!: string;
  @Input() color!: string;
  @Input() margin!: string;
}
