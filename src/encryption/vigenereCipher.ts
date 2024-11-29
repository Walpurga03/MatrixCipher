import { displayResult } from './encryptions';

function isAlphabetic(str: string): boolean {
    return /^[a-zA-Z]+$/.test(str);
}

function validateVigenereInput(inputText: string, key: string, messageElement: HTMLElement): boolean {
    if (inputText.length === 0 || key.length === 0) {
        messageElement.innerText = 'Please enter valid text and key.';
        messageElement.style.display = 'block';
        return false;
    }

    if (!isAlphabetic(key)) {
        messageElement.innerText = 'Please enter a key containing only alphabetic characters.';
        messageElement.style.display = 'block';
        return false;
    }

    return true;
}

function handleEncryptButtonClick() {
    const inputElement = document.getElementById('vigenereInput') as HTMLInputElement;
    const keyElement = document.getElementById('vigenereKey') as HTMLInputElement;
    const messageElement = document.getElementById('vigenereMessage') as HTMLElement;
    const inputText = inputElement.value;
    const key = keyElement.value;

    if (!validateVigenereInput(inputText, key, messageElement)) {
        return;
    }

    const encryptedText = vigenereEncrypt(inputText, key);
    displayResult('Vigenère Encryption', inputText, encryptedText);

    // Cleanup
    const overlay = document.querySelector('.popup-overlay');
    const popup = document.querySelector('.popup');
    if (overlay?.parentNode) overlay.parentNode.removeChild(overlay);
    if (popup?.parentNode) popup.parentNode.removeChild(popup);
}

function handleDecryptButtonClick() {
    const inputElement = document.getElementById('vigenereInput') as HTMLInputElement;
    const keyElement = document.getElementById('vigenereKey') as HTMLInputElement;
    const messageElement = document.getElementById('vigenereMessage') as HTMLElement;
    const inputText = inputElement.value;
    const key = keyElement.value;

    if (!validateVigenereInput(inputText, key, messageElement)) {
        return;
    }

    const decryptedText = vigenereDecrypt(inputText, key);
    displayResult('Vigenère Decryption', inputText, decryptedText);

    // Cleanup
    const overlay = document.querySelector('.popup-overlay');
    const popup = document.querySelector('.popup');
    if (overlay?.parentNode) overlay.parentNode.removeChild(overlay);
    if (popup?.parentNode) popup.parentNode.removeChild(popup);
}

export function showVigenereCipherPopup() {
    // Erstelle Overlay für Blur-Effekt
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    document.body.appendChild(overlay);

    // Erstelle das Hauptpopup
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <h3>Vigenère Encryption/Decryption</h3>
        <div style="width: 100%;">
            <label for="vigenereInput">Enter text:</label>
            <input type="text" id="vigenereInput" placeholder="Enter text to encrypt/decrypt">
            
            <label for="vigenereKey">Enter key (letters only):</label>
            <input type="text" id="vigenereKey" placeholder="Enter encryption key">
            
            <div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
                <button id="vigenereEncryptButton">Encrypt</button>
                <button id="vigenereDecryptButton">Decrypt</button>
                <button id="vigenereInfoButton">Info</button>
            </div>
            
            <div id="vigenereMessage" class="message" style="display: none; color: #ff4444; margin-top: 15px; text-align: center;"></div>
        </div>
    `;
    document.body.appendChild(popup);

    // Info Popup (initially hidden)
    const infoPopup = document.createElement('div');
    infoPopup.className = 'popup';
    infoPopup.style.display = 'none';
    const infoContent = `
        <h3>Die Vigenère-Verschlüsselung</h3>
        <div style="text-align: left; padding: 15px;">
            <p>Die Vigenère-Verschlüsselung ist eine erweiterte Form der Caesar-Verschlüsselung, die im 16. Jahrhundert entwickelt wurde. Sie verwendet ein Schlüsselwort, um den Text zu verschlüsseln.</p>
            
            <h4 style="color: #00ff00; margin: 15px 0;">Wie funktioniert es?</h4>
            <p>1. Der Schlüssel wird wiederholt, bis er die Länge des Textes erreicht:<br>
               Text: HALLO MATRIX<br>
               Key:  CODE CODE CO</p>
            
            <p>2. Jeder Buchstabe des Schlüssels bestimmt die Verschiebung für den entsprechenden Buchstaben im Text:<br>
               C = 3 Positionen<br>
               O = 15 Positionen<br>
               D = 4 Positionen<br>
               E = 5 Positionen</p>

            <h4 style="color: #00ff00; margin: 15px 0;">Beispiel:</h4>
            <p>Text: HALLO<br>
               Key:  CODE<br>
               Verschlüsselt: JSPZS</p>

            <p>Erklärung der ersten beiden Buchstaben:<br>
               H + C (3) = J<br>
               A + O (15) = S</p>

            <h4 style="color: #00ff00; margin: 15px 0;">Vorteile:</h4>
            <ul style="list-style-type: none; padding-left: 0;">
                <li>✓ Schwerer zu knacken als Caesar</li>
                <li>✓ Jeder Buchstabe hat eine andere Verschiebung</li>
                <li>✓ Gleiche Buchstaben werden unterschiedlich verschlüsselt</li>
            </ul>

            <p style="margin-top: 15px; font-style: italic; color: #00cc00;">Tipp: Verwende ein einfach zu merkendes, aber nicht zu kurzes Schlüsselwort!</p>
        </div>
        <div class="button-container">
            <button id="vigenereCloseInfoButton">Schließen</button>
        </div>
    `;
    infoPopup.innerHTML = infoContent;
    document.body.appendChild(infoPopup);

    // Event Listeners
    const encryptButton = document.getElementById('vigenereEncryptButton');
    const decryptButton = document.getElementById('vigenereDecryptButton');
    const infoButton = document.getElementById('vigenereInfoButton');
    const closeInfoButton = document.getElementById('vigenereCloseInfoButton');

    if (encryptButton) {
        encryptButton.addEventListener('click', handleEncryptButtonClick);
    }
    if (decryptButton) {
        decryptButton.addEventListener('click', handleDecryptButtonClick);
    }
    if (infoButton) {
        infoButton.addEventListener('click', () => {
            infoPopup.style.display = 'block';
        });
    }
    if (closeInfoButton) {
        closeInfoButton.addEventListener('click', () => {
            infoPopup.style.display = 'none';
        });
    }

    // Cleanup function
    const cleanup = () => {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        if (popup.parentNode) popup.parentNode.removeChild(popup);
        if (infoPopup.parentNode) infoPopup.parentNode.removeChild(infoPopup);
        
        const menuElement = document.getElementById('menu');
        const computerScreen = document.getElementById('computer-screen');
        
        if (menuElement) menuElement.style.display = 'block';
        if (computerScreen) computerScreen.style.display = 'block';
    };

    // Add Back to Menu button to main popup
    const mainBackToMenuButton = document.createElement('button');
    mainBackToMenuButton.textContent = 'Back to Menu';
    mainBackToMenuButton.style.marginTop = '20px';
    mainBackToMenuButton.addEventListener('click', cleanup);
    popup.appendChild(mainBackToMenuButton);
}

export function vigenereEncrypt(text: string, key: string): string {
    // Schlüssel auf Buchstaben normalisieren und in Großbuchstaben umwandeln
    const normalizedKey = key.replace(/[^a-z]/gi, '').toUpperCase();
    if (normalizedKey.length === 0) return text;

    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        // Prüfe, ob es ein Buchstabe ist
        if (char.match(/[a-z]/i)) {
            const isUpperCase = char === char.toUpperCase();
            const charCode = char.toUpperCase().charCodeAt(0) - 65;
            const keyChar = normalizedKey[keyIndex % normalizedKey.length];
            const keyShift = keyChar.charCodeAt(0) - 65;
            
            // Vigenère-Verschlüsselung: (Buchstabe + Schlüssel) mod 26
            let encryptedCode = (charCode + keyShift) % 26;
            
            // Konvertiere zurück in einen Buchstaben und behalte Groß-/Kleinschreibung bei
            let encryptedChar = String.fromCharCode(encryptedCode + 65);
            result += isUpperCase ? encryptedChar : encryptedChar.toLowerCase();
            
            keyIndex++;
        } else {
            // Behalte Nicht-Buchstaben unverändert
            result += char;
        }
    }
    
    return result;
}

export function vigenereDecrypt(text: string, key: string): string {
    // Schlüssel auf Buchstaben normalisieren und in Großbuchstaben umwandeln
    const normalizedKey = key.replace(/[^a-z]/gi, '').toUpperCase();
    if (normalizedKey.length === 0) return text;

    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        // Prüfe, ob es ein Buchstabe ist
        if (char.match(/[a-z]/i)) {
            const isUpperCase = char === char.toUpperCase();
            const charCode = char.toUpperCase().charCodeAt(0) - 65;
            const keyChar = normalizedKey[keyIndex % normalizedKey.length];
            const keyShift = keyChar.charCodeAt(0) - 65;
            
            // Vigenère-Entschlüsselung: (Buchstabe - Schlüssel + 26) mod 26
            let decryptedCode = (charCode - keyShift + 26) % 26;
            
            // Konvertiere zurück in einen Buchstaben und behalte Groß-/Kleinschreibung bei
            let decryptedChar = String.fromCharCode(decryptedCode + 65);
            result += isUpperCase ? decryptedChar : decryptedChar.toLowerCase();
            
            keyIndex++;
        } else {
            // Behalte Nicht-Buchstaben unverändert
            result += char;
        }
    }
    
    return result;
}