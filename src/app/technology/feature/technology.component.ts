import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { TabItemDirective } from '../../shared/ui/tabs/directives/tab-item.directive';
import { TabListDirective } from '../../shared/ui/tabs/directives/tab-list.directive';
import { TabPanelDirective } from '../../shared/ui/tabs/directives/tab-panel.directive';
import { TabsContainerDirective } from '../../shared/ui/tabs/directives/tabs-container.directive';
import { TabsOrientation } from '../../shared/ui/tabs/models/tabs-orientation.model';
import { technologies } from '../data-access/ui/technologies';

@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [TabsContainerDirective, TabListDirective, TabItemDirective, TabPanelDirective],
  templateUrl: './technology.component.html',
  styleUrls: ['../../shared/styles/tabs.scss', './technology.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnologyComponent implements OnInit {

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
    };
  }

  // Getters
  get technologiesNames() {
    return this.technologies.map(tech => tech.name);
  }

}
