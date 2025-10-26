import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  selector: 'uc-user-story-profile',
  imports: [],
  templateUrl: './user-story-profile.html',
  styleUrl: './user-story-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserStoryProfile {
  images = input();
}
