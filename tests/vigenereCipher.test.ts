import { vigenereCipher } from '../src/encryption/vigenereCipher';

describe('Vigenere Cipher', () => {
    it('should encrypt "hello" with key "key"', () => {
        expect(vigenereCipher('hello', 'key', true)).toBe('rijvs');
    });

    it('should encrypt "HELLO" with key "KEY"', () => {
        expect(vigenereCipher('HELLO', 'KEY', true)).toBe('RIJVS');
    });

    it('should handle empty text for encryption', () => {
        expect(vigenereCipher('', 'key', true)).toBe('');
    });

    it('should handle empty key for encryption', () => {
        expect(vigenereCipher('hello', '', true)).toBe('hello');
    });

    it('should handle non-alphabetic characters for encryption', () => {
        expect(vigenereCipher('hello, world!', 'key', true)).toBe('rijvs, uyvjn!');
    });

    it('should handle mixed case letters for encryption', () => {
        expect(vigenereCipher('HeLLo', 'key', true)).toBe('RiJVs');
    });

    it('should decrypt "rijvs" with key "key"', () => {
        expect(vigenereCipher('rijvs', 'key', false)).toBe('hello');
    });

    it('should decrypt "RIJVS" with key "KEY"', () => {
        expect(vigenereCipher('RIJVS', 'KEY', false)).toBe('HELLO');
    });

    it('should handle empty text for decryption', () => {
        expect(vigenereCipher('', 'key', false)).toBe('');
    });

    it('should handle empty key for decryption', () => {
        expect(vigenereCipher('hello', '', false)).toBe('hello');
    });

    it('should handle non-alphabetic characters for decryption', () => {
        expect(vigenereCipher('rijvs, uyvjn!', 'key', false)).toBe('hello, world!');
    });

    it('should handle mixed case letters for decryption', () => {
        expect(vigenereCipher('RiJVs', 'key', false)).toBe('HeLLo');
    });
});