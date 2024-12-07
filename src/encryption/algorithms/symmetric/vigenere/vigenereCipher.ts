import { VigenerePopup } from './VigenerePopup';

let vigenerePopup: VigenerePopup | null = null;

export function showVigenereCipherPopup() {
    if (!vigenerePopup) {
        vigenerePopup = new VigenerePopup();
    }
    vigenerePopup.show();
}

export function vigenereEncrypt(text: string, key: string): string {
    if (!text || !key) return '';
    
    const normalizedKey = key.toUpperCase();
    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char.match(/[A-Za-z]/)) {
            const isUpperCase = char === char.toUpperCase();
            const charCode = char.toUpperCase().charCodeAt(0) - 65;
            const keyChar = normalizedKey[keyIndex % normalizedKey.length].charCodeAt(0) - 65;
            const encryptedCharCode = (charCode + keyChar) % 26;
            
            result += String.fromCharCode(encryptedCharCode + (isUpperCase ? 65 : 97));
            keyIndex++;
        } else {
            result += char;
        }
    }

    return result;
}

export function vigenereDecrypt(text: string, key: string): string {
    if (!text || !key) return '';
    
    const normalizedKey = key.toUpperCase();
    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char.match(/[A-Za-z]/)) {
            const isUpperCase = char === char.toUpperCase();
            const charCode = char.toUpperCase().charCodeAt(0) - 65;
            const keyChar = normalizedKey[keyIndex % normalizedKey.length].charCodeAt(0) - 65;
            const decryptedCharCode = (charCode - keyChar + 26) % 26;
            
            result += String.fromCharCode(decryptedCharCode + (isUpperCase ? 65 : 97));
            keyIndex++;
        } else {
            result += char;
        }
    }

    return result;
}