import { BaseEncryptionPopup } from '../../../../components/base/BaseEncryptionPopup';
import { vigenereEncrypt, vigenereDecrypt } from './vigenereCipher';

export class VigenerePopup extends BaseEncryptionPopup {
    constructor() {
        super('Vigenère-Verschlüsselung');
    }

    protected getCustomControls(): string {
        return `
            <div class="vigenere-input">
                <label for="vigenere-text">Text eingeben:</label>
                <textarea id="vigenere-text" placeholder="Text zum Verschlüsseln oder Entschlüsseln eingeben..."></textarea>
            </div>
            
            <div class="vigenere-key">
                <label for="vigenere-key-input">Schlüsselwort:</label>
                <input type="text" id="vigenere-key-input" placeholder="Schlüsselwort eingeben" pattern="[A-Za-z]+" required>
            </div>
        `;
    }

    protected getPopupContent(): string {
        return `
            <div class="vigenere-header">
                <h3>Vigenère-Verschlüsselung</h3>
            </div>
            <div class="vigenere-input">
                <label for="vigenere-text">Text eingeben:</label>
                <textarea id="vigenere-text" placeholder="Text zum Verschlüsseln oder Entschlüsseln eingeben..."></textarea>
            </div>
            <div class="vigenere-key">
                <label for="vigenere-key">Schlüsselwort:</label>
                <textarea id="vigenere-key" placeholder="Schlüsselwort eingeben..."></textarea>
            </div>
            <div class="vigenere-actions">
                <button class="encrypt-btn">Verschlüsseln</button>
                <button class="decrypt-btn">Entschlüsseln</button>
            </div>
            <div class="vigenere-result">
                <label for="vigenere-result">Ergebnis:</label>
                <textarea id="vigenere-result" readonly></textarea>
            </div>
        `;
    }

    protected setupEventListeners(): void {
        super.setupEventListeners();
        
        // Schlüsselwort-Validierung
        const keyInput = this.popup.querySelector('#vigenere-key-input') as HTMLInputElement;
        keyInput.addEventListener('input', (e) => {
            const input = e.target as HTMLInputElement;
            input.value = input.value.replace(/[^A-Za-z]/g, '');
        });
    }

    protected handleEncrypt(): void {
        const text = (this.popup.querySelector('#vigenere-text') as HTMLTextAreaElement).value;
        const key = (this.popup.querySelector('#vigenere-key-input') as HTMLInputElement).value;
        
        if (!text || !key) {
            alert('Bitte geben Sie sowohl Text als auch Schlüsselwort ein.');
            return;
        }
        
        if (!/^[A-Za-z]+$/.test(key)) {
            alert('Das Schlüsselwort darf nur Buchstaben enthalten.');
            return;
        }
        
        const encrypted = vigenereEncrypt(text, key);
        this.showResult(encrypted);
    }

    protected handleDecrypt(): void {
        const text = (this.popup.querySelector('#vigenere-text') as HTMLTextAreaElement).value;
        const key = (this.popup.querySelector('#vigenere-key-input') as HTMLInputElement).value;
        
        if (!text || !key) {
            alert('Bitte geben Sie sowohl Text als auch Schlüsselwort ein.');
            return;
        }
        
        if (!/^[A-Za-z]+$/.test(key)) {
            alert('Das Schlüsselwort darf nur Buchstaben enthalten.');
            return;
        }
        
        const decrypted = vigenereDecrypt(text, key);
        this.showResult(decrypted);
    }

    protected getInfoContent(): string {
        return `
            <div class="info-content">
                <p>Die Vigenère-Verschlüsselung ist eine polyalphabetische Substitutionschiffre, die auf dem Caesar-Verfahren basiert.</p>
                <p>Anstelle einer einzelnen Verschiebung wird ein Schlüsselwort verwendet, dessen Buchstaben die Verschiebung für jeden Buchstaben im Text bestimmen.</p>
                <p>Das Schlüsselwort wird wiederholt, bis es die Länge des zu verschlüsselnden Textes erreicht.</p>
                <h4>Beispiel:</h4>
                <p>Text: HALLO<br>
                Schlüssel: KEY (wird zu KEYK)</p>
                <a href="https://de.wikipedia.org/wiki/Vigen%C3%A8re-Chiffre" target="_blank" class="wiki-link">Mehr auf Wikipedia →</a>
            </div>
        `;
    }

    close(): void {
        super.close();
        
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
