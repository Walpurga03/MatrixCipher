import { sha256Cipher } from '../src/encryption/sha256Cipher';

describe('sha256Cipher', () => {
    it('should hash "hello world"', () => {
        const result = sha256Cipher('hello world');
        expect(result).toBe('b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9');
    });

    it('should hash "test"', () => {
        const result = sha256Cipher('test');
        expect(result).toBe('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');
    });

    it('should return hash for an empty string', () => {
        const result = sha256Cipher('');
        expect(result).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
    });

    it('should hash text with special characters', () => {
        const text = 'hello!@# world$%^';
        const result = sha256Cipher(text);
        expect(result).toBe('1a9726b1b9241785030757163b87122b135fbfce933d4034118e1425583bdb3a');
    });

    it('should hash text with numeric characters', () => {
        const text = '1234567890';
        const result = sha256Cipher(text);
        expect(result).toBe('c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646');
    });
});