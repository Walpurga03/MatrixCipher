import { generateKeyPair, encrypt, decrypt } from '../src/encryption/rsaUtils';

describe('rsaCipher', () => {
    it('should encrypt and decrypt text with a given key pair', () => {
        const text = 'Hello, World!';
        const { publicKey, privateKey } = generateKeyPair();

        const encryptedText = encrypt(publicKey, text);
        const decryptedText = decrypt(privateKey, encryptedText);

        expect(decryptedText).toBe(text);
    });

    it('should handle empty strings', () => {
        const text = '';
        const { publicKey, privateKey } = generateKeyPair();

        const encryptedText = encrypt(publicKey, text);
        const decryptedText = decrypt(privateKey, encryptedText);

        expect(decryptedText).toBe(text);
    });

    it('should return different encrypted text for different inputs with the same key pair', () => {
        const text1 = 'Hello, World!';
        const text2 = 'Goodbye, World!';
        const { publicKey, privateKey } = generateKeyPair();

        const encryptedText1 = encrypt(publicKey, text1);
        const encryptedText2 = encrypt(publicKey, text2);

        expect(encryptedText1).not.toBe(encryptedText2);

        const decryptedText1 = decrypt(privateKey, encryptedText1);
        const decryptedText2 = decrypt(privateKey, encryptedText2);

        expect(decryptedText1).toBe(text1);
        expect(decryptedText2).toBe(text2);
    });
});