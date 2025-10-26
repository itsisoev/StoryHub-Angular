import {InjectionToken} from '@angular/core';
import {Theme} from '../models/theme.model';

export const THEME_STORAGE_KEY = new InjectionToken<string>('THEME_STORAGE_KEY', {
  providedIn: 'root',
  factory: () => 'theme',
});

export const THEME_INITIAL = new InjectionToken<Theme>('THEME_INITIAL', {
  providedIn: 'root',
  factory: () => 'light',
});
