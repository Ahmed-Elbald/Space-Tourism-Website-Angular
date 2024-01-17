import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Data, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Observable, filter, switchMap } from 'rxjs';
import { LetDirective } from '@ngrx/component';

import { HeaderComponent } from './layout/header/header.component';
import { A11yComponent } from './a11y/a11y.component';
import { PageHeadingComponent } from './pages/page-heading/page-heading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LetDirective, A11yComponent, HeaderComponent, PageHeadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  // Deps
  private router = inject(Router);

  // Public fields
  public routesPaths: string[] = [];
  public activeRouteData$!: Observable<Data>;
  public currentPage!: string;

  // Public methods
  ngOnInit(): void {

    // Get the paths of the routes that should be added to the nav
    this.routesPaths = this.router.config
      .filter(route => route.data && route.data["addToNavbar"])
      .map(route => route.data!["navLink"]);

    // Get the data of the current active route
    this.activeRouteData$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap(() => this.router.routerState.root.firstChild!.data)
    );

  }

  handlePageChange(pageName: string) {

    // Set current page to the activated page
    this.currentPage = pageName;

    // Change body image
    document.body.style.setProperty(
      "--bodyBgImgMobile",
      `url(./assets/images/${pageName}/background-${pageName}-mobile.jpg)`
    );
    document.body.style.setProperty(
      "--bodyBgImgDesktop",
      `url(./assets/images/${pageName}/background-${pageName}-desktop.jpg)`
    );
  }

}
