import { Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { TabsService } from '../services/tabs.service';
import { DasherizePipe } from '../pipes/dasherize.pipe';

@Directive({
  selector: '[tabItem]',
  standalone: true
})
export class TabItemDirective implements OnInit, OnDestroy {

  // Deps
  private host = inject(ElementRef<HTMLButtonElement>).nativeElement;
  private renderer = inject(Renderer2);
  private tabsService = inject(TabsService);
  private dasherizePipe = inject(DasherizePipe);

  // Input variables
  @Input({ required: true, alias: 'tabItem' }) label!: string;

  // Host Listeners
  @HostListener("click") onClick() {
    this.tabsService.activeTabChange.next({ label: this.label });
  }

  @HostListener("keydown", ['$event']) onKeydown(event: KeyboardEvent) {
    this.tabsService.handleTabKeydownEvent(event);
  }

  // Host Bindings
  @HostBinding('attr.aria-selected') get ariaSelected() {
    return this.tabsService.activeTabChange.value.label === this.label;
  }

  // Private fields
  private destroy$ = new Subject<void>();

  // Public methods
  ngOnInit(): void {
    this.setDefaults();
    this.handleFocus();
  }

  setDefaults() {
    const dashedLabel = this.dasherizePipe.transform(this.label);
    this.renderer.setAttribute(this.host, "role", "tab");
    this.renderer.setAttribute(this.host, "tabindex", "-1");
    this.renderer.setAttribute(this.host, "aria-controls", `${dashedLabel}-panel`);
    this.renderer.setAttribute(this.host, "id", `${dashedLabel}-tab`);
  }

  handleFocus() {
    this.tabsService.focusedTabChange.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (activeTabLabel) => activeTabLabel === this.label ? this.host.focus({ preventScroll: true }) : null
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
