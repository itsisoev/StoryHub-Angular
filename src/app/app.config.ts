import {provideEventPlugins} from "@taiga-ui/event-plugins";
import {provideAnimations} from "@angular/platform-browser/animations";
import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from "./shared/interceptors/auth-interceptor";
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideEventPlugins(),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: JWT_OPTIONS, useValue: {
        headerName: 'Authorization',
        authScheme: 'Bearer ',
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000'],
      }
    },
    JwtHelperService,
  ]
};
