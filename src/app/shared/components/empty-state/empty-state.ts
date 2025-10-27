import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  selector: 'uc-empty-state',
  imports: [],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EmptyState {
  title = input();
  desc = input();
  icon = input();
}
