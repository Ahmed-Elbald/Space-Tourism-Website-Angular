import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TabsContainerDirective } from '../../shared/ui/tabs/directives/tabs-container.directive';
import { TabListDirective } from '../../shared/ui/tabs/directives/tab-list.directive';
import { TabItemDirective } from '../../shared/ui/tabs/directives/tab-item.directive';
import { TabPanelDirective } from '../../shared/ui/tabs/directives/tab-panel.directive';
import { destinations } from '../data-access/ui/destinations';

@Component({
  selector: 'app-destination',
  standalone: true,
  imports: [TabsContainerDirective, TabListDirective, TabItemDirective, TabPanelDirective],
  templateUrl: './destination.component.html',
  styleUrls: ['../../shared/styles/tabs.scss', './destination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestinationComponent {

  // Public fields
  destinations = destinations;
  activeTab: string = "";

  // Getters
  get destinationsLabels() {
    return this.destinations.map(dest => dest.name);
  }
}
