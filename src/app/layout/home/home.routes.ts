import {Routes} from '@angular/router';

export const homeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home').then(m => m.Home),
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import('../../features/user-profile/user-profile.routes').then(m => m.userProfileRoutes)
      }
    ]
  },
]
