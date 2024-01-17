import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';

import { technologies } from '../../shared/data/technologies';
import { TabItemDirective } from '../../shared/tabs/directives/tab-item.directive';
import { TabListDirective } from '../../shared/tabs/directives/tab-list.directive';
import { TabPanelDirective } from '../../shared/tabs/directives/tab-panel.directive';
import { TabsContainerDirective } from '../../shared/tabs/directives/tabs-container.directive';
import { TabsOrientation } from '../../shared/tabs/models/tabs-orientation.model';

@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [TabsContainerDirective, TabListDirective, TabItemDirective, TabPanelDirective],
  templateUrl: './technology.component.html',
  styleUrls: ['./../shared/styles/tabs.scss', './technology.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnologyComponent {

  cdr = inject(ChangeDetectorRef)

  // Public fields
  technologies = technologies;
  activeTab = "";
  tabsOrientation: TabsOrientation = 'horizontal';

  // Public methods
  ngOnInit(): void {
    this.handleTabsOrientation();
  }

  handleTabsOrientation() {
    const mql = window.matchMedia(`(min-width: ${window.getComputedStyle(document.documentElement).getPropertyValue("--bp-tablet")})`);
    this.tabsOrientation = mql.matches ? "vertical" : "horizontal";
    mql.onchange = (changeEvent) => {
      this.tabsOrientation = changeEvent.matches ? "vertical" : "horizontal";
      this.cdr.markForCheck()
    };
  }

  // Getters
  get technologiesNames() {
    return this.technologies.map(tech => tech.name);
  }

}
