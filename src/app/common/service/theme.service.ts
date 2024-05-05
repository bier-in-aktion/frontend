import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, effect, signal } from '@angular/core';

export type Themes = 'light-theme' | 'dark-theme';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    public theme = signal<Themes>('light-theme');
    private initialized = false;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any
    ) {
        this.initTheme();
    }

    public toggleTheme(): void {
        if (this.theme() == 'dark-theme')
            this.theme.set('light-theme');
        else
            this.theme.set('dark-theme');
    }

    public initTheme(): void {
        if (this.initialized)
            return;

        if (isPlatformBrowser(this.platformId)) {
            this.initialized = true;
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
            if (prefersDark.matches)
                this.theme.set('dark-theme');
        }
    }
}
