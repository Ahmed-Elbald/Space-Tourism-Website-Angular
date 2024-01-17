import { Route } from '@angular/router';

import { RouteData } from './utils/models/route-data.model';
import { HomeComponent } from './pages/home/home.component';
import { DestinationComponent } from './pages/destination/destination.component';
import { CrewComponent } from './pages/crew/crew.component';
import { TechnologyComponent } from './pages/technology/technology.component';

const routesTitlePrefix = "SpaceY |";
export const routes: (Route & { data?: RouteData })[] = [
  {
    path: "home",
    component: HomeComponent,
    title: `${routesTitlePrefix} Home`,
    data: {
      addToNavbar: true,
      navLink: "home",
      pageIndex: 0,
    }
  },
  {
    path: "destination",
    component: DestinationComponent,
    title: `${routesTitlePrefix} Destination`,
    data: {
      addToNavbar: true,
      navLink: "destination",
      pageIndex: 1,
      headingTxt: "pick your destination"
    }
  },
  {
    path: "crew",
    component: CrewComponent,
    title: `${routesTitlePrefix} Crew`,
    data: {
      addToNavbar: true,
      navLink: "crew",
      pageIndex: 2,
      headingTxt: "meet your crew"
    }
  },
  {
    path: "technology",
    component: TechnologyComponent,
    title: `${routesTitlePrefix} Technology`,
    data: {
      addToNavbar: true,
      navLink: "technology",
      pageIndex: 3,
      headingTxt: "pace launch 101"
    }
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "home"
  }
];
