import { ResolveFn } from '@angular/router';

export const backgroundImageResolverFactory: (pageName: string) => ResolveFn<boolean> = (pageName) => {

  return () => {
    return new Promise((resolve) => {
      const bgImg = new Image();
      bgImg.onload = () => resolve(true);
      bgImg.src = `./assets/images/${pageName}/background-${pageName}-mobile.jpg`;
    })
  }

};
