import {Routes} from '@angular/router';
import {authGuard} from './shared/guards/auth-guard';

export const routes: Routes = [
  {
    canActivate: [authGuard],
    path: '',
    loadChildren: () =>
      import("./layout/home/home.routes").then(m => m.homeRoutes)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.authRoutes)
  }
];
