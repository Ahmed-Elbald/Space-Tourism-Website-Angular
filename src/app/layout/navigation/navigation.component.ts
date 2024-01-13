import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {

  // Outputs
  @Output() pageChange = new EventEmitter<string>();

  // Public fields
  public routesPaths!: string[];
  public currentPage!: string;
  public isExpanded = false;

  // Public methods
  ngOnInit(): void {
    this.routesPaths = routes.map(route => route.navLinkContent);
  }

  toggleNav() {
    this.isExpanded = !this.isExpanded;
  }

  handlePageChange(state: boolean, pageName: string) {
    if (state === true) {
      this.currentPage = pageName;
      this.pageChange.emit(pageName);
    }
  }

}
