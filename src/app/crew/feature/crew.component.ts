import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TabItemDirective } from '../../shared/ui/tabs/directives/tab-item.directive';
import { TabListDirective } from '../../shared/ui/tabs/directives/tab-list.directive';
import { TabPanelDirective } from '../../shared/ui/tabs/directives/tab-panel.directive';
import { TabsContainerDirective } from '../../shared/ui/tabs/directives/tabs-container.directive';
import { crewMembers } from '../data-access/ui/crew';

@Component({
  selector: 'app-crew',
  standalone: true,
  imports: [TabsContainerDirective, TabListDirective, TabItemDirective, TabPanelDirective],
  templateUrl: './crew.component.html',
  styleUrls: ['../../shared/styles/tabs.scss', './crew.component.scss'],
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
