import { Route } from '@angular/router';
import { AppComponent } from './app.component';

const routesTitlePrefix = "SpaceY |";
export const routes: (Route & { navLinkContent: string })[] = [
  {
    path: "home",
    component: AppComponent,
    title: `${routesTitlePrefix} Home`,
    navLinkContent: "home",
  },
  {
    path: "destination",
    component: AppComponent,
    title: `${routesTitlePrefix} Destination`,
    navLinkContent: "destination",
  },
  {
    path: "crew",
    component: AppComponent,
    title: `${routesTitlePrefix} Crew`,
    navLinkContent: "crew",
  },
  {
    path: "technology",
    component: AppComponent,
    title: `${routesTitlePrefix} Technology`,
    navLinkContent: "technology",
  },
];
