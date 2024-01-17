import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TabsContainerDirective } from '../../shared/tabs/directives/tabs-container.directive';
import { TabListDirective } from '../../shared/tabs/directives/tab-list.directive';
import { TabItemDirective } from '../../shared/tabs/directives/tab-item.directive';
import { TabPanelDirective } from '../../shared/tabs/directives/tab-panel.directive';
import { destinations } from '../../shared/data/destinations';

@Component({
  selector: 'app-destination',
  standalone: true,
  imports: [TabsContainerDirective, TabListDirective, TabItemDirective, TabPanelDirective],
  templateUrl: './destination.component.html',
  styleUrls: ['./../shared/styles/tabs.scss', './destination.component.scss'],
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
