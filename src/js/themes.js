// Theme Management System
import { Storage } from './storage.js';
import { CONFIG } from './config.js';

export const THEMES = {
    dark: {
        name: 'Dark',
        colors: {
            'color-primary': 'hsl(280, 85%, 60%)',
            'color-primary-light': 'hsl(280, 85%, 75%)',
            'color-secondary': 'hsl(200, 90%, 55%)',
            'color-accent': 'hsl(330, 85%, 60%)',
            'color-bg-dark': 'hsl(240, 20%, 8%)',
            'color-bg-darker': 'hsl(240, 18%, 5%)',
            'color-surface': 'hsla(240, 15%, 15%, 0.8)',
            'color-surface-hover': 'hsla(240, 15%, 20%, 0.9)',
            'color-text-primary': 'hsl(0, 0%, 98%)',
            'color-text-secondary': 'hsl(0, 0%, 70%)',
            'color-text-muted': 'hsl(0, 0%, 50%)',
            'color-success': 'hsl(142, 76%, 56%)',
            'color-danger': 'hsl(0, 84%, 60%)'
        }
    },

    light: {
        name: 'Light',
        colors: {
            'color-primary': 'hsl(280, 75%, 50%)',
            'color-primary-light': 'hsl(280, 75%, 60%)',
            'color-secondary': 'hsl(200, 85%, 45%)',
            'color-accent': 'hsl(330, 75%, 50%)',
            'color-bg-dark': 'hsl(0, 0%, 98%)',
            'color-bg-darker': 'hsl(0, 0%, 95%)',
            'color-surface': 'hsla(0, 0%, 100%, 0.9)',
            'color-surface-hover': 'hsla(0, 0%, 100%, 1)',
            'color-text-primary': 'hsl(0, 0%, 10%)',
            'color-text-secondary': 'hsl(0, 0%, 30%)',
            'color-text-muted': 'hsl(0, 0%, 50%)',
            'color-success': 'hsl(142, 76%, 40%)',
            'color-danger': 'hsl(0, 84%, 50%)'
        }
    },

    midnight: {
        name: 'Midnight',
        colors: {
            'color-primary': 'hsl(210, 100%, 60%)',
            'color-primary-light': 'hsl(210, 100%, 70%)',
            'color-secondary': 'hsl(180, 100%, 50%)',
            'color-accent': 'hsl(240, 100%, 65%)',
            'color-bg-dark': 'hsl(220, 40%, 10%)',
            'color-bg-darker': 'hsl(220, 40%, 7%)',
            'color-surface': 'hsla(220, 30%, 18%, 0.8)',
            'color-surface-hover': 'hsla(220, 30%, 23%, 0.9)',
            'color-text-primary': 'hsl(0, 0%, 98%)',
            'color-text-secondary': 'hsl(210, 20%, 70%)',
            'color-text-muted': 'hsl(210, 15%, 50%)',
            'color-success': 'hsl(142, 76%, 56%)',
            'color-danger': 'hsl(0, 84%, 60%)'
        }
    },

    ocean: {
        name: 'Ocean',
        colors: {
            'color-primary': 'hsl(180, 80%, 50%)',
            'color-primary-light': 'hsl(180, 80%, 65%)',
            'color-secondary': 'hsl(200, 90%, 55%)',
            'color-accent': 'hsl(160, 90%, 45%)',
            'color-bg-dark': 'hsl(195, 30%, 12%)',
            'color-bg-darker': 'hsl(195, 30%, 8%)',
            'color-surface': 'hsla(195, 25%, 20%, 0.8)',
            'color-surface-hover': 'hsla(195, 25%, 25%, 0.9)',
            'color-text-primary': 'hsl(180, 30%, 95%)',
            'color-text-secondary': 'hsl(180, 20%, 70%)',
            'color-text-muted': 'hsl(180, 15%, 50%)',
            'color-success': 'hsl(142, 76%, 56%)',
            'color-danger': 'hsl(0, 84%, 60%)'
        }
    },

    sunset: {
        name: 'Sunset',
        colors: {
            'color-primary': 'hsl(15, 90%, 60%)',
            'color-primary-light': 'hsl(15, 90%, 70%)',
            'color-secondary': 'hsl(340, 85%, 60%)',
            'color-accent': 'hsl(45, 100%, 60%)',
            'color-bg-dark': 'hsl(10, 35%, 12%)',
            'color-bg-darker': 'hsl(10, 35%, 8%)',
            'color-surface': 'hsla(15, 25%, 20%, 0.8)',
            'color-surface-hover': 'hsla(15, 25%, 25%, 0.9)',
            'color-text-primary': 'hsl(30, 30%, 95%)',
            'color-text-secondary': 'hsl(30, 20%, 70%)',
            'color-text-muted': 'hsl(30, 15%, 50%)',
            'color-success': 'hsl(142, 76%, 56%)',
            'color-danger': 'hsl(0, 84%, 60%)'
        }
    }
};

export class ThemeManager {
    constructor() {
        this.currentTheme = Storage.getSettings().theme || CONFIG.DEFAULT_THEME;
    }

    applyTheme(themeName) {
        const theme = THEMES[themeName];
        if (!theme) {
            console.error(`Theme "${themeName}" not found`);
            return false;
        }

        const root = document.documentElement;

        // Apply all color variables
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });

        // Update body class for theme-specific styles
        document.body.className = `theme-${themeName}`;

        this.currentTheme = themeName;

        // Save to settings
        const settings = Storage.getSettings();
        settings.theme = themeName;
        Storage.saveSettings(settings);

        return true;
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    getAvailableThemes() {
        return Object.keys(THEMES).map(key => ({
            id: key,
            name: THEMES[key].name
        }));
    }

    initialize() {
        this.applyTheme(this.currentTheme);
    }
}
