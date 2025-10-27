import {ChangeDetectionStrategy, Component, input, signal} from '@angular/core';
import {TuiButton, TuiDialog, TuiIcon} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/legacy';
import {TuiAutoFocus} from '@taiga-ui/cdk';

@Component({
  selector: 'uc-search',
  imports: [
    TuiButton,
    TuiIcon,
    TuiInputModule,
    TuiAutoFocus,
    TuiDialog
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Search {
  title = input('');

  open = signal<boolean>(false);

  protected showDialog(): void {
    this.open.set(true);
  }
}
