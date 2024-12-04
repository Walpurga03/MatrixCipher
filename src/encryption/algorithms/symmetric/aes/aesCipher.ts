import CryptoJS from "crypto-js";
import { displayResult } from "../../../../encryption/shared/encryptions";


export function showAesCipherPopup() {
    const inputBar = document.getElementById('input-bar') as HTMLElement;

    inputBar.innerHTML = `
      <div id="aesCipherPopup" class="popup">
        <h3>AES Encryption/Decryption</h3>
        <label for="aesInput">Enter text:</label>
        <input type="text" id="aesInput" placeholder="Enter text here">
        <label for="aesKey">Enter key:</label>
        <input type="text" id="aesKey" placeholder="Enter key here">
        <div class="button-group">
            <button id="aesEncryptButton">Encrypt</button>
            <button id="aesDecryptButton">Decrypt</button>
            <button id="aesInfoButton">Info</button>
        </div>
        <div id="aesMessage" class="message" style="display: none; color: red;"></div>
      </div>
      <div id="aesInfoPopup" class="popup" style="display: none;">
        <h3>AES Cipher</h3>
        <p>AES (Advanced Encryption Standard) is a symmetric encryption algorithm widely used across the globe.</p>
        <p>It supports key sizes of 128, 192, and 256 bits and is known for its speed and security.</p>
        <p>For more information, visit the <a href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard" target="_blank">Wikipedia page</a>.</p>
        <button id="aesCloseInfoButton">Close</button>
      </div>
    `;
    inputBar.style.display = 'block';

    document.getElementById('aesEncryptButton')?.addEventListener('click', handleEncryptButtonClick);
    document.getElementById('aesDecryptButton')?.addEventListener('click', handleDecryptButtonClick);
    document.getElementById('aesInfoButton')?.addEventListener('click', () => {
        const infoPopup = document.getElementById('aesInfoPopup') as HTMLElement;
        infoPopup.style.display = 'block';
    });
    document.getElementById('aesCloseInfoButton')?.addEventListener('click', () => {
        const infoPopup = document.getElementById('aesInfoPopup') as HTMLElement;
        infoPopup.style.display = 'none';
    });
}

function handleEncryptButtonClick() {
    const inputElement = document.getElementById('aesInput') as HTMLInputElement;
    const keyElement = document.getElementById('aesKey') as HTMLInputElement;
    const messageElement = document.getElementById('aesMessage') as HTMLElement;
    const inputText = inputElement.value;
    const key = keyElement.value;

    if (inputText.length === 0 || key.length === 0) {
        messageElement.innerText = 'Please enter valid text and key.';
        messageElement.style.display = 'block';
        return;
    }

    const encryptedText = aesCipher(inputText, key);
    displayResult('AES Encryption', inputText, encryptedText);

    const popup = document.getElementById('aesCipherPopup') as HTMLElement;
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
    const inputElement = document.getElementById('aesInput') as HTMLInputElement;
    const keyElement = document.getElementById('aesKey') as HTMLInputElement;
    const messageElement = document.getElementById('aesMessage') as HTMLElement;
    const inputText = inputElement.value;
    const key = keyElement.value;

    if (inputText.length === 0 || key.length === 0) {
        messageElement.innerText = 'Please enter valid text and key.';
        messageElement.style.display = 'block';
        return;
    }

    const decryptedText = aesDecipher(inputText, key);
    displayResult('AES Decryption', inputText, decryptedText);

    const popup = document.getElementById('aesCipherPopup') as HTMLElement;
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

function aesCipher(text: string, key: string): string {
    const encrypted = CryptoJS.AES.encrypt(text, key);
    return encrypted.toString();
}

function aesDecipher(encryptedText: string, key: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
}

export { aesCipher, aesDecipher };