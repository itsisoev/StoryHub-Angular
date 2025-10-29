import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {IUser} from '../../shared/models/user.model';
import {TuiAlertService, TuiButton, TuiIcon, TuiLoader, tuiLoaderOptionsProvider} from '@taiga-ui/core';

@Component({
  selector: 'app-user-profile',
  imports: [
    TuiLoader,
    TuiButton,
    TuiIcon
  ],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiLoaderOptionsProvider({size: 'xl'})],
})
export class UserProfile implements OnInit {
  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly alerts = inject(TuiAlertService);

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;


  profileData = signal<IUser | null>(null);
  isLoading = signal<boolean>(false);

  ngOnInit() {
    this.getUserProfileByUUID();
  }

  getUserProfileByUUID() {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    this.isLoading.set(true);

    if (!uuid) return

    this.userService.getUserProfileByUUID(uuid)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (profileData) => {
          this.profileData.set(profileData);
          this.isLoading.set(false);
          this.alerts
            .open('Вы зашли на ваш профиль!', {appearance: 'positive'})
            .subscribe();
        },
        error: (err) => {
          this.isLoading.set(true);
          this.alerts
            .open(err?.error?.message ?? 'Ошибка при входе в профиль', {appearance: 'negative'})
            .subscribe();
        }
      })
  }

  onAvatarClick() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (!uuid) return;

    this.isLoading.set(true);
    this.userService.uploadUserAvatar(uuid, file)
      .then((updatedUser) => {
        this.profileData.set(updatedUser);
        this.isLoading.set(false);
        this.alerts.open('Аватар обновлён!', {appearance: 'positive'}).subscribe();
      })
      .catch((err) => {
        this.isLoading.set(false);
        this.alerts.open(err?.error?.message ?? 'Ошибка при загрузке аватара', {appearance: 'negative'}).subscribe();
      });
  }

  getAvatarUrl(): string {
    const profilePhoto = this.profileData()?.profilePhoto;
    return profilePhoto
      ? `${this.userService['api']}uploads/profile-user/${profilePhoto}`
      : '';
  }
}
