import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ThemeToggle} from '../../shared/components/theme-toggle/theme-toggle';

@Component({
  selector: 'layout-header',
  imports: [
    ThemeToggle
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {

}
