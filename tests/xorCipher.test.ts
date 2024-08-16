import { xorCipher, xorDecipher } from '../src/encryption/xorCipher';

describe('xorCipher', () => {
    it('should encrypt "hello world" with key "key"', () => {
        const result = xorCipher('hello world', 'key');
        expect(result).toBe('030015070a591c0a0b070179');
    });

    it('should encrypt "test" with key "key"', () => {
        const result = xorCipher('test', 'key');
        expect(result).toBe('1f000a1f');
    });

    it('should return an empty string when text is empty', () => {
        const result = xorCipher('', 'key');
        expect(result).toBe('');
    });

    it('should return an empty string when key is empty', () => {
        const result = xorCipher('hello world', '');
        expect(result).toBe('');
    });

    it('should encrypt a longer text with key "longkey"', () => {
        const text = 'This is a longer text that needs to be encrypted using a longer key.';
        const key = 'longkey';
        const result = xorCipher(text, key);
        expect(result).toBe('380707144b0c0a4c0e4e0b040b1e091d4e130e1d0d4c1b06061f4517090a0a144b11164c0d0b470e0b1a1e161e130e0159191c07090c45184c0301090c000b4c040b1e45');
    });

    it('should encrypt text with special characters', () => {
        const text = 'hello!@# world$%^';
        const key = 'key123';
        const result = xorCipher(text, key);
        expect(result).toBe('0300155d5d122b4659465d4107015d146c336b65');
    });

    it('should encrypt text with numeric characters', () => {
        const text = '1234567890';
        const key = '09876';
        const result = xorCipher(text, key);
        expect(result).toBe('010b0b0303060e000e063039');
    });
});

describe('xorDecipher', () => {
    it('should decrypt "030015070a591c0a0b070179" with key "key" to "hello world"', () => {
        const result = xorDecipher('030015070a591c0a0b070179', 'key');
        expect(result).toBe('hello world');
    });

    it('should decrypt "1f000a1f" with key "key" to "test"', () => {
        const result = xorDecipher('1f000a1f', 'key');
        expect(result).toBe('test');
    });

    it('should return an empty string when encrypted text is empty', () => {
        const result = xorDecipher('', 'key');
        expect(result).toBe('');
    });

    it('should return an empty string when key is empty', () => {
        const result = xorDecipher('030015070a591c0a0b070179', '');
        expect(result).toBe('');
    });

    it('should decrypt a longer encrypted text with key "longkey"', () => {
        const encryptedText = '380707144b0c0a4c0e4e0b040b1e091d4e130e1d0d4c1b06061f4517090a0a144b11164c0d0b470e0b1a1e161e130e0159191c07090c45184c0301090c000b4c040b1e45';
        const key = 'longkey';
        const result = xorDecipher(encryptedText, key);
        expect(result).toBe('This is a longer text that needs to be encrypted using a longer key.');
    });

    it('should decrypt text with special characters', () => {
        const encryptedText = '0300155d5d122b4659465d4107015d146c336b65';
        const key = 'key123';
        const result = xorDecipher(encryptedText, key);
        expect(result).toBe('hello!@# world$%^');
    });

    it('should decrypt text with numeric characters', () => {
        const encryptedText = '010b0b0303060e000e063039';
        const key = '09876';
        const result = xorDecipher(encryptedText, key);
        expect(result).toBe('1234567890');
    });
});