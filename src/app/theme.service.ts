import { Injectable, inject } from '@angular/core';

type ThemeKey = 'theme-azure-blue' | 'theme-rose-red' | 'theme-magenta-violet';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'app-theme';
  private current: ThemeKey = 'theme-azure-blue';

  constructor() {
    const saved = (localStorage.getItem(this.storageKey) as ThemeKey | null);
    if (saved) {
      this.current = saved;
    }
    this.apply(this.current);
  }

  get theme(): ThemeKey {
    return this.current;
  }

  setTheme(theme: ThemeKey) {
    if (this.current === theme) return;
    this.remove(this.current);
    this.apply(theme);
    this.current = theme;
    localStorage.setItem(this.storageKey, theme);
  }

  private apply(theme: ThemeKey) {
    document.body.classList.add(theme);
  }

  private remove(theme: ThemeKey) {
    document.body.classList.remove(theme);
  }
}

export const THEMES: { key: ThemeKey; label: string }[] = [
  { key: 'theme-rose-red', label: 'Rose & Red' },
  { key: 'theme-azure-blue', label: 'Azure & Blue' },
  { key: 'theme-magenta-violet', label: 'Magenta & Violet' },
];

