import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subject, fromEvent, takeUntil } from 'rxjs';

import { keyPressed } from '../../utils/helpers/key-pressed.helper';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnDestroy {

  // Input variables
  @Input({ required: true }) routesPaths!: string[];

  // Outputs
  @Output() pageChange = new EventEmitter<string>();

  // View Children
  @ViewChild("navLink") firstNavLink!: ElementRef<HTMLAnchorElement>;
  @ViewChild("navOpenBtn") navOpenBtn!: ElementRef<HTMLButtonElement>;

  // Public fields
  public currentPage!: string;
  public isExpanded = false;

  // Private Fields
  private keydownEventDestroyer$ = new Subject<void>();

  toggleNav(force?: boolean) {

    // Toggle the nav state
    this.isExpanded = force || !this.isExpanded

    if (this.isExpanded) {

      // Move focus to the first link inside the nav
      setTimeout(() => this.firstNavLink.nativeElement.focus(), 100);

      // Handling the closure of the nav with the escape button
      fromEvent(document, "keydown").pipe(takeUntil(this.keydownEventDestroyer$))
        .subscribe({
          next: (keydownEvent: Event) => {
            if (keyPressed(keydownEvent as KeyboardEvent, "Escape"))
              this.toggleNav(false);
          }
        });
    }
    else {

      // Stop listening for keydown event
      this.keydownEventDestroyer$.next();

      // Move focus to the nav opener
      setTimeout(() => this.navOpenBtn.nativeElement.focus(), 100)

    }

  }

  handlePageChange(state: boolean, pageName: string) {
    if (state === true) {
      this.currentPage = pageName;
      this.pageChange.emit(pageName);
    }
  }

  ngOnDestroy(): void {
    this.keydownEventDestroyer$.next();
    this.keydownEventDestroyer$.complete();
  }

}
