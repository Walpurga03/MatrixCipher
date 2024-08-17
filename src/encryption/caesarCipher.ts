import { displayResult } from './encryptions';
import { initializeAndShowWidget, hideWidget } from './widgetUtils';
const MIN_KEY = 1;
const MAX_KEY = 25;

function validateInput(inputText: string, key: number, messageElement: HTMLElement): boolean {
    if (inputText.length === 0) {
        messageElement.innerText = 'Please enter a valid text.';
        messageElement.style.display = 'block';
        return false;
    }

    if (isNaN(key) || key < MIN_KEY || key > MAX_KEY) {
        messageElement.innerText = `Please enter a valid key between ${MIN_KEY} and ${MAX_KEY}.`;
        messageElement.style.display = 'block';
        return false;
    }

    return true;
}

function handleDecryptButtonClick() {
    const inputElement = document.getElementById('caesarInput') as HTMLInputElement;
    const keyElement = document.getElementById('caesarKey') as HTMLInputElement;
    const messageElement = document.getElementById('caesarMessage') as HTMLElement;
    const inputText = inputElement.value;
    const key = parseInt(keyElement.value);

    if (!validateInput(inputText, key, messageElement)) {
        return;
    }

    const decryptedText = caesarDecipher(inputText, key);
    displayResult('Caesar Decryption', inputText, decryptedText);

    const popup = document.getElementById('caesarCipherPopup') as HTMLElement;
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
export function showCaesarCipherPopup() {
    const inputBar = document.getElementById('input-bar') as HTMLElement;

    inputBar.innerHTML = `
      <div id="caesarCipherPopup" class="popup">
        <h3>Caesar Encryption/Decryption</h3>
        <label for="caesarInput">Enter text:</label>
        <input type="text" id="caesarInput" placeholder="Enter text here">
        <label for="caesarKey">Enter shift (number):</label>
        <input type="number" id="caesarKey" placeholder="Enter shift here">
        <div class="button-group">
            <button id="caesarEncryptButton">Encrypt</button>
            <button id="caesarDecryptButton">Decrypt</button>
            <button id="caesarInfoButton">Info</button>
        </div>
        <div id="caesarMessage" class="message" style="display: none; color: red;"></div>
      </div>
      <div id="caesarInfoPopup" class="popup" style="display: none;">
        <h3>Caesar Encryption</h3>
        <p>The Caesar cipher is a type of substitution cipher in which each letter in the plaintext is shifted a certain number of places down the alphabet.</p>
        <p>For more information, visit the <a href="https://en.wikipedia.org/wiki/Caesar_cipher" target="_blank">Wikipedia page</a>.</p>
        <button id="caesarCloseInfoButton">Close</button>
      </div>
    `;
    inputBar.style.display = 'block';

    document.getElementById('caesarEncryptButton')?.addEventListener('click', handleEncryptButtonClick);
    document.getElementById('caesarDecryptButton')?.addEventListener('click', handleDecryptButtonClick);
    document.getElementById('caesarInfoButton')?.addEventListener('click', () => {
        const infoPopup = document.getElementById('caesarInfoPopup') as HTMLElement;
        infoPopup.style.display = 'block';
        initializeAndShowWidget();
    });
    document.getElementById('caesarCloseInfoButton')?.addEventListener('click', () => {
        const infoPopup = document.getElementById('caesarInfoPopup') as HTMLElement;
        infoPopup.style.display = 'none';
        hideWidget();
    });
}

function handleEncryptButtonClick() {
    const inputElement = document.getElementById('caesarInput') as HTMLInputElement;
    const keyElement = document.getElementById('caesarKey') as HTMLInputElement;
    const messageElement = document.getElementById('caesarMessage') as HTMLElement;
    const inputText = inputElement.value;
    const key = parseInt(keyElement.value);

    if (inputText.length === 0) {
        messageElement.innerText = 'Please enter a valid text.';
        messageElement.style.display = 'block';
        return;
    }

    if (isNaN(key) || key < 1 || key > 25) {
        messageElement.innerText = 'Please enter a valid key between 1 and 25.';
        messageElement.style.display = 'block';
        return;
    }

    const encryptedText = caesarCipher(inputText, key);
    displayResult('Caesar Encryption', inputText, encryptedText);

    const popup = document.getElementById('caesarCipherPopup') as HTMLElement;
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

function caesarCipher(text: string, shift: number): string {
    return text.replace(/[a-z]/gi, (char) => {
        const start = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
    });
}

function caesarDecipher(text: string, shift: number): string {
    return caesarCipher(text, 26 - shift);
}

export { caesarCipher, caesarDecipher };