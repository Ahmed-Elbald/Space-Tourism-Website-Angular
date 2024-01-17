import { ChangeDetectionStrategy, Component } from '@angular/core';

import { crewMembers } from '../../shared/data/crew';
import { TabItemDirective } from '../../shared/tabs/directives/tab-item.directive';
import { TabListDirective } from '../../shared/tabs/directives/tab-list.directive';
import { TabPanelDirective } from '../../shared/tabs/directives/tab-panel.directive';
import { TabsContainerDirective } from '../../shared/tabs/directives/tabs-container.directive';

@Component({
  selector: 'app-crew',
  standalone: true,
  imports: [TabsContainerDirective, TabListDirective, TabItemDirective, TabPanelDirective],
  templateUrl: './crew.component.html',
  styleUrls: ['./../shared/styles/tabs.scss', './crew.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrewComponent {

  // Public fields
  crewMembers = crewMembers;
  activeTab: string = "";

  // Getters
  get crewMembersNames() {
    return this.crewMembers.map(member => member.name)
  }
}
