import CryptoJS from 'crypto-js';
import { displayResult } from './encryptions';
import { initializeAndShowWidget, hideWidget } from './widgetUtils';


export function showSha256CipherPopup() {
    const inputBar = document.getElementById('input-bar') as HTMLElement;

    inputBar.innerHTML = `
      <div id="sha256CipherPopup" class="popup">
        <h3>SHA-256 Hash</h3>
        <label for="sha256Input">Enter text:</label>
        <input type="text" id="sha256Input" placeholder="Enter text here">
        <div class="button-container">
          <button id="sha256HashButton">Hash</button>
          <button id="sha256InfoButton">Info</button>
        </div>
        <div id="sha256Message" class="message" style="display: none; color: red;"></div>
      </div>
      <div id="sha256InfoPopup" class="popup" style="display: none;">
        <h3>SHA-256 Hash</h3>
        <p>SHA-256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that generates a fixed-size 256-bit hash value from input data.</p>
        <p>It is widely used in security applications and protocols, including TLS and SSL, PGP, SSH, IPsec, and more.</p>
        <p>For more information, visit the <a href="https://en.wikipedia.org/wiki/SHA-2" target="_blank">Wikipedia page</a>.</p>
        <button id="sha256CloseInfoButton">Close</button>
      </div>
    `;
    inputBar.style.display = 'block';

    document.getElementById('sha256HashButton')?.addEventListener('click', handleHashButtonClick);
    document.getElementById('sha256InfoButton')?.addEventListener('click', () => {
        const infoPopup = document.getElementById('sha256InfoPopup') as HTMLElement;
        infoPopup.style.display = 'block';
        initializeAndShowWidget();

    });
    document.getElementById('sha256CloseInfoButton')?.addEventListener('click', () => {
        const infoPopup = document.getElementById('sha256InfoPopup') as HTMLElement;
        infoPopup.style.display = 'none';
        hideWidget();
    });
}

function handleHashButtonClick() {
    const inputElement = document.getElementById('sha256Input') as HTMLInputElement;
    const messageElement = document.getElementById('sha256Message') as HTMLElement;
    const inputText = inputElement.value;

    if (inputText.length === 0) {
        messageElement.innerText = 'Please enter a valid text.';
        messageElement.style.display = 'block';
        return;
    }

    const hashedText = sha256Cipher(inputText);
    displayResult('SHA-256 Hash', inputText, hashedText);

    const popup = document.getElementById('sha256CipherPopup') as HTMLElement;
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

function sha256Cipher(text: string): string {
    const hashed = CryptoJS.SHA256(text);
    return hashed.toString(CryptoJS.enc.Hex);
}

export { sha256Cipher };