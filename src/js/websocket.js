// WebSocket Management
import { CONFIG } from './config.js';

export class WebSocketManager {
    constructor(onMessage, onStatusChange) {
        this.websocket = null;
        this.reconnectTimeout = null;
        this.onMessage = onMessage;
        this.onStatusChange = onStatusChange;
        this.symbols = [];
    }

    connect(symbols) {
        this.symbols = symbols;
        this.disconnect();

        try {
            // Create streams for all symbols
            const streams = symbols.map(symbol =>
                `${symbol.toLowerCase()}@ticker`
            ).join('/');

            const wsUrl = `${CONFIG.BINANCE_WS_BASE}/${streams}`;
            this.websocket = new WebSocket(wsUrl);

            this.websocket.onopen = () => {
                console.log('WebSocket connected');
                this.onStatusChange('connected', 'Connected - Live updates active');

                // Reconnect every 23 hours (Binance disconnects after 24h)
                if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
                this.reconnectTimeout = setTimeout(() => {
                    console.log('Reconnecting WebSocket...');
                    this.connect(this.symbols);
                }, CONFIG.WS_REFRESH_INTERVAL);
            };

            this.websocket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    this.onMessage(data);
                } catch (error) {
                    console.error('Error parsing WebSocket message:', error);
                }
            };

            this.websocket.onerror = (error) => {
                console.error('WebSocket error:', error);
                this.onStatusChange('error', 'Connection error');
            };

            this.websocket.onclose = () => {
                console.log('WebSocket closed');
                this.onStatusChange('connecting', 'Reconnecting...');

                // Attempt to reconnect after 5 seconds
                setTimeout(() => {
                    this.connect(this.symbols);
                }, CONFIG.WS_RECONNECT_TIMEOUT);
            };
        } catch (error) {
            console.error('Error connecting WebSocket:', error);
            this.onStatusChange('error', 'Failed to connect');
        }
    }

    disconnect() {
        if (this.websocket) {
            this.websocket.close();
            this.websocket = null;
        }

        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
        }
    }

    isConnected() {
        return this.websocket && this.websocket.readyState === WebSocket.OPEN;
    }
}
