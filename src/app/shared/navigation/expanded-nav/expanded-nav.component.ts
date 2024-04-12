import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { faDumbbell, faSignInAlt, faChartLine, faFire, faHome} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { group } from '@angular/animations';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-expanded-nav',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './expanded-nav.component.html',
  styleUrl: './expanded-nav.component.scss',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        opacity: '0',
      })),
      state('expanded', style({
        height: '100vh',
        opacity: '1',
      })),
      transition('collapsed => expanded', [
        group([
          animate('400ms ease-out', style({
            height: '100vh',
          })),
          animate('400ms 200ms ease-out', style({ 
            opacity: '1',
          })),
        ]),
      ]),
      transition('expanded => collapsed', [
        group([
          animate('200ms ease-out', style({
            opacity: '0',
          })),
          animate('400ms ease-out', style({
            height: '0',
          })),
        ]),
      ]),
    ])
  ],
})

export class ExpandedNavComponent {

  faHome = faHome;
  faDumbbell = faDumbbell;
  faSignInAlt = faSignInAlt;
  faChartLine = faChartLine;
  faFire = faFire; 

  @Input() isNavExpanded!: boolean;
  @Output() clickedLinkEvent = new EventEmitter<void>();

  get stateName(): string {
    return this.isNavExpanded ? 'expanded' : 'collapsed';
  }

  clickedLink() {
    this.clickedLinkEvent.emit();
  }
}