import { Request, Response } from 'express';
import stellarService from '../services/stellarService';
import { decryptData } from '../../config';

export async function createTransaction(req: Request, res: Response) {
    const { encryptedSourceSecret, destination, amount, memoText, multiSigEncryptedSecret } = req.body;

    try {
        const sourceSecret = decryptData(encryptedSourceSecret);
        const multiSigSecret = multiSigEncryptedSecret ? decryptData(multiSigEncryptedSecret) : undefined;
        const result = await stellarService.createTransaction(
            sourceSecret,
            destination,
            amount,
            memoText,
            multiSigSecret
        );

        res.status(200).json({ transaction: result });
    } catch (error) {
        res.status(500).json({ error: 'Transaction failed', details: error.message });
    }
}

export async function monitorTransaction(req: Request, res: Response) {
    const { transactionHash } = req.params;

    try {
        const result = await stellarService.monitorTransaction(transactionHash);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Monitoring failed', details: error.message });
    }
}
