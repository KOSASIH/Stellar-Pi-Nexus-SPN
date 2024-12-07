// collateralService.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class CollateralService {
    private collateralReserve: number = 1000000; // Example reserve in USD
    private totalCoins: number = 0;

    public mintCoins(amount: number): void {
        const requiredCollateral = amount * 314.159;
        if (this.collateralReserve >= requiredCollateral) {
            this.totalCoins += amount;
            this.collateralReserve -= requiredCollateral;
        } else {
            throw new Error('Insufficient collateral to mint coins');
        }
    }

    public getCollateralValue(): number {
        return this.collateralReserve;
    }
}
