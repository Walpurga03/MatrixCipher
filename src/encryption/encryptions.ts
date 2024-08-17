import { showCaesarCipherPopup } from './caesarCipher';
import { showVigenereCipherPopup } from './vigenereCipher';
import { showXorCipherPopup } from './xorCipher';
import { showBlowfishCipherPopup } from './blowfishCipher';
import { showSha256CipherPopup } from './sha256Cipher';
import { showRipemd160CipherPopup } from './ripemd160Cipher';
import { showAesCipherPopup } from './aesCipher';
import { showRsaCipherPopup } from './rsaCipher';

// Funktion zum Ausblenden des Menüs und des Widgets
export function hideMenuAndWidget(menuElement: HTMLElement) {
    if (menuElement) {
        menuElement.style.display = 'none';
        const widgetContainer = document.getElementById('donate-widget')?.parentElement as HTMLElement;
        if (widgetContainer) {
            widgetContainer.style.display = 'none';
        }
    }
}

export function selectMethod(method: string) {
    const menuElement = document.getElementById('menu') as HTMLElement;
    const computerScreenElement = document.getElementById('computer-screen') as HTMLElement;

    // Blendet das Menü und den Computer-Screen aus, wenn ein Popup aktiv ist
    if (menuElement) {
        hideMenuAndWidget(menuElement);
    }
    if (computerScreenElement) {
        computerScreenElement.style.display = 'none';
    }

    // Zeigt das entsprechende Popup an
    if (method === 'Caesar Cipher') {
        showCaesarCipherPopup();
    } else if (method === 'Vigenère Cipher') {
        showVigenereCipherPopup();
    } else if (method === 'XOR') {
        showXorCipherPopup();
    } else if (method === 'Blowfish') {
        showBlowfishCipherPopup();
    } else if (method === 'SHA-256') {
        showSha256CipherPopup();
    } else if (method === 'RIPEMD-160') {
        showRipemd160CipherPopup();
    } else if (method === 'AES') {
        showAesCipherPopup();
    } else if (method === 'RSA') { 
        showRsaCipherPopup();
    }
}

// Funktion zum Anzeigen des Ergebnisses
export function displayResult(method: string, input: string, result: string) {
    const inputBar = document.getElementById('input-bar') as HTMLElement;

    inputBar.innerHTML = `
     <div>
        <p id="selectedMethod">Method: ${method}</p>
        <p id="inputTextDisplay">Input: ${input}</p>
        <p id="encryptedText">Encrypted text: ${result}</p>
      </div>
    `;
    inputBar.style.display = 'flex';
}