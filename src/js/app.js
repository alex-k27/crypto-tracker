// Main Application Entry Point
import { CONFIG } from './config.js';
import { Storage } from './storage.js';
import { BinanceAPI } from './api.js';
import { WebSocketManager } from './websocket.js';
import { UIManager } from './ui.js';
import { SettingsManager } from './settings.js';

class CryptoTracker {
    constructor() {
        this.cryptoData = [];
        this.ui = new UIManager();
        this.websocket = null;
        this.settings = null;
    }

    async init() {
        try {
            // Initialize settings
            this.settings = new SettingsManager((key, value) => {
                this.handleSettingsChange(key, value);
            });
            this.settings.initialize();

            const userSettings = this.settings.getSettings();

            // Fetch initial data
            this.ui.updateStatus('connecting', 'Fetching cryptocurrency data...');
            await this.fetchCryptoData(userSettings.cryptoCount);

            // Render UI
            this.ui.renderCryptoCards(this.cryptoData, userSettings.showCharts);

            // Attach event listeners
            this.attachEventListeners();

            // Connect WebSocket
            this.connectWebSocket();
        } catch (error) {
            console.error('Initialization error:', error);
            this.ui.updateStatus('error', 'Failed to load data');
        }
    }

    async fetchCryptoData(count) {
        try {
            this.cryptoData = await BinanceAPI.fetchTopCryptos(count);
            this.ui.updateStatus('connected', 'Connected - Live updates active');
            this.ui.updateLastUpdateTime();
        } catch (error) {
            console.error('Error fetching crypto data:', error);
            throw error;
        }
    }

    connectWebSocket() {
        const symbols = this.cryptoData.map(c => c.symbol);

        this.websocket = new WebSocketManager(
            (data) => this.handleWebSocketMessage(data),
            (status, message) => this.ui.updateStatus(status, message)
        );

        this.websocket.connect(symbols);
    }

    handleWebSocketMessage(data) {
        const crypto = this.cryptoData.find(c => c.symbol === data.s);
        if (crypto) {
            this.ui.updateCryptoPrice(data, crypto);
            this.ui.updateLastUpdateTime();
        }
    }

    async handleSettingsChange(key, value) {
        if (key === 'cryptoCount') {
            // Refetch data with new count
            this.ui.updateStatus('connecting', 'Updating cryptocurrency list...');

            if (this.websocket) {
                this.websocket.disconnect();
            }

            await this.fetchCryptoData(value);
            const userSettings = this.settings.getSettings();
            this.ui.renderCryptoCards(this.cryptoData, userSettings.showCharts);
            this.attachEventListeners();
            this.connectWebSocket();
        } else if (key === 'showCharts') {
            // Re-render cards with/without charts
            this.ui.renderCryptoCards(this.cryptoData, value);
            this.attachEventListeners();
        }
    }

    attachEventListeners() {
        // Settings button
        const settingsBtn = document.getElementById('settings-btn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.ui.toggleSettingsPanel();
            });
        }

        // Favorite buttons
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const symbol = btn.dataset.symbol;
                const favorites = Storage.toggleFavorite(symbol);

                // Update button appearance
                const isFavorite = favorites.includes(symbol);
                btn.classList.toggle('active', isFavorite);
                btn.querySelector('.star-icon').textContent = isFavorite ? '★' : '☆';

                // Re-render to sort favorites
                const userSettings = this.settings.getSettings();
                this.ui.renderCryptoCards(this.cryptoData, userSettings.showCharts);
                this.attachEventListeners();
            });
        });
    }

    cleanup() {
        if (this.websocket) {
            this.websocket.disconnect();
        }
    }
}

// Initialize application
let app;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new CryptoTracker();
        app.init();
    });
} else {
    app = new CryptoTracker();
    app.init();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (app) {
        app.cleanup();
    }
});

// Export for debugging
window.CryptoTracker = CryptoTracker;
