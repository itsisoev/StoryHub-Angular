import {TuiAlerts, TuiRoot} from "@taiga-ui/core";
import {Component, inject, signal} from '@angular/core';
import {ThemeService} from './shared/services/theme.service';
import {Header} from './layout/header/header';
import {Home} from './layout/home/home';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [TuiRoot, Header, Home, TuiAlerts],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly theme = inject(ThemeService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  showHeader = signal<boolean>(true);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.activatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }

      const data = route.snapshot.data;
      this.showHeader.set(data?.['showHeader'] !== false);
    });
  }
}
