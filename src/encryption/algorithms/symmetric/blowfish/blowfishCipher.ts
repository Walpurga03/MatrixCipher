import CryptoJS from "crypto-js";
import { displayResult } from "../../../../encryption/shared/encryptions";

export function showBlowfishCipherPopup() {
    const inputBar = document.getElementById('input-bar') as HTMLElement;

    inputBar.innerHTML = `
      <div id="blowfishCipherPopup" class="popup">
        <h3>Blowfish Cipher Encryption</h3>
        <label for="blowfishInput">Enter text:</label>
        <input type="text" id="blowfishInput" placeholder="Enter text here">
        <label for="blowfishKey">Enter key:</label>
        <input type="text" id="blowfishKey" placeholder="Enter key here">
        <div class="button-container">
          <button id="blowfishEncryptButton">Encrypt</button>
          <button id="blowfishDecryptButton">Decrypt</button>
          <button id="blowfishInfoButton">Info</button>
        </div>
        <div id="blowfishMessage" class="message" style="display: none; color: red;"></div>
      </div>
      <div id="blowfishInfoPopup" class="popup" style="display: none;">
        <h3>Blowfish Cipher</h3>
        <p>The Blowfish cipher is a symmetric-key block cipher designed to provide fast and secure encryption.</p>
        <p>It uses a variable-length key, from 32 bits to 448 bits, making it ideal for both domestic and exportable use.</p>
        <p>For more information, visit the <a href="https://en.wikipedia.org/wiki/Blowfish_(cipher)" target="_blank">Wikipedia page</a>.</p>
        <button id="blowfishCloseInfoButton">Close</button>
      </div>
    `;
    inputBar.style.display = 'block';

    document.getElementById('blowfishEncryptButton')?.addEventListener('click', handleEncryptButtonClick);
    document.getElementById('blowfishDecryptButton')?.addEventListener('click', handleDecryptButtonClick);
    document.getElementById('blowfishInfoButton')?.addEventListener('click', () => {
        const infoPopup = document.getElementById('blowfishInfoPopup') as HTMLElement;
        infoPopup.style.display = 'block';
    });
    document.getElementById('blowfishCloseInfoButton')?.addEventListener('click', () => {
        const infoPopup = document.getElementById('blowfishInfoPopup') as HTMLElement;
        infoPopup.style.display = 'none';
    });
}

function handleEncryptButtonClick() {
    const inputElement = document.getElementById('blowfishInput') as HTMLInputElement;
    const keyElement = document.getElementById('blowfishKey') as HTMLInputElement;
    const messageElement = document.getElementById('blowfishMessage') as HTMLElement;
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

    const encryptedText = blowfishCipher(inputText, key);
    displayResult('Blowfish Cipher', inputText, encryptedText);

    const popup = document.getElementById('blowfishCipherPopup') as HTMLElement;
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
    const inputElement = document.getElementById('blowfishInput') as HTMLInputElement;
    const keyElement = document.getElementById('blowfishKey') as HTMLInputElement;
    const messageElement = document.getElementById('blowfishMessage') as HTMLElement;
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

    const decryptedText = blowfishDecipher(inputText, key);
    displayResult('Blowfish Cipher', inputText, decryptedText);

    const popup = document.getElementById('blowfishCipherPopup') as HTMLElement;
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

function blowfishCipher(text: string, key: string): string {
    const iv = CryptoJS.enc.Hex.parse('0000000000000000'); // Fester IV
    const encrypted = CryptoJS.Blowfish.encrypt(text, key, { iv: iv });
    console.log('Blowfish Cipher:', encrypted.toString());
    return encrypted.toString();
}

function blowfishDecipher(encryptedText: string, key: string): string {
    const iv = CryptoJS.enc.Hex.parse('0000000000000000'); // Fester IV
    const decrypted = CryptoJS.Blowfish.decrypt(encryptedText, key, { iv: iv });
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    console.log('Blowfish Decipher:', decryptedText);
    return decryptedText;
}

export { blowfishCipher, blowfishDecipher };