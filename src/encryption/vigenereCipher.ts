import { displayResult } from './encryptions';

export function showVigenereCipherPopup() {
    const inputBar = document.getElementById('input-bar') as HTMLElement;

    inputBar.innerHTML = `
      <div id="vigenereCipherPopup" class="popup">
        <h3>Vigenère Encryption/Decryption</h3>
        <label for="vigenereInput">Enter text:</label>
        <input type="text" id="vigenereInput" placeholder="Enter text here">
        <label for="vigenereKey">Enter key:</label>
        <input type="text" id="vigenereKey" placeholder="Enter key here">
        <div class="button-group">
            <button id="vigenereEncryptButton">Encrypt</button>
            <button id="vigenereDecryptButton">Decrypt</button>
            <button id="vigenereInfoButton">Info</button>
        </div>
        <div id="vigenereMessage" class="message" style="display: none; color: red;"></div>
      </div>
      <div id="vigenereInfoPopup" class="popup" style="display: none;">
        <h3>Vigenère Encryption</h3>
        <p>The Vigenère cipher is a method of encrypting alphabetic text by using a simple form of polyalphabetic substitution.</p>
        <p>A keyword is used to shift the letters of the plaintext. Each letter in the keyword shifts corresponding letters in the plaintext.</p>
        <p>For more information, visit the <a href="https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher" target="_blank">Wikipedia page</a>.</p>
        <button id="vigenereCloseInfoButton">Close</button>
      </div>
    `;
    inputBar.style.display = 'block';

    document.getElementById('vigenereEncryptButton')?.addEventListener('click', handleEncryptButtonClick);
    document.getElementById('vigenereDecryptButton')?.addEventListener('click', handleDecryptButtonClick);
    document.getElementById('vigenereInfoButton')?.addEventListener('click', () => {
        const infoPopup = document.getElementById('vigenereInfoPopup') as HTMLElement;
        infoPopup.style.display = 'block';
    });
    document.getElementById('vigenereCloseInfoButton')?.addEventListener('click', () => {
        const infoPopup = document.getElementById('vigenereInfoPopup') as HTMLElement;
        infoPopup.style.display = 'none';
    });
}

function handleEncryptButtonClick() {
    const inputElement = document.getElementById('vigenereInput') as HTMLInputElement;
    const keyElement = document.getElementById('vigenereKey') as HTMLInputElement;
    const messageElement = document.getElementById('vigenereMessage') as HTMLElement;
    const inputText = inputElement.value;
    const key = keyElement.value;

    if (inputText.length === 0 || key.length === 0) {
        messageElement.innerText = 'Please enter valid text and key.';
        messageElement.style.display = 'block';
        return;
    }

    const encryptedText = vigenereCipher(inputText, key, true);
    displayResult('Vigenère Encryption', inputText, encryptedText);

    const popup = document.getElementById('vigenereCipherPopup') as HTMLElement;
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
    const inputElement = document.getElementById('vigenereInput') as HTMLInputElement;
    const keyElement = document.getElementById('vigenereKey') as HTMLInputElement;
    const messageElement = document.getElementById('vigenereMessage') as HTMLElement;
    const inputText = inputElement.value;
    const key = keyElement.value;

    if (inputText.length === 0 || key.length === 0) {
        messageElement.innerText = 'Please enter valid text and key.';
        messageElement.style.display = 'block';
        return;
    }

    const decryptedText = vigenereCipher(inputText, key, false);
    displayResult('Vigenère Decryption', inputText, decryptedText);

    const popup = document.getElementById('vigenereCipherPopup') as HTMLElement;
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

export function vigenereCipher(text: string, key: string, isEncrypt: boolean): string {
    if (key.length === 0) {
        return text;
    }

    const keyLength = key.length;
    let keyIndex = 0;
    const lowerKey = key.toLowerCase();

    const processedText = text.split('').map(char => {
        const charCode = char.charCodeAt(0);

        if (!char.match(/[a-zA-Z]/)) {
            return char;
        }

        const keyCharCode = lowerKey[keyIndex % keyLength].charCodeAt(0);
        const base = charCode >= 97 ? 97 : 65;
        const keyBase = 97;
        const shift = isEncrypt ? (keyCharCode - keyBase) : -(keyCharCode - keyBase);
        const processedChar = String.fromCharCode(((charCode - base + shift + 26) % 26) + base);

        const finalChar = char === char.toUpperCase() ? processedChar.toUpperCase() : processedChar.toLowerCase();
        keyIndex++;
        return finalChar;
    }).join('');

    return processedText;
}