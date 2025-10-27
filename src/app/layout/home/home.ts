import { ChangeDetectionStrategy, Component } from '@angular/core';
import {EmptyState} from '../../shared/components/empty-state/empty-state';

@Component({
  selector: 'layout-home',
  imports: [
    EmptyState
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {

}
