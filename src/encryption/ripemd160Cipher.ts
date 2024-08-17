import CryptoJS from 'crypto-js';
import { displayResult } from './encryptions';
import { initializeAndShowWidget, hideWidget } from './widgetUtils';


export function showRipemd160CipherPopup() {
    const inputBar = document.getElementById('input-bar') as HTMLElement;

    inputBar.innerHTML = `
      <div id="ripemd160CipherPopup" class="popup">
        <h3>RIPEMD-160 Hash</h3>
        <label for="ripemd160Input">Enter text:</label>
        <input type="text" id="ripemd160Input" placeholder="Enter text here">
        <div class="button-container">
          <button id="ripemd160HashButton">Hash</button>
          <button id="ripemd160InfoButton">Info</button>
        </div>
        <div id="ripemd160Message" class="message" style="display: none; color: red;"></div>
      </div>
      <div id="ripemd160InfoPopup" class="popup" style="display: none;">
        <h3>RIPEMD-160 Hash</h3>
        <p>RIPEMD-160 is a cryptographic hash function designed to provide a secure and unique hash value for input data.</p>
        <p>It produces a 160-bit hash value and is used in various security applications and protocols.</p>
        <p>For more information, visit the <a href="https://en.wikipedia.org/wiki/RIPEMD" target="_blank">Wikipedia page</a>.</p>
        <button id="ripemd160CloseInfoButton">Close</button>
      </div>
    `;
    inputBar.style.display = 'block';

    document.getElementById('ripemd160HashButton')?.addEventListener('click', handleHashButtonClick);
    document.getElementById('ripemd160InfoButton')?.addEventListener('click', () => {
        const infoPopup = document.getElementById('ripemd160InfoPopup') as HTMLElement;
        infoPopup.style.display = 'block';
        initializeAndShowWidget();
    });
    document.getElementById('ripemd160CloseInfoButton')?.addEventListener('click', () => {
        const infoPopup = document.getElementById('ripemd160InfoPopup') as HTMLElement;
        infoPopup.style.display = 'none';
        hideWidget();
    });
}

function handleHashButtonClick() {
    const inputElement = document.getElementById('ripemd160Input') as HTMLInputElement;
    const messageElement = document.getElementById('ripemd160Message') as HTMLElement;
    const inputText = inputElement.value;

    if (inputText.length === 0) {
        messageElement.innerText = 'Please enter a valid text.';
        messageElement.style.display = 'block';
        return;
    }

    const hashedText = ripemd160Cipher(inputText);
    displayResult('RIPEMD-160 Hash', inputText, hashedText);

    const popup = document.getElementById('ripemd160CipherPopup') as HTMLElement;
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

function ripemd160Cipher(text: string): string {
    const hashed = CryptoJS.RIPEMD160(text);
    return hashed.toString(CryptoJS.enc.Hex);
}

export { ripemd160Cipher };