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
            <button class="info-button" title="Info zur Caesar-Verschlüsselung" onclick="showCaesarInfo()">ℹ</button>
            <button class="close-button" title="Schließen" onclick="closeCaesarPopup()">&times;</button>
        </div>
        
        <div class="caesar-header">
            <h3>CAESAR-VERSCHLÜSSELUNG</h3>
        </div>
        
        <div class="caesar-input">
            <label for="caesar-text">TEXT EINGEBEN:</label>
            <textarea id="caesar-text" placeholder="Text zum Verschlüsseln oder Entschlüsseln eingeben..."></textarea>
        </div>
        
        <div class="caesar-shift">
            <label>Verschiebung:</label>
            <div class="shift-control">
                <button onclick="decrementShift()">-</button>
                <input type="number" id="caesar-shift" min="${MIN_KEY}" max="${MAX_KEY}" value="3">
                <button onclick="incrementShift()">+</button>
            </div>
        </div>
        
        <div class="caesar-actions">
            <button onclick="handleCaesarEncrypt()">VERSCHLÜSSELN</button>
            <button onclick="handleCaesarDecrypt()">ENTSCHLÜSSELN</button>
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
function showCaesarInfo() {
    const mainPopup = document.querySelector('.caesar-popup');
    mainPopup?.classList.add('info-active');
    
    const infoOverlay = document.createElement('div');
    infoOverlay.className = 'caesar-info-overlay';
    
    const infoPopup = document.createElement('div');
    infoPopup.className = 'caesar-info-popup';
    
    const infoContent = document.createElement('div');
    infoContent.className = 'info-content';
    infoContent.innerHTML = `
        <h3>Caesar-Verschlüsselung</h3>
        <p>Die Caesar-Verschlüsselung ist eine der einfachsten und bekanntesten Verschlüsselungstechniken. Dabei wird jeder Buchstabe im Text um eine bestimmte Anzahl von Positionen im Alphabet verschoben.</p>
        <p>Beispiel: Bei einer Verschiebung um 3 Positionen wird aus "A" ein "D", aus "B" ein "E", usw.</p>
        <p><a href="https://de.wikipedia.org/wiki/Caesar-Verschl%C3%BCsselung" target="_blank" style="color: #00ff00; text-decoration: underline;">Mehr auf Wikipedia →</a></p>
    `;
    
    infoPopup.innerHTML = `
        <button class="close-button" onclick="closeCaesarInfo()">&times;</button>
        ${infoContent.outerHTML}
    `;
    
    infoOverlay.appendChild(infoPopup);
    document.body.appendChild(infoOverlay);
}

// Funktion zum Schließen des Info-Popups
function closeCaesarInfo() {
    const mainPopup = document.querySelector('.caesar-popup');
    mainPopup?.classList.remove('info-active');
    
    const infoOverlay = document.querySelector('.caesar-info-overlay');
    if (infoOverlay) {
        infoOverlay.remove();
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