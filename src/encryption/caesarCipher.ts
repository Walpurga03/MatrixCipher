// Konstanten für Verschlüsselung
const MIN_KEY = 1;
const MAX_KEY = 25;

export function showCaesarCipherPopup() {
    // Erstelle Overlay und Popup
    const overlay = document.createElement('div');
    overlay.className = 'caesar-overlay';
    
    const popup = document.createElement('div');
    popup.className = 'caesar-popup';
    
    // Popup Inhalt
    popup.innerHTML = `
        <div class="caesar-controls">
            <button class="info-button" onclick="showCaesarInfo()">ℹ</button>
            <button class="close-button" onclick="closeCaesarPopup()">&times;</button>
        </div>
        
        <div class="caesar-header">
            <h3>Caesar-Verschlüsselung</h3>
        </div>
        
        <div class="caesar-input">
            <label for="caesar-text">Text eingeben:</label>
            <textarea id="caesar-text" placeholder="Text zum Verschlüsseln oder Entschlüsseln eingeben..."></textarea>
        </div>
        
        <div class="caesar-shift">
            <span class="shift-label">Verschiebung:</span>
            <div class="shift-control">
                <button onclick="decrementShift()">-</button>
                <input type="number" id="caesar-shift" min="${MIN_KEY}" max="${MAX_KEY}" value="3">
                <button onclick="incrementShift()">+</button>
            </div>
        </div>
        
        <div class="caesar-actions">
            <button onclick="handleCaesarEncrypt()">Verschlüsseln</button>
            <button onclick="handleCaesarDecrypt()">Entschlüsseln</button>
        </div>
        
        <div id="caesar-result" class="caesar-result">
            <h4>Ergebnis:</h4>
            <div class="result-text"></div>
        </div>
    `;
    
    // Füge Popup zum Overlay hinzu
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}

// Funktion zum Schließen des Popups und Anzeigen des Menüs
export function closeCaesarPopup() {
    const overlay = document.querySelector('.caesar-overlay');
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

// Funktion zum Anzeigen der Caesar-Cipher-Info
export function showCaesarInfo() {
    const infoPopup = document.createElement('div');
    infoPopup.className = 'caesar-info';
    
    // Hauptpopup ausblenden
    const caesarPopup = document.querySelector('.caesar-popup');
    if (caesarPopup) {
        caesarPopup.classList.add('info-active');
    }
    
    infoPopup.innerHTML = `
        <button class="close-info" onclick="closeCaesarInfo()">&times;</button>
        <h4>Caesar-Verschlüsselung</h4>
        <div class="info-content">
            <p>Die Caesar-Verschlüsselung ist eine der einfachsten und ältesten Verschlüsselungstechniken.</p>
            <p>Funktionsweise:</p>
            <ul>
                <li>Jeder Buchstabe wird um eine bestimmte Anzahl von Positionen im Alphabet verschoben</li>
                <li>Die Verschiebung (${MIN_KEY}-${MAX_KEY}) bestimmt den Schlüssel</li>
            </ul>
            <p>Beispiel mit Verschiebung 3:</p>
            <div class="example">
                <p>Text: HALLO</p>
                <p>Verschlüsselt: KDOOR</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(infoPopup);
}

// Funktion zum Schließen des Info-Popups
function closeCaesarInfo() {
    const infoPopup = document.querySelector('.caesar-info');
    if (infoPopup) {
        infoPopup.remove();
        
        // Hauptpopup wieder aktivieren
        const caesarPopup = document.querySelector('.caesar-popup');
        if (caesarPopup) {
            caesarPopup.classList.remove('info-active');
        }
    }
}

// Hilfsfunktionen für die Shift-Kontrolle
function incrementShift() {
    const shiftInput = document.getElementById('caesar-shift') as HTMLInputElement;
    const currentValue = parseInt(shiftInput.value);
    if (currentValue < MAX_KEY) {
        shiftInput.value = (currentValue + 1).toString();
    }
}

function decrementShift() {
    const shiftInput = document.getElementById('caesar-shift') as HTMLInputElement;
    const currentValue = parseInt(shiftInput.value);
    if (currentValue > MIN_KEY) {
        shiftInput.value = (currentValue - 1).toString();
    }
}

// Mache die Funktionen global verfügbar
(window as any).showCaesarInfo = showCaesarInfo;
(window as any).closeCaesarInfo = closeCaesarInfo;
(window as any).closeCaesarPopup = closeCaesarPopup;
(window as any).incrementShift = incrementShift;
(window as any).decrementShift = decrementShift;

// Verschlüsselungsfunktionen
export function caesarEncrypt(text: string, shift: number): string {
    return text.split('').map(char => {
        if (char.match(/[a-zA-Z]/)) {
            const code = char.charCodeAt(0);
            const isUpperCase = char === char.toUpperCase();
            const base = isUpperCase ? 65 : 97;
            return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
    }).join('');
}

export function caesarDecrypt(text: string, shift: number): string {
    return caesarEncrypt(text, 26 - shift);
}

// Handler für die Verschlüsselung
function handleCaesarEncrypt() {
    const text = (document.getElementById('caesar-text') as HTMLTextAreaElement)?.value || '';
    const shift = parseInt((document.getElementById('caesar-shift') as HTMLInputElement)?.value || '3');
    
    if (!text) {
        alert('Bitte geben Sie einen Text ein');
        return;
    }
    
    if (shift < MIN_KEY || shift > MAX_KEY) {
        alert(`Die Verschiebung muss zwischen ${MIN_KEY} und ${MAX_KEY} liegen`);
        return;
    }
    
    const encrypted = caesarEncrypt(text, shift);
    const resultDiv = document.getElementById('caesar-result');
    const resultText = resultDiv?.querySelector('.result-text');
    
    if (resultDiv && resultText) {
        resultText.textContent = encrypted;
        resultDiv.classList.add('show');
    }
}

// Handler für die Entschlüsselung
function handleCaesarDecrypt() {
    const text = (document.getElementById('caesar-text') as HTMLTextAreaElement)?.value || '';
    const shift = parseInt((document.getElementById('caesar-shift') as HTMLInputElement)?.value || '3');
    
    if (!text) {
        alert('Bitte geben Sie einen Text ein');
        return;
    }
    
    if (shift < MIN_KEY || shift > MAX_KEY) {
        alert(`Die Verschiebung muss zwischen ${MIN_KEY} und ${MAX_KEY} liegen`);
        return;
    }
    
    const decrypted = caesarDecrypt(text, shift);
    const resultDiv = document.getElementById('caesar-result');
    const resultText = resultDiv?.querySelector('.result-text');
    
    if (resultDiv && resultText) {
        resultText.textContent = decrypted;
        resultDiv.classList.add('show');
    }
}

// Mache die Handler global verfügbar
(window as any).handleCaesarEncrypt = handleCaesarEncrypt;
(window as any).handleCaesarDecrypt = handleCaesarDecrypt;