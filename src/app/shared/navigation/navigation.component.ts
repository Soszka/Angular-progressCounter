import { Component, HostListener } from '@angular/core';
import { ExpandedNavComponent } from './expanded-nav/expanded-nav.component';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [ExpandedNavComponent, FontAwesomeModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  faBars = faBars;
  faTimes = faTimes;
  isNavExpanded: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkAndCloseNav();
  }

  toggleNav(): void {
    this.isNavExpanded = !this.isNavExpanded;
    if (this.isNavExpanded) {
      document.body.classList.add('overflowY-hidden');
    } else {
      document.body.classList.remove('overflowY-hidden');
    }
  }

  private checkAndCloseNav(): void {
    const screenWidth = window.innerWidth;
    const breakpointWidth = 1024;
    if (screenWidth >= breakpointWidth && this.isNavExpanded) {
      this.isNavExpanded = false;
      document.body.classList.remove('overflowY-hidden');
    }
  }

  handleClickedLink() {
    this.toggleNav();
  }
}
