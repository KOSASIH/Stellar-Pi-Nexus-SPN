import crypto from 'crypto';
import { Server } from 'stellar-sdk';

// Inisialisasi server Stellar (Testnet/Mainnet)
export const stellarServer = new Server('https://horizon-testnet.stellar.org');

// Kunci enkripsi AES (harus disimpan dengan aman)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');
const IV_LENGTH = 16;  // Panjang Initialization Vector (IV) untuk AES

// Fungsi untuk enkripsi dan dekripsi data
export const encryptData = (text: string) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decryptData = (text: string) => {
    const [iv, encryptedText] = text.split(':');
    const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        Buffer.from(ENCRYPTION_KEY),
        Buffer.from(iv, 'hex')
    );
    let decrypted = decipher.update(Buffer.from(encryptedText, 'hex'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};
