import {Routes} from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login').then(m => m.Login),
    data: {
      showHeader: false
    }
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register').then(m => m.Register),
    data: {
      showHeader: false
    }
  }
];
