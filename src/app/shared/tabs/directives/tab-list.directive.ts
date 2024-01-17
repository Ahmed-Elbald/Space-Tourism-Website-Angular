import { Directive, ElementRef, HostListener, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, inject } from '@angular/core';

import { TabsService } from '../services/tabs.service';
import { TabsOrientation } from '../models/tabs-orientation.model';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[tabList]',
  standalone: true
})
export class TabListDirective implements OnInit, OnDestroy, OnChanges {

  // Deps
  private host = inject(ElementRef).nativeElement;
  private tabsService = inject(TabsService);
  private renderer = inject(Renderer2);

  // Input varibales
  @Input({ required: true }) labelledby!: string;
  @Input({ required: true }) labels: string[] = [];
  @Input() orientation: TabsOrientation = "horizontal";

  // Host Listeners
  @HostListener("focus") onFocus() {
    this.tabsService.changeFocus(this.tabsService.activeTabIndex)
  }

  // Private fields
  private destroy$ = new Subject<void>();

  // Public methods
  ngOnInit(): void {
    this.setDefaults();
    this.initService();
    this.handleTabindex();
  }

  initService() {
    this.tabsService.orientation = this.orientation;
    this.tabsService.labels = this.labels;
    this.tabsService.activeTabChange.next({ label: this.labels[0], preventFocus: true })
  }

  setDefaults() {
    this.renderer.setAttribute(this.host, "role", "tablist");
    this.renderer.setAttribute(this.host, "tabindex", "0");
    this.renderer.setAttribute(this.host, "aria-labelledby", this.labelledby);
    this.renderer.setAttribute(this.host, "aria-orientation", this.orientation);
  }

  handleTabindex() {
    this.tabsService.tablistTabindexChange.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tabindexValue) => this.renderer.setAttribute(this.host, "tabindex", tabindexValue.toString())
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["orientation"])
      this.tabsService.orientation = this.orientation;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
