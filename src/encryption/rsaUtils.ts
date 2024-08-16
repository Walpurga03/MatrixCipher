import * as forge from 'node-forge';

// Funktion zur Erzeugung von Schlüsselpaaren
export function generateKeyPair(): { publicKey: string, privateKey: string } {
    const keypair = forge.pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
    const publicKey = forge.pki.publicKeyToPem(keypair.publicKey);
    const privateKey = forge.pki.privateKeyToPem(keypair.privateKey);
    return { publicKey, privateKey };
}

// Funktion zur Verschlüsselung
export function encrypt(publicKey: string, message: string): string {
    try {
        // Trimme den öffentlichen Schlüssel, um unnötige Leerzeichen oder Zeilenumbrüche zu entfernen
        const trimmedPublicKey = publicKey.trim();
        const publicKeyObj = forge.pki.publicKeyFromPem(trimmedPublicKey);
        const encrypted = publicKeyObj.encrypt(message, 'RSA-OAEP');
        return forge.util.encode64(encrypted);
    } catch (error) {
        console.error('Fehler bei der Verschlüsselung:', error);
        throw new Error('Verschlüsselung fehlgeschlagen');
    }
}

// Funktion zur Entschlüsselung
export function decrypt(privateKey: string, encryptedMessage: string): string {
    try {
        const trimmedPrivateKey = privateKey.trim();
        const privateKeyObj = forge.pki.privateKeyFromPem(trimmedPrivateKey);
        const decodedMessage = forge.util.decode64(encryptedMessage);
        const decrypted = privateKeyObj.decrypt(decodedMessage, 'RSA-OAEP');
        return decrypted;
    } catch (error) {
        console.error('Fehler bei der Entschlüsselung:', error);
        throw new Error('Entschlüsselung fehlgeschlagen');
    }
}