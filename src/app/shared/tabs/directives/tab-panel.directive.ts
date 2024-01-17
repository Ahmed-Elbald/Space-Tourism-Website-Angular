import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, inject } from '@angular/core';

import { TabsService } from '../services/tabs.service';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[tabPanel]',
  standalone: true,
})
export class TabPanelDirective implements OnInit, OnDestroy {

  // Deps
  private host = inject(ElementRef).nativeElement;
  private renderer = inject(Renderer2);
  private tabsService = inject(TabsService);

  // Input variables
  @Input({ required: true, alias: 'tabPanel' }) label!: string;

  // Outputs
  @Output() activate = new EventEmitter<string>();

  // Private fields
  private destroy$ = new Subject<void>();

  // Public methods
  ngOnInit(): void {
    this.setDefaults()
    this.handleActiveChange();
  }

  setDefaults() {
    this.renderer.setAttribute(this.host, "role", "tabpanel");
    this.renderer.setAttribute(this.host, "tabindex", "0");
    this.renderer.setAttribute(this.host, "aria-labelledby", `${this.label}-tab`);
    this.renderer.setAttribute(this.host, "id", `${this.label}-panel`);
  }

  handleActiveChange() {
    this.tabsService.activeTabChange.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ label, preventFocus }) => {

          // If this is the current active panel
          if (label === this.label) {
            this.renderer.addClass(this.host, 'js-active'); // Add active class for styling
            this.activate.emit(this.label); // Emit activation

            if (!preventFocus)
              this.host.focus({ preventScroll: true, focusVisible: true }); // Move focus to it
          }
          else {
            this.renderer.removeClass(this.host, 'js-active');
          }

        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
