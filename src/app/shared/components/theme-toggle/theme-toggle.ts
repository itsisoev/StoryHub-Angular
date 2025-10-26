import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ThemeService} from '../../services/theme.service';
import {TuiButton, TuiIcon} from '@taiga-ui/core';

@Component({
  selector: 'uc-theme-toggle',
  imports: [
    TuiButton,
    TuiIcon
  ],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
}
