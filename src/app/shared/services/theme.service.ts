import {Injectable, inject, signal} from '@angular/core';
import {Theme} from '../models/theme.model';
import {LocalStorageAdapter} from './storage/local-storage.adapter';
import {THEME_KEY, DEFAULT_THEME, THEME_CLASS} from '../constants/theme.constants';
import {applyThemeClassToBody, detectSystemTheme} from '../utils/theme.utils';

@Injectable({providedIn: 'root'})
export class ThemeService {
  private readonly storage = inject(LocalStorageAdapter);

  readonly theme = signal<Theme>(this.loadInitialTheme());

  constructor() {
    applyThemeClassToBody(this.theme(), THEME_CLASS.dark);
  }

  set(next: Theme): void {
    if (next === this.theme()) return;
    this.theme.set(next);
    this.storage.set(THEME_KEY, next);
    applyThemeClassToBody(next, THEME_CLASS.dark);
  }

  toggle(): void {
    this.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  private loadInitialTheme(): Theme {
    const fromLs = this.storage.get(THEME_KEY) as Theme | null;
    if (fromLs === 'light' || fromLs === 'dark') return fromLs;
    return detectSystemTheme() ?? DEFAULT_THEME;
  }
}
