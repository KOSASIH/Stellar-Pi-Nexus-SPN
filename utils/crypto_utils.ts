import * as crypto from 'crypto';
import * as elliptic from 'elliptic';
import * as bs58 from 'bs58';

export class CryptoUtils {
  static generatePrivateKey(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  static generatePublicKey(privateKey: string): string {
    const ec = new elliptic.ec('secp256k1');
    const keyPair = ec.keyFromPrivate(privateKey, 'hex');
    return keyPair.getPublic().encode('hex', true);
  }

  static signMessage(privateKey: string, message: string): string {
    const ec = new elliptic.ec('secp256k1');
    const keyPair = ec.keyFromPrivate(privateKey, 'hex');
    const signature = keyPair.sign(message);
    return signature.toDER('hex');
  }

  static verifySignature(publicKey: string, message: string, signature: string): boolean {
    const ec = new elliptic.ec('secp256k1');
    const keyPair = ec.keyFromPublic(publicKey, 'hex');
    return keyPair.verify(message, signature);
  }

  static hashMessage(message: string): string {
    return crypto.createHash('sha256').update(message).digest('hex');
  }

  static encodeBase58(data: string): string {
    return bs58.encode(Buffer.from(data, 'hex'));
  }

  static decodeBase58(data: string): string {
    return bs58.decode(data).toString('hex');
  }
}
