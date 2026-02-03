// Configuration Constants
export const CONFIG = {
    // Binance API URLs
    BINANCE_REST_API: 'https://api.binance.com/api/v3',
    BINANCE_WS_BASE: 'wss://stream.binance.com:9443/ws',

    // Default Settings
    DEFAULT_CRYPTO_COUNT: 10,
    MIN_CRYPTO_COUNT: 5,
    MAX_CRYPTO_COUNT: 50,
    DEFAULT_THEME: 'dark',

    // WebSocket Configuration
    WS_RECONNECT_TIMEOUT: 5000, // 5 seconds
    WS_REFRESH_INTERVAL: 23 * 60 * 60 * 1000, // 23 hours

    // Update Configuration
    UPDATE_ANIMATION_DURATION: 600, // milliseconds

    // Storage Keys
    STORAGE_KEYS: {
        THEME: 'crypto-tracker-theme',
        CRYPTO_COUNT: 'crypto-tracker-count',
        FAVORITES: 'crypto-tracker-favorites',
        SETTINGS: 'crypto-tracker-settings',
        SORT_BY: 'crypto-tracker-sort'
    },

    // Sort Options
    SORT_OPTIONS: {
        RANK: 'rank',
        PRICE: 'price',
        VOLUME: 'volume',
        CHANGE: 'change'
    }
};
