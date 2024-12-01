// Funktionen für die Vigenere-Verschlüsselung
function isAlphabetic(str: string): boolean {
    return /^[a-zA-Z]+$/.test(str);
}

export function showVigenereCipherPopup() {
    // Erstelle Overlay und Popup
    const overlay = document.createElement('div');
    overlay.className = 'vigenere-overlay';
    
    const popup = document.createElement('div');
    popup.className = 'vigenere-popup';
    
    // Popup Inhalt
    popup.innerHTML = `
        <div class="vigenere-controls">
            <button class="info-button" title="Info zur Vigenère-Verschlüsselung" onclick="showVigenereInfo()">ℹ</button>
            <button class="close-button" title="Schließen" onclick="closeVigenerePopup()">&times;</button>
        </div>
        
        <div class="vigenere-header">
            <h3>Vigenère-Verschlüsselung</h3>
        </div>
        
        <div class="vigenere-input">
            <label for="vigenere-text">Text eingeben:</label>
            <textarea id="vigenere-text" placeholder="Text zum Verschlüsseln oder Entschlüsseln eingeben..."></textarea>
        </div>
        
        <div class="vigenere-input">
            <label for="vigenere-key">Schlüsselwort:</label>
            <input type="text" id="vigenere-key" placeholder="Nur Buchstaben erlaubt">
        </div>
        
        <div class="vigenere-actions">
            <button onclick="handleVigenereEncrypt()">Verschlüsseln</button>
            <button onclick="handleVigenereDecrypt()">Entschlüsseln</button>
        </div>
        
        <div id="vigenere-result" class="vigenere-result">
            <h4>Ergebnis:</h4>
            <div class="result-text"></div>
        </div>
    `;
    
    // Füge Popup zum Overlay hinzu
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}

// Funktion zum Schließen des Popups
export function closeVigenerePopup() {
    const overlay = document.querySelector('.vigenere-overlay');
    if (overlay) {
        overlay.remove();
        
        // Zeige das Hauptmenü wieder an
        const menu = document.getElementById('menu');
        const computerScreen = document.getElementById('computer-screen');
        
        if (menu) {
            menu.style.display = 'block';
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
        }
        
        if (computerScreen) {
            computerScreen.style.display = 'block';
            computerScreen.style.opacity = '1';
            computerScreen.style.visibility = 'visible';
        }
    }
}

// Funktion zum Anzeigen der Vigenere-Info
export function showVigenereInfo() {
    const infoPopup = document.createElement('div');
    infoPopup.className = 'vigenere-info';
    
    // Hauptpopup ausblenden
    const vigenerePopup = document.querySelector('.vigenere-popup');
    if (vigenerePopup) {
        vigenerePopup.classList.add('info-active');
    }
    
    infoPopup.innerHTML = `
        <button class="close-info" onclick="closeVigenereInfo()">&times;</button>
        <h4>Vigenère-Verschlüsselung</h4>
        <div class="info-content">
            <p>Die Vigenère-Verschlüsselung ist eine polyalphabetische Substitution aus dem 16. Jahrhundert.</p>
            <p>Funktionsweise:</p>
            <ul>
                <li>Ein Schlüsselwort wird wiederholt, bis es die gleiche Länge wie der Text hat</li>
                <li>Jeder Buchstabe des Textes wird mit dem entsprechenden Buchstaben des Schlüssels verschlüsselt</li>
                <li>Die Verschiebung wird durch die Position des Schlüsselbuchstabens im Alphabet bestimmt</li>
            </ul>
            <p>Beispiel:</p>
            <div class="example">
                <p>Text: HALLO</p>
                <p>Schlüssel: KEY (wird zu KEYKE)</p>
                <p>Verschlüsselt: RIJVS</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(infoPopup);
}

// Funktion zum Schließen des Info-Popups
export function closeVigenereInfo() {
    const infoPopup = document.querySelector('.vigenere-info');
    if (infoPopup) {
        infoPopup.remove();
        
        const vigenerePopup = document.querySelector('.vigenere-popup');
        if (vigenerePopup) {
            vigenerePopup.classList.remove('info-active');
        }
    }
}

// Verschlüsselungsfunktionen
export function vigenereEncrypt(text: string, key: string): string {
    text = text.toUpperCase();
    key = key.toUpperCase();
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
        if (text[i] >= 'A' && text[i] <= 'Z') {
            const textChar = text.charCodeAt(i) - 65;
            const keyChar = key.charCodeAt(keyIndex % key.length) - 65;
            const encryptedChar = ((textChar + keyChar) % 26) + 65;
            result += String.fromCharCode(encryptedChar);
            keyIndex++;
        } else {
            result += text[i];
        }
    }
    
    return result;
}

export function vigenereDecrypt(text: string, key: string): string {
    text = text.toUpperCase();
    key = key.toUpperCase();
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
        if (text[i] >= 'A' && text[i] <= 'Z') {
            const textChar = text.charCodeAt(i) - 65;
            const keyChar = key.charCodeAt(keyIndex % key.length) - 65;
            const decryptedChar = ((textChar - keyChar + 26) % 26) + 65;
            result += String.fromCharCode(decryptedChar);
            keyIndex++;
        } else {
            result += text[i];
        }
    }
    
    return result;
}

// Handler für die Verschlüsselung
function handleVigenereEncrypt() {
    const textElement = document.getElementById('vigenere-text') as HTMLTextAreaElement;
    const keyElement = document.getElementById('vigenere-key') as HTMLInputElement;
    const resultElement = document.querySelector('#vigenere-result .result-text');
    
    if (textElement && keyElement && resultElement) {
        const text = textElement.value;
        const key = keyElement.value;
        
        if (!key || !isAlphabetic(key)) {
            alert('Der Schlüssel darf nur Buchstaben enthalten!');
            return;
        }
        
        const encryptedText = vigenereEncrypt(text, key);
        resultElement.textContent = encryptedText;
    }
}

// Handler für die Entschlüsselung
function handleVigenereDecrypt() {
    const textElement = document.getElementById('vigenere-text') as HTMLTextAreaElement;
    const keyElement = document.getElementById('vigenere-key') as HTMLInputElement;
    const resultElement = document.querySelector('#vigenere-result .result-text');
    
    if (textElement && keyElement && resultElement) {
        const text = textElement.value;
        const key = keyElement.value;
        
        if (!key || !isAlphabetic(key)) {
            alert('Der Schlüssel darf nur Buchstaben enthalten!');
            return;
        }
        
        const decryptedText = vigenereDecrypt(text, key);
        resultElement.textContent = decryptedText;
    }
}

// Mache die Funktionen global verfügbar
(window as any).showVigenereInfo = showVigenereInfo;
(window as any).closeVigenereInfo = closeVigenereInfo;
(window as any).closeVigenerePopup = closeVigenerePopup;
(window as any).handleVigenereEncrypt = handleVigenereEncrypt;
(window as any).handleVigenereDecrypt = handleVigenereDecrypt;