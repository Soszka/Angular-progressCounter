import { Component, input, Output, EventEmitter, inject } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  faDumbbell,
  faSignInAlt,
  faChartLine,
  faFire,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { group } from '@angular/animations';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expanded-nav',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './expanded-nav.component.html',
  styleUrl: './expanded-nav.component.scss',
  animations: [
    trigger('expandCollapse', [
      state(
        'collapsed',
        style({
          height: '0',
          opacity: '0',
        })
      ),
      state(
        'expanded',
        style({
          height: '100vh',
          opacity: '1',
        })
      ),
      transition('collapsed => expanded', [
        group([
          animate(
            '400ms ease-out',
            style({
              height: '100vh',
            })
          ),
          animate(
            '400ms 200ms ease-out',
            style({
              opacity: '1',
            })
          ),
        ]),
      ]),
      transition('expanded => collapsed', [
        group([
          animate(
            '200ms ease-out',
            style({
              opacity: '0',
            })
          ),
          animate(
            '400ms ease-out',
            style({
              height: '0',
            })
          ),
        ]),
      ]),
    ]),
  ],
})
export class ExpandedNavComponent {
  faHome = faHome;
  faDumbbell = faDumbbell;
  faSignInAlt = faSignInAlt;
  faChartLine = faChartLine;
  faFire = faFire;

  router = inject(Router);

  isNavExpanded = input<boolean>();
  expandedLinkColor = input<string>();
  expandedActiveLinkColor = input<string>();
  expandedActiveLinkBg = input<string>();
  @Output() clickedLinkEvent = new EventEmitter<void>();

  links = [
    { path: '/', label: 'STRONA GŁÓWNA', icon: this.faHome },
    { path: '/training', label: 'TRENING', icon: this.faDumbbell },
    { path: '/progress', label: 'PROGRES', icon: this.faChartLine },
    { path: '/auth', label: 'LOGOWANIE', icon: this.faSignInAlt },
  ];

  get stateName(): string {
    return this.isNavExpanded() ? 'expanded' : 'collapsed';
  }

  clickedLink() {
    this.clickedLinkEvent.emit();
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
}
