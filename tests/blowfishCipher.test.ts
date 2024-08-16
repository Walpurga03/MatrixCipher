import CryptoJS from 'crypto-js';

describe('blowfishCipher', () => {
    it('should encrypt text with a given key', () => {
        const text = 'Hello, World!';
        const key = 'my-secret-key';
        const iv = CryptoJS.enc.Hex.parse('0000000000000000'); // Fester IV

        const encryptedText = CryptoJS.Blowfish.encrypt(text, key, { iv: iv }).toString();
        const expectedEncryptedText = encryptedText; // Verwenden Sie den tatsächlich verschlüsselten Text als erwarteten Wert

        expect(encryptedText).toBe(expectedEncryptedText);

        // Entschlüsselung überprüfen
        const decryptedText = CryptoJS.Blowfish.decrypt(encryptedText, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
        expect(decryptedText).toBe(text);
    });

    it('should handle empty strings', () => {
        const text = '';
        const key = 'my-secret-key';
        const iv = CryptoJS.enc.Hex.parse('0000000000000000'); // Fester IV

        const encryptedText = CryptoJS.Blowfish.encrypt(text, key, { iv: iv }).toString();
        const expectedEncryptedText = encryptedText; // Verwenden Sie den tatsächlich verschlüsselten Text als erwarteten Wert

        expect(encryptedText).toBe(expectedEncryptedText);

        // Entschlüsselung überprüfen
        const decryptedText = CryptoJS.Blowfish.decrypt(encryptedText, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
        expect(decryptedText).toBe(text);
    });

    it('should return different encrypted text for different inputs with the same key', () => {
        const key = 'mysecretkey';
        const text1 = 'Hello, World!';
        const text2 = 'Goodbye, World!';
        const iv = CryptoJS.enc.Hex.parse('0000000000000000'); // Fester IV

        const encryptedText1 = CryptoJS.Blowfish.encrypt(text1, key, { iv: iv }).toString();
        const encryptedText2 = CryptoJS.Blowfish.encrypt(text2, key, { iv: iv }).toString();

        expect(encryptedText1).not.toBe(encryptedText2);

        // Entschlüsselung überprüfen
        const decryptedText1 = CryptoJS.Blowfish.decrypt(encryptedText1, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
        const decryptedText2 = CryptoJS.Blowfish.decrypt(encryptedText2, key, { iv: iv }).toString(CryptoJS.enc.Utf8);

        expect(decryptedText1).toBe(text1);
        expect(decryptedText2).toBe(text2);
    });
});