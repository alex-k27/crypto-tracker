// LocalStorage Handler
import { CONFIG } from './config.js';

export class Storage {
    static get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    }

    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    }

    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }

    static clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }

    // Settings-specific methods
    static getSettings() {
        return this.get(CONFIG.STORAGE_KEYS.SETTINGS, {
            theme: CONFIG.DEFAULT_THEME,
            cryptoCount: CONFIG.DEFAULT_CRYPTO_COUNT,
            showCharts: true,
            sortBy: CONFIG.SORT_OPTIONS.RANK
        });
    }

    static saveSettings(settings) {
        return this.set(CONFIG.STORAGE_KEYS.SETTINGS, settings);
    }

    static getFavorites() {
        return this.get(CONFIG.STORAGE_KEYS.FAVORITES, []);
    }

    static saveFavorites(favorites) {
        return this.set(CONFIG.STORAGE_KEYS.FAVORITES, favorites);
    }

    static toggleFavorite(symbol) {
        const favorites = this.getFavorites();
        const index = favorites.indexOf(symbol);

        if (index > -1) {
            favorites.splice(index, 1);
        } else {
            favorites.push(symbol);
        }

        this.saveFavorites(favorites);
        return favorites;
    }

    static isFavorite(symbol) {
        const favorites = this.getFavorites();
        return favorites.includes(symbol);
    }
}
