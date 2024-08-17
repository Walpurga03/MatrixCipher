import { displayResult } from './encryptions';
import { initializeAndShowWidget, hideWidget } from './widgetUtils';


export function showXorCipherPopup() {
    const inputBar = document.getElementById('input-bar') as HTMLElement;

    // Zeigt das Popup für XOR Cipher an
    inputBar.innerHTML = `
      <div id="xorCipherPopup" class="popup">
        <h3>XOR Cipher Encryption</h3>
        <label for="xorInput">Enter text:</label>
        <input type="text" id="xorInput" placeholder="Enter text here">
        <label for="xorKey">Enter key:</label>
        <input type="text" id="xorKey" placeholder="Enter key here">
        <div class="button-container">
            <button id="xorEncryptButton">Encrypt</button>
            <button id="xorDecryptButton">Decrypt</button>
            <button id="xorInfoButton">Info</button>
        </div>
        <div id="xorMessage" class="message" style="display: none; color: red;"></div>
      </div>
      <div id="xorInfoPopup" class="popup" style="display: none;">
        <h3>XOR Cipher</h3>
        <p>The XOR cipher is a simple encryption algorithm that uses the XOR bitwise operation to encrypt and decrypt text.</p>
        <p>Each character in the plaintext is XORed with a character from the key. The same key is used for both encryption and decryption.</p>
        <p>For more information, visit the <a href="https://en.wikipedia.org/wiki/XOR_cipher" target="_blank">Wikipedia page</a>.</p>
        <button id="xorCloseInfoButton">Close</button>
      </div>
    `;
    inputBar.style.display = 'block';

    document.getElementById('xorEncryptButton')?.addEventListener('click', handleEncryptButtonClick);
    document.getElementById('xorDecryptButton')?.addEventListener('click', handleDecryptButtonClick);
    document.getElementById('xorInfoButton')?.addEventListener('click', () => {
        const infoPopup = document.getElementById('xorInfoPopup') as HTMLElement;
        infoPopup.style.display = 'block';
        initializeAndShowWidget();
    });
    document.getElementById('xorCloseInfoButton')?.addEventListener('click', () => {
        const infoPopup = document.getElementById('xorInfoPopup') as HTMLElement;
        infoPopup.style.display = 'none';
        hideWidget();
    });
}

function handleEncryptButtonClick() {
    const inputElement = document.getElementById('xorInput') as HTMLInputElement;
    const keyElement = document.getElementById('xorKey') as HTMLInputElement;
    const messageElement = document.getElementById('xorMessage') as HTMLElement;
    const inputText = inputElement.value;
    const key = keyElement.value;

    if (inputText.length === 0) {
        messageElement.innerText = 'Please enter a valid text.';
        messageElement.style.display = 'block';
        return;
    }

    if (key.length === 0) {
        messageElement.innerText = 'Please enter a valid key.';
        messageElement.style.display = 'block';
        return;
    }

    const encryptedText = xorCipher(inputText, key);
    displayResult('XOR Cipher', inputText, encryptedText);

    // Popup ausblenden und Hauptbildschirm wieder anzeigen
    const popup = document.getElementById('xorCipherPopup') as HTMLElement;
    if (popup) {
        popup.remove();
    }

    const menuElement = document.getElementById('menu') as HTMLElement;
    if (menuElement) {
        menuElement.style.display = 'block';
    }

    const computerScreenElement = document.getElementById('computer-screen') as HTMLElement;
    if (computerScreenElement) {
        computerScreenElement.style.display = 'block';
    }
}

function handleDecryptButtonClick() {
    const inputElement = document.getElementById('xorInput') as HTMLInputElement;
    const keyElement = document.getElementById('xorKey') as HTMLInputElement;
    const messageElement = document.getElementById('xorMessage') as HTMLElement;
    const inputText = inputElement.value;
    const key = keyElement.value;

    if (inputText.length === 0) {
        messageElement.innerText = 'Please enter a valid text.';
        messageElement.style.display = 'block';
        return;
    }

    if (key.length === 0) {
        messageElement.innerText = 'Please enter a valid key.';
        messageElement.style.display = 'block';
        return;
    }

    const decryptedText = xorDecipher(inputText, key);
    displayResult('XOR Cipher', inputText, decryptedText);

    // Popup ausblenden und Hauptbildschirm wieder anzeigen
    const popup = document.getElementById('xorCipherPopup') as HTMLElement;
    if (popup) {
        popup.remove();
    }

    const menuElement = document.getElementById('menu') as HTMLElement;
    if (menuElement) {
        menuElement.style.display = 'block';
    }

    const computerScreenElement = document.getElementById('computer-screen') as HTMLElement;
    if (computerScreenElement) {
        computerScreenElement.style.display = 'block';
    }
}

function xorCipher(text: string, key: string): string {
    if (key.length === 0) {
        return '';
    }

    const result: string[] = [];
    const keyLength = key.length;

    for (let i = 0; i < text.length; i += 4) {
        const keyBlock = (
            (key.charCodeAt(i % keyLength) << 24) |
            (key.charCodeAt((i + 1) % keyLength) << 16) |
            (key.charCodeAt((i + 2) % keyLength) << 8) |
            key.charCodeAt((i + 3) % keyLength)
        ) >>> 0; // 32-Bit-Wert des aktuellen Schlüsselblocks

        const textBlock = (
            ((text.charCodeAt(i) || 0) << 24) |
            ((text.charCodeAt(i + 1) || 0) << 16) |
            ((text.charCodeAt(i + 2) || 0) << 8) |
            (text.charCodeAt(i + 3) || 0)
        ) >>> 0; // 32-Bit-Wert des aktuellen Textblocks

        const xorBlock = textBlock ^ keyBlock; // XOR-Operation
        result.push(xorBlock.toString(16).padStart(8, '0')); // In Hexadezimal umwandeln und auf 8 Stellen auffüllen
    }

    return result.join('').toLowerCase(); // Ausgabe in Kleinbuchstaben
}

function xorDecipher(encryptedText: string, key: string): string {
    if (key.length === 0) {
        return '';
    }

    const result: string[] = [];
    const keyLength = key.length;

    for (let i = 0; i < encryptedText.length; i += 8) {
        const keyBlock = (
            (key.charCodeAt((i / 2) % keyLength) << 24) |
            (key.charCodeAt(((i / 2) + 1) % keyLength) << 16) |
            (key.charCodeAt(((i / 2) + 2) % keyLength) << 8) |
            key.charCodeAt(((i / 2) + 3) % keyLength)
        ) >>> 0; // 32-Bit-Wert des aktuellen Schlüsselblocks

        const encryptedBlock = parseInt(encryptedText.substr(i, 8), 16) >>> 0; // 32-Bit-Wert des verschlüsselten Blocks

        const textBlock = encryptedBlock ^ keyBlock; // XOR-Operation
        result.push(
            String.fromCharCode((textBlock >> 24) & 0xff) +
            String.fromCharCode((textBlock >> 16) & 0xff) +
            String.fromCharCode((textBlock >> 8) & 0xff) +
            String.fromCharCode(textBlock & 0xff)
        ); // In Zeichen umwandeln
    }

    return result.join('').replace(/\0/g, ''); // Null-Bytes entfernen und zusammenfügen
}

export { xorCipher, xorDecipher };