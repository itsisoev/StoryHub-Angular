import { TuiRoot } from "@taiga-ui/core";
import {Component, inject} from '@angular/core';
import {ThemeService} from './shared/services/theme.service';
import {Header} from './layout/header/header';
import {Home} from './layout/home/home';

@Component({
  selector: 'app-root',
  imports: [TuiRoot, Header, Home],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly theme = inject(ThemeService);
}
