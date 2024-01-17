import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavigationComponent, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  // Input variables
  @Input({ required: true }) routesPaths!: string[];

  // Outputs
  @Output() pageChange = new EventEmitter<string>();

}
