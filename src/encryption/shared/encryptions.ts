import { showCaesarCipherPopup } from "../algorithms/symmetric/caesar/caesarCipher";
import { showVigenereCipherPopup } from "../algorithms/symmetric/vigenere/vigenereCipher";
import { showXorCipherPopup } from "../algorithms/symmetric/xor/xorCipher";
import { showAesCipherPopup } from "../algorithms/symmetric/aes/aesCipher";
import { showBlowfishCipherPopup } from "../algorithms/symmetric/blowfish/blowfishCipher";
import { showRsaCipherPopup } from "../algorithms/asymmetric/rsa/rsaCipher";
import { showRipemd160CipherPopup } from "../algorithms/hash/ripemd160Cipher";
import { showSha256CipherPopup } from "../algorithms/hash/sha256Cipher";
import { caesarEncrypt, caesarDecrypt } from "../algorithms/symmetric/caesar/caesarCipher";
import { vigenereEncrypt, vigenereDecrypt } from "../algorithms/symmetric/vigenere/vigenereCipher";

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

// Funktion zum Anzeigen des Menüs und des Widgets
export function showMenuAndWidget(menuElement: HTMLElement) {
    if (menuElement) {
        menuElement.style.display = 'block';
        const widgetContainer = document.getElementById('donate-widget')?.parentElement as HTMLElement;
        if (widgetContainer) {
            widgetContainer.style.display = 'block';
        }
    }
}

// Funktion zur Auswahl der Verschlüsselungsmethode
export function selectMethod(method: string) {
    const menuElement = document.getElementById('menu') as HTMLElement;

    // Blendet nur das Menü aus, wenn ein Popup aktiv ist
    if (menuElement) {
        menuElement.style.display = 'none';
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

export function selectMethodNew(method: string) {
    const inputBar = document.getElementById('input-bar');
    if (!inputBar) return;

    inputBar.style.display = 'block';
    inputBar.innerHTML = `
        <div class="input-container">
            <h3>Text ${method}</h3>
            <textarea id="input-text" placeholder="Gib deinen Text ein..."></textarea>
            <div class="key-container">
                ${getKeyInput(method)}
            </div>
            <div class="button-container">
                <button onclick="encryptText('${method}')">Verschlüsseln</button>
                <button onclick="decryptText('${method}')">Entschlüsseln</button>
            </div>
            <div id="result"></div>
        </div>
    `;
}

function getKeyInput(method: string): string {
    switch (method) {
        case 'Caesar Verschlüsselung':
            return `
                <label for="shift">Verschiebung:</label>
                <input type="number" id="shift" min="1" max="25" value="3">
            `;
        case 'Vigenère Verschlüsselung':
            return `
                <label for="key">Schlüssel:</label>
                <input type="text" id="key" placeholder="Schlüsselwort eingeben">
            `;
        case 'XOR Verschlüsselung':
            return `
                <label for="key">Schlüssel:</label>
                <input type="text" id="key" placeholder="Schlüssel eingeben">
            `;
        default:
            return '';
    }
}

(window as any).encryptText = function(method: string) {
    const inputText = (document.getElementById('input-text') as HTMLTextAreaElement)?.value;
    if (!inputText) return;

    let result = '';
    switch (method) {
        case 'Caesar Verschlüsselung':
            const shift = parseInt((document.getElementById('shift') as HTMLInputElement)?.value || '3');
            result = caesarEncrypt(inputText, shift);
            break;
        case 'Vigenère Verschlüsselung':
            const vigenereKey = (document.getElementById('key') as HTMLInputElement)?.value;
            if (vigenereKey) {
                result = vigenereEncrypt(inputText, vigenereKey);
            }
            break;
        case 'XOR Verschlüsselung':
            const xorKey = (document.getElementById('key') as HTMLInputElement)?.value;
            if (xorKey) {
                result = xorEncrypt(inputText, xorKey);
            }
            break;
        // Weitere Verschlüsselungsmethoden hier hinzufügen
    }

    const resultElement = document.getElementById('result');
    if (resultElement) {
        resultElement.innerHTML = `
            <h4>Verschlüsselter Text:</h4>
            <div class="result-text">${result}</div>
        `;
    }
};

(window as any).decryptText = function(method: string) {
    const inputText = (document.getElementById('input-text') as HTMLTextAreaElement)?.value;
    if (!inputText) return;

    let result = '';
    switch (method) {
        case 'Caesar Verschlüsselung':
            const shift = parseInt((document.getElementById('shift') as HTMLInputElement)?.value || '3');
            result = caesarDecrypt(inputText, shift);
            break;
        case 'Vigenère Verschlüsselung':
            const vigenereKey = (document.getElementById('key') as HTMLInputElement)?.value;
            if (vigenereKey) {
                result = vigenereDecrypt(inputText, vigenereKey);
            }
            break;
        case 'XOR Verschlüsselung':
            const xorKey = (document.getElementById('key') as HTMLInputElement)?.value;
            if (xorKey) {
                result = xorEncrypt(inputText, xorKey); // XOR ist symmetrisch
            }
            break;
        // Weitere Verschlüsselungsmethoden hier hinzufügen
    }

    const resultElement = document.getElementById('result');
    if (resultElement) {
        resultElement.innerHTML = `
            <h4>Entschlüsselter Text:</h4>
            <div class="result-text">${result}</div>
        `;
    }
};

function xorEncrypt(text: string, key: string): string {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
}