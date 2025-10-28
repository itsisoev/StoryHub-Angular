import { ChangeDetectionStrategy, Component } from '@angular/core';
import {EmptyState} from '../../shared/components/empty-state/empty-state';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'layout-home',
  imports: [
    EmptyState,
    RouterOutlet
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {

}
