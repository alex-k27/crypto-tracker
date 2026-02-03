// Settings Management
import { Storage } from './storage.js';
import { CONFIG } from './config.js';
import { ThemeManager, THEMES } from './themes.js';

export class SettingsManager {
    constructor(onSettingsChange) {
        this.settings = Storage.getSettings();
        this.onSettingsChange = onSettingsChange;
        this.themeManager = new ThemeManager();
    }

    initialize() {
        this.themeManager.initialize();
        this.renderSettingsPanel();
        this.attachEventListeners();
    }

    renderSettingsPanel() {
        const settingsPanel = document.getElementById('settings-panel');
        if (!settingsPanel) return;

        const themes = this.themeManager.getAvailableThemes();

        settingsPanel.innerHTML = `
      <div class="settings-header">
        <h2>Settings</h2>
        <button class="close-settings" id="close-settings">×</button>
      </div>
      
      <div class="settings-content">
        <div class="setting-group">
          <label for="theme-select">Theme</label>
          <select id="theme-select" class="setting-select">
            ${themes.map(theme => `
              <option value="${theme.id}" ${this.settings.theme === theme.id ? 'selected' : ''}>
                ${theme.name}
              </option>
            `).join('')}
          </select>
        </div>
        
        <div class="setting-group">
          <label for="crypto-count">
            Number of Cryptocurrencies: <span id="crypto-count-value">${this.settings.cryptoCount}</span>
          </label>
          <input 
            type="range" 
            id="crypto-count" 
            class="setting-slider"
            min="${CONFIG.MIN_CRYPTO_COUNT}" 
            max="${CONFIG.MAX_CRYPTO_COUNT}" 
            value="${this.settings.cryptoCount}"
            step="5"
          >
          <div class="slider-labels">
            <span>${CONFIG.MIN_CRYPTO_COUNT}</span>
            <span>${CONFIG.MAX_CRYPTO_COUNT}</span>
          </div>
        </div>
        
        <div class="setting-group">
          <label class="setting-checkbox">
            <input 
              type="checkbox" 
              id="show-charts" 
              ${this.settings.showCharts ? 'checked' : ''}
            >
            <span>Show Price Charts</span>
          </label>
        </div>
        
        <div class="setting-group">
          <button class="reset-settings-btn" id="reset-settings">Reset to Defaults</button>
        </div>
      </div>
    `;
    }

    attachEventListeners() {
        // Theme selection
        const themeSelect = document.getElementById('theme-select');
        if (themeSelect) {
            themeSelect.addEventListener('change', (e) => {
                this.updateSetting('theme', e.target.value);
                this.themeManager.applyTheme(e.target.value);
            });
        }

        // Crypto count slider
        const cryptoCount = document.getElementById('crypto-count');
        const cryptoCountValue = document.getElementById('crypto-count-value');
        if (cryptoCount && cryptoCountValue) {
            cryptoCount.addEventListener('input', (e) => {
                cryptoCountValue.textContent = e.target.value;
            });

            cryptoCount.addEventListener('change', (e) => {
                this.updateSetting('cryptoCount', parseInt(e.target.value));
                if (this.onSettingsChange) {
                    this.onSettingsChange('cryptoCount', parseInt(e.target.value));
                }
            });
        }

        // Show charts toggle
        const showCharts = document.getElementById('show-charts');
        if (showCharts) {
            showCharts.addEventListener('change', (e) => {
                this.updateSetting('showCharts', e.target.checked);
                if (this.onSettingsChange) {
                    this.onSettingsChange('showCharts', e.target.checked);
                }
            });
        }

        // Reset settings
        const resetBtn = document.getElementById('reset-settings');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetSettings();
            });
        }

        // Close settings
        const closeBtn = document.getElementById('close-settings');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                const panel = document.getElementById('settings-panel');
                if (panel) panel.classList.remove('open');
            });
        }
    }

    updateSetting(key, value) {
        this.settings[key] = value;
        Storage.saveSettings(this.settings);
    }

    resetSettings() {
        this.settings = {
            theme: CONFIG.DEFAULT_THEME,
            cryptoCount: CONFIG.DEFAULT_CRYPTO_COUNT,
            showCharts: true,
            sortBy: CONFIG.SORT_OPTIONS.RANK
        };
        Storage.saveSettings(this.settings);
        Storage.saveFavorites([]);

        // Reload page to apply defaults
        window.location.reload();
    }

    getSettings() {
        return this.settings;
    }
}
