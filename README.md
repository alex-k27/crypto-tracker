# 🚀 Crypto Tracker

A beautiful, real-time cryptocurrency price tracker with live updates from Binance API. Track your favorite cryptocurrencies with stunning visualizations and customizable themes.

![Crypto Tracker](assets/screenshots/demo.png)

## ✨ Features

- 📊 **Real-time Price Updates** - WebSocket connection for instant price changes
- 🎨 **Multiple Themes** - Dark, Light, Midnight, Ocean, and Sunset themes
- 💰 **Customizable Crypto List** - Choose from 5 to 50 cryptocurrencies
- 📈 **Price Charts** - Visual sparklines showing 24-hour trends
- ⭐ **Favorites** - Pin your favorite cryptocurrencies to the top
- 🔍 **Search & Filter** - Find specific cryptocurrencies quickly
- 💾 **Persistent Settings** - Your preferences saved locally
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ⚡ **Lightweight** - No framework dependencies, pure vanilla JavaScript

## 🎯 Live Demo

Simply open `index.html` in your browser or serve it with any static file server.

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/crypto-tracker.git
   cd crypto-tracker
   ```

2. **Serve the application**
   
   Using Python:
   ```bash
   python3 -m http.server 8000
   ```
   
   Using Node.js (http-server):
   ```bash
   npx http-server -p 8000
   ```
   
   Or simply open `index.html` directly in your browser.

3. **Access the application**
   
   Navigate to `http://localhost:8000`

## 🎨 Customization

### Theme Selection
Choose from 5 beautiful themes:
- **Dark** - Purple/blue gradient (default)
- **Light** - Clean and professional
- **Midnight** - Deep blue elegance
- **Ocean** - Coastal teal vibes
- **Sunset** - Warm orange/pink tones

### Cryptocurrency Options
- Adjust the number of displayed cryptocurrencies (5-50)
- Search and filter through available cryptocurrencies
- Mark favorites to keep them at the top
- Sort by rank, price, volume, or percentage change

### Display Settings
- Toggle price charts on/off
- Customize card layout
- Adjust update frequency
- Show/hide specific data fields

## 📖 Usage

1. **First Visit** - The app loads with default settings (top 10 cryptocurrencies, dark theme)
2. **Open Settings** - Click the settings icon to customize your experience
3. **Select Theme** - Choose your preferred color scheme
4. **Adjust Crypto Count** - Use the slider to show more or fewer cryptocurrencies
5. **Mark Favorites** - Click the star icon on any crypto card to pin it
6. **View Charts** - Click on a card to see detailed price charts

All settings are automatically saved to your browser's local storage.

## 🏗️ Project Structure

```
crypto-tracker/
├── index.html              # Main HTML file
├── src/
│   ├── js/
│   │   ├── app.js         # Main application entry
│   │   ├── config.js      # Configuration constants
│   │   ├── api.js         # Binance API integration
│   │   ├── websocket.js   # WebSocket management
│   │   ├── ui.js          # UI rendering
│   │   ├── settings.js    # Settings management
│   │   ├── themes.js      # Theme system
│   │   ├── storage.js     # LocalStorage handler
│   │   └── charts.js      # Chart visualization
│   └── css/
│       └── styles.css     # Main stylesheet
├── assets/
│   └── screenshots/       # Demo images
├── docs/                  # Additional documentation
├── LICENSE               # MIT License
└── README.md            # This file
```

## 🔌 API

This project uses the [Binance Public API](https://binance-docs.github.io/apidocs/):
- REST API for initial data fetch
- WebSocket for real-time price updates
- No API key required
- Free tier with generous rate limits

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Data provided by [Binance API](https://www.binance.com)
- Icons from [Unicode symbols](https://unicode-table.com/)
- Inspired by modern crypto tracking platforms

## 📧 Contact

Project Link: [https://github.com/yourusername/crypto-tracker](https://github.com/yourusername/crypto-tracker)

---

**⭐ Star this repo if you find it helpful!**
