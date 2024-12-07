import { PriceMonitor } from './priceMonitor';
import { LiquidityManager } from './liquidityManager';
import { ArbitrageManager } from './arbitrageManager';
import { MLPricePredictor } from './mlPricePredictor';
import { Dashboard } from './dashboard';

const TARGET_PRICE = 314.159;
const STABILITY_THRESHOLD = 0.01; // 1% threshold for price fluctuation

class Stabilizer {
    private priceMonitor: PriceMonitor;
    private liquidityManager: LiquidityManager;
    private arbitrageManager: ArbitrageManager;
    private mlPricePredictor: MLPricePredictor;
    private dashboard: Dashboard;

    constructor() {
        this.priceMonitor = new PriceMonitor(TARGET_PRICE, STABILITY_THRESHOLD);
        this.liquidityManager = new LiquidityManager();
        this.arbitrageManager = new ArbitrageManager();
        this.mlPricePredictor = new MLPricePredictor();
        this.dashboard = new Dashboard();
    }

    public async start() {
        this.dashboard.initialize();
        setInterval(async () => {
            const currentPrice = await this.priceMonitor.getCurrentPrice();
            const predictedPrice = await this.mlPricePredictor.predictPrice();
            this.dashboard.update(currentPrice, predictedPrice);
            this.checkStability(currentPrice);
            await this.arbitrageManager.checkArbitrageOpportunities(currentPrice);
        }, 60000); // Check every minute
    }

    private async checkStability(currentPrice: number) {
        if (Math.abs(currentPrice - TARGET_PRICE) > TARGET_PRICE * STABILITY_THRESHOLD) {
            await this.liquidityManager.adjustLiquidity(currentPrice, TARGET_PRICE);
        }
    }
}

const stabilizer = new Stabilizer();
stabilizer.start();
