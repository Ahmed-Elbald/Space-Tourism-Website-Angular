import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

import { HeaderComponent } from './layout/header/header.component';
import { A11yComponent } from './a11y/a11y.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, A11yComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  // Deps
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);

  // Public fields
  public routesPaths: string[] = [];
  public currentRoutePaths$!: Observable<string>;

  // Public methods
  ngOnInit(): void {
    this.currentRoutePaths$ = this.activeRoute.title as Observable<string>;
    this.routesPaths = this.router.config.map(config => config.path || "").filter(path => path !== "");
  }

  handlePageChange(pageName: string) {
    document.body.style.setProperty(
      "--bodyBgImgMobile",
      `url(./assets/images/${pageName}/background-${pageName}-mobile.jpg)`
    )
    document.body.style.setProperty(
      "--bodyBgImgDesktop",
      `url(./assets/images/${pageName}/background-${pageName}-desktop.jpg)`
    )
  }

}
