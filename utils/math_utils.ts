export class MathUtils {
  static factorial(n: number): number {
    if (n <= 1) return 1;
    return n * this.factorial(n - 1);
  }

  static gcd(a: number, b: number): number {
    if (b === 0) return a;
    return this.gcd(b, a % b);
  }

  static lcm(a: number, b: number): number {
    return a * b / this.gcd(a, b);
  }

  static modPow(base: number, exponent: number, modulus: number): number {
    return Math.pow(base, exponent) % modulus;
  }

  static isPrime(n: number): boolean {
    if (n <= 1) return false;
    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  static randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
