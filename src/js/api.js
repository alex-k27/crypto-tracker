// Binance API Integration
import { CONFIG } from './config.js';

export class BinanceAPI {
    static async fetchTopCryptos(count = CONFIG.DEFAULT_CRYPTO_COUNT) {
        try {
            const response = await fetch(`${CONFIG.BINANCE_REST_API}/ticker/24hr`);
            if (!response.ok) throw new Error('Failed to fetch data');

            const data = await response.json();

            // Filter for USDT pairs and sort by 24h volume
            const usdtPairs = data
                .filter(ticker => ticker.symbol.endsWith('USDT'))
                .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
                .slice(0, count);

            return usdtPairs.map((ticker, index) => ({
                symbol: ticker.symbol,
                name: ticker.symbol.replace('USDT', ''),
                rank: index + 1,
                price: parseFloat(ticker.lastPrice),
                priceChange: parseFloat(ticker.priceChange),
                priceChangePercent: parseFloat(ticker.priceChangePercent),
                high24h: parseFloat(ticker.highPrice),
                low24h: parseFloat(ticker.lowPrice),
                volume24h: parseFloat(ticker.volume),
                quoteVolume24h: parseFloat(ticker.quoteVolume)
            }));
        } catch (error) {
            console.error('Error fetching crypto data:', error);
            throw error;
        }
    }

    static async fetchAllUSDTPairs() {
        try {
            const response = await fetch(`${CONFIG.BINANCE_REST_API}/ticker/24hr`);
            if (!response.ok) throw new Error('Failed to fetch data');

            const data = await response.json();

            return data
                .filter(ticker => ticker.symbol.endsWith('USDT'))
                .map(ticker => ({
                    symbol: ticker.symbol,
                    name: ticker.symbol.replace('USDT', ''),
                    price: parseFloat(ticker.lastPrice),
                    priceChangePercent: parseFloat(ticker.priceChangePercent),
                    volume: parseFloat(ticker.quoteVolume)
                }))
                .sort((a, b) => b.volume - a.volume);
        } catch (error) {
            console.error('Error fetching all pairs:', error);
            throw error;
        }
    }
}
