import CryptoJS from 'crypto-js';

// Hilfsfunktion für Tests, die einen festen IV verwendet
function aesCipherWithFixedIV(text: string, key: string): string {
    const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000'); // Fester IV
    const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), { iv: iv });
    console.log('Encrypted:', encrypted.toString());
    return encrypted.toString();
}

describe('aesCipher', () => {
    it('should encrypt "hello world" with key "secret"', () => {
        const result = aesCipherWithFixedIV('hello world', 'secret');
        expect(result).toBe('4u0qaA2aCW1Zaj9RV8jkJg=='); 
    });

    it('should encrypt "test" with key "key123"', () => {
        const result = aesCipherWithFixedIV('test', 'key123');
        expect(result).toBe('ksuoAVbv5VnISoSHLZUURw==');
    });

    it('should return encrypted text for an empty string with key "empty"', () => {
        const result = aesCipherWithFixedIV('', 'empty');
        expect(result).toBe('dY+4diN+gdIVsKNekyNh+w==');
    });

    it('should encrypt text with special characters with key "special"', () => {
        const text = 'hello!@# world$%^';
        const result = aesCipherWithFixedIV(text, 'special');
        expect(result).toBe('BcEHXA45fHpNmMKAh99wAjDG5ycfZr3qdUoZjQ2iiXQ='); 
    });

    it('should encrypt text with numeric characters with key "numbers"', () => {
        const text = '1234567890';
        const result = aesCipherWithFixedIV(text, 'numbers');
        expect(result).toBe('bznCYt87LjVbUJnedynXMw=='); 
    });
});
