import { ripemd160Cipher } from '../src/encryption/ripemd160Cipher';

describe('ripemd160Cipher', () => {
    it('should hash "hello world"', () => {
        const result = ripemd160Cipher('hello world');
        expect(result).toBe('98c615784ccb5fe5936fbc0cbe9dfdb408d92f0f');
    });

    it('should hash "test"', () => {
        const result = ripemd160Cipher('test');
        expect(result).toBe('5e52fee47e6b070565f74372468cdc699de89107');
    });

    it('should return hash for an empty string', () => {
        const result = ripemd160Cipher('');
        expect(result).toBe('9c1185a5c5e9fc54612808977ee8f548b2258d31');
    });

    it('should hash text with special characters', () => {
        const text = 'hello!@# world$%^';
        const result = ripemd160Cipher(text);
        expect(result).toBe('132155bfe05b6ab9f31a11ada8a1d7cfe5049a0e');
    });

    it('should hash text with numeric characters', () => {
        const text = '1234567890';
        const result = ripemd160Cipher(text);
        expect(result).toBe('9d752daa3fb4df29837088e1e5a1acf74932e074');
    });
});