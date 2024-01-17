import { Directive, Input, OnInit, inject } from '@angular/core';

import { TabsService } from '../services/tabs.service';
import { DasherizePipe } from '../pipes/dasherize.pipe';

@Directive({
  selector: '[tabsContainer]',
  standalone: true,
  providers: [TabsService, DasherizePipe]
})
export class TabsContainerDirective {

}
