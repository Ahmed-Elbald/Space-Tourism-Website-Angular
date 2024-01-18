import { Route } from '@angular/router';

import { HomeComponent } from './home/feature/home.component';
import { backgroundImageResolverFactory } from './shared/utils/guards/background-image.resolver';

export interface RouteData {
  addToNavbar: boolean,
  pageIndex: number,
  navLink: string,
  headingContent?: string
}

const routesTitlePrefix = "SpaceY |";
export const routes: (Route & { data?: RouteData })[] = [
  {
    path: "home",
    component: HomeComponent,
    title: `${routesTitlePrefix} Home`,
    resolve: backgroundImageResolverFactory("home"),
    data: {
      addToNavbar: true,
      navLink: "home",
      pageIndex: 0,
    }
  },
  {
    path: "destination",
    loadComponent: () => import("./destination/feature/destination.component").then(c => c.DestinationComponent),
    title: `${routesTitlePrefix} Destination`,
    resolve: backgroundImageResolverFactory("destination"),
    data: {
      addToNavbar: true,
      navLink: "destination",
      pageIndex: 1,
      headingTxt: "pick your destination"
    }
  },
  {
    path: "crew",
    loadComponent: () => import("./crew/feature/crew.component").then(c => c.CrewComponent),
    title: `${routesTitlePrefix} Crew`,
    resolve: backgroundImageResolverFactory("crew"),
    data: {
      addToNavbar: true,
      navLink: "crew",
      pageIndex: 2,
      headingTxt: "meet your crew"
    }
  },
  {
    path: "technology",
    loadComponent: () => import("./technology/feature/technology.component").then(c => c.TechnologyComponent),
    title: `${routesTitlePrefix} Technology`,
    resolve: backgroundImageResolverFactory("technology"),
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
