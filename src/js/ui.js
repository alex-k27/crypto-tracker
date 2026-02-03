// UI Rendering and Updates
import { Storage } from './storage.js';
import { ChartManager } from './charts.js';

export class UIManager {
    constructor() {
        this.cryptoGrid = document.getElementById('crypto-grid');
        this.statusBar = document.getElementById('status-bar');
        this.lastUpdateElement = document.getElementById('last-update');
        this.settingsPanel = document.getElementById('settings-panel');
        this.lastUpdateTime = Date.now();
    }

    renderCryptoCards(cryptoData, showCharts = true) {
        this.cryptoGrid.innerHTML = '';
        const favorites = Storage.getFavorites();

        // Sort favorites first
        const sortedData = [...cryptoData].sort((a, b) => {
            const aFav = favorites.includes(a.symbol);
            const bFav = favorites.includes(b.symbol);
            if (aFav && !bFav) return -1;
            if (!aFav && bFav) return 1;
            return 0;
        });

        sortedData.forEach((crypto, index) => {
            const card = this.createCryptoCard(crypto, index, showCharts);
            this.cryptoGrid.appendChild(card);
        });
    }

    createCryptoCard(crypto, index, showCharts = true) {
        const card = document.createElement('div');
        card.className = 'crypto-card';
        card.id = `crypto-card-${crypto.symbol}`;
        card.style.animationDelay = `${index * 0.05}s`;

        const isFavorite = Storage.isFavorite(crypto.symbol);
        const isPositive = crypto.priceChangePercent >= 0;
        const arrow = isPositive ? '▲' : '▼';
        const changeClass = isPositive ? 'positive' : 'negative';

        // Generate mock chart data for demo
        const chartData = ChartManager.generateMockData();
        const chartHTML = showCharts ? ChartManager.createSparkline(chartData) : '';

        card.innerHTML = `
        <div class="card-header">
            <div class="crypto-info">
                <div>
                    <div class="crypto-symbol">${crypto.name}</div>
                    <div class="crypto-name">${crypto.symbol}</div>
                </div>
            </div>
            <div class="card-actions">
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-symbol="${crypto.symbol}" title="Toggle favorite">
                    <span class="star-icon">${isFavorite ? '★' : '☆'}</span>
                </button>
                <div class="rank-badge">#${crypto.rank}</div>
            </div>
        </div>
        
        <div class="price-section">
            <div class="current-price" id="price-${crypto.symbol}">
                $${this.formatPrice(crypto.price)}
            </div>
            <div class="price-change ${changeClass}">
                <span class="price-arrow">${arrow}</span>
                <span>${Math.abs(crypto.priceChangePercent).toFixed(2)}%</span>
            </div>
        </div>
        
        ${showCharts ? `<div class="chart-container">${chartHTML}</div>` : ''}
        
        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-label">24h High</div>
                <div class="stat-value">$${this.formatPrice(crypto.high24h)}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">24h Low</div>
                <div class="stat-value">$${this.formatPrice(crypto.low24h)}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Volume</div>
                <div class="stat-value">${this.formatVolume(crypto.volume24h)}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Volume (USDT)</div>
                <div class="stat-value">${this.formatVolume(crypto.quoteVolume24h)}</div>
            </div>
        </div>
    `;

        return card;
    }

    updateCryptoPrice(data, crypto) {
        const symbol = data.s;
        const newPrice = parseFloat(data.c);
        const oldPrice = crypto.price;

        // Update the price
        crypto.price = newPrice;
        crypto.priceChange = parseFloat(data.p);
        crypto.priceChangePercent = parseFloat(data.P);
        crypto.high24h = parseFloat(data.h);
        crypto.low24h = parseFloat(data.l);
        crypto.volume24h = parseFloat(data.v);
        crypto.quoteVolume24h = parseFloat(data.q);

        // Update the DOM with animation
        const priceElement = document.getElementById(`price-${symbol}`);
        if (priceElement) {
            priceElement.classList.remove('price-increase', 'price-decrease');

            if (newPrice > oldPrice) {
                priceElement.classList.add('price-increase');
            } else if (newPrice < oldPrice) {
                priceElement.classList.add('price-decrease');
            }

            priceElement.textContent = `$${this.formatPrice(newPrice)}`;

            const card = document.getElementById(`crypto-card-${symbol}`);
            if (card) {
                const isPositive = crypto.priceChangePercent >= 0;
                const arrow = isPositive ? '▲' : '▼';
                const changeClass = isPositive ? 'positive' : 'negative';

                const priceChangeElement = card.querySelector('.price-change');
                if (priceChangeElement) {
                    priceChangeElement.className = `price-change ${changeClass}`;
                    priceChangeElement.innerHTML = `
            <span class="price-arrow">${arrow}</span>
            <span>${Math.abs(crypto.priceChangePercent).toFixed(2)}%</span>
          `;
                }

                const statsValues = card.querySelectorAll('.stat-value');
                if (statsValues.length >= 4) {
                    statsValues[0].textContent = `$${this.formatPrice(crypto.high24h)}`;
                    statsValues[1].textContent = `$${this.formatPrice(crypto.low24h)}`;
                    statsValues[2].textContent = this.formatVolume(crypto.volume24h);
                    statsValues[3].textContent = this.formatVolume(crypto.quoteVolume24h);
                }
            }
        }
    }

    updateStatus(status, message) {
        const statusDot = this.statusBar.querySelector('.status-dot');
        const statusText = this.statusBar.querySelector('.status-text');

        statusDot.classList.remove('connected', 'error');

        if (status === 'connected') {
            statusDot.classList.add('connected');
        } else if (status === 'error') {
            statusDot.classList.add('error');
        }

        statusText.textContent = message;
    }

    updateLastUpdateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        this.lastUpdateElement.textContent = `Last update: ${timeString}`;
        this.lastUpdateTime = Date.now();
    }

    toggleSettingsPanel() {
        if (this.settingsPanel) {
            this.settingsPanel.classList.toggle('open');
        }
    }

    formatPrice(price) {
        if (price >= 1000) {
            return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        } else if (price >= 1) {
            return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
        } else {
            return price.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 8 });
        }
    }

    formatVolume(volume) {
        if (volume >= 1e9) {
            return `${(volume / 1e9).toFixed(2)}B`;
        } else if (volume >= 1e6) {
            return `${(volume / 1e6).toFixed(2)}M`;
        } else if (volume >= 1e3) {
            return `${(volume / 1e3).toFixed(2)}K`;
        } else {
            return volume.toFixed(2);
        }
    }
}
