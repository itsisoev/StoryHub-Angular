import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {
  TuiAlertService,
  TuiButton,
  TuiIcon,
  TuiLabel,
  TuiTextfieldComponent,
  TuiTextfieldDirective
} from '@taiga-ui/core';
import {TuiPassword} from '@taiga-ui/kit';
import {AuthService} from '../../../shared/services/auth.service';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'features-login',
  imports: [
    RouterLink,
    TuiButton,
    TuiIcon,
    TuiLabel,
    TuiPassword,
    TuiTextfieldComponent,
    TuiTextfieldDirective,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss', '../../../../themes/auth.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly alerts = inject(TuiAlertService);

  authForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  isLoading = signal<boolean>(false);

  ngOnInit() {
    this.authForm.get('username')?.valueChanges.subscribe(value => {
      if (value && value !== value.toLowerCase()) {
        this.authForm.get('username')?.setValue(value.toLowerCase(), {emitEvent: false});
      }
    });
  }

  onSubmit() {
    this.isLoading.set(true);

    const {username, password} = this.authForm.value;
    const userData = {
      username: username ?? '',
      password: password ?? '',
    };

    this.authService.login(userData).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.alerts
          .open('Вход в аккаунт!', {appearance: 'positive'})
          .subscribe();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.alerts
          .open(err?.error?.message ?? 'Ошибка при входе', {appearance: 'negative'})
          .subscribe();
      }
    });
  }
}
