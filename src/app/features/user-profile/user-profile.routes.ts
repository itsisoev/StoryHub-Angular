import {Routes} from '@angular/router';

export const userProfileRoutes: Routes = [
  {
    path: ":uuid",
    loadComponent: () =>
      import('./user-profile').then(m => m.UserProfile),
    data: {
      showHeader: false
    }
  }
]
