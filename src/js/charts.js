// Simple Chart Visualization (Sparklines)
export class ChartManager {
    static createSparkline(data, width = 100, height = 30) {
        if (!data || data.length === 0) return '';

        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min || 1;

        const points = data.map((value, index) => {
            const x = (index / (data.length - 1)) * width;
            const y = height - ((value - min) / range) * height;
            return `${x},${y}`;
        }).join(' ');

        const pathD = `M ${points}`;

        const isPositive = data[data.length - 1] >= data[0];
        const color = isPositive ? 'var(--color-success)' : 'var(--color-danger)';

        return `
      <svg width="${width}" height="${height}" class="sparkline">
        <polyline
          points="${points}"
          fill="none"
          stroke="${color}"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    `;
    }

    static generateMockData() {
        // Generate simple mock price data for 24 points (hourly)
        const data = [];
        let price = 100 + Math.random() * 50;

        for (let i = 0; i < 24; i++) {
            price += (Math.random() - 0.5) * 10;
            data.push(Math.max(0, price));
        }

        return data;
    }
}
