import { Injectable } from '@nestjs/common';

@Injectable()
export class ThreatDetection {
    private threatPatterns: string[] = ['suspicious activity', 'unusual transaction'];

    detectThreat(transactionDetails: string): boolean {
        return this.threatPatterns.some(pattern => transactionDetails.includes(pattern));
    }

    alertAdmin(threatDetails: string): void {
        console.log(`Threat detected: ${threatDetails}`);
        // Implement further alerting mechanisms (e.g., email, SMS)
    }
}
