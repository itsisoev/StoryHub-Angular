import {Theme} from '../models/theme.model';

export function detectSystemTheme(): Theme {
  try {
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function applyThemeClassToBody(theme: Theme, classNameForDark = 'dark'): void {
  const body = document?.body;
  if (!body) return;

  if (theme === 'dark') body.classList.add(classNameForDark);
  else body.classList.remove(classNameForDark);
}
