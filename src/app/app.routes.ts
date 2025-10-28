import {Routes} from '@angular/router';
import {authGuard} from './shared/guards/auth-guard';

export const routes: Routes = [
  {
    canActivate: [authGuard],
    path: '',
    loadComponent: () =>
      import('./layout/home/home').then(m => m.Home)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.authRoutes)
  }
];
