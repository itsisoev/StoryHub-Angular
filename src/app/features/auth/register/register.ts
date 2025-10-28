import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {TuiTextfield, TuiIcon, TuiButton, TuiAlertService, TuiNotification} from '@taiga-ui/core';
import {TuiButtonLoading, TuiPassword} from '@taiga-ui/kit';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'features-register',
  imports: [
    TuiTextfield,
    TuiIcon,
    TuiPassword,
    TuiButton,
    RouterLink,
    ReactiveFormsModule,
    TuiButtonLoading
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss', '../../../../themes/auth.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register implements OnInit {
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

    this.authService.register(userData).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.alerts
          .open('Аккаунт создан!', {appearance: 'positive'})
          .subscribe();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.alerts
          .open(err?.error?.message ?? 'Ошибка регистрации', {appearance: 'negative'})
          .subscribe();
      }
    });
  }
}
