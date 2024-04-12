import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() footerBackground: string = 'linear-gradient(to top, rgb(0, 3, 199), rgb(1, 0, 75))';
  @Input() authorColor: string = 'rgb(2, 0, 116)'
}
