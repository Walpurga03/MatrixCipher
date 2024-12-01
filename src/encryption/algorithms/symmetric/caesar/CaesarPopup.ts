import { BaseEncryptionPopup } from '../../../../components/base/BaseEncryptionPopup';

export class CaesarPopup extends BaseEncryptionPopup {
    private readonly MIN_KEY = 1;
    private readonly MAX_KEY = 25;

    constructor() {
        super('Caesar-Verschlüsselung');
    }

    protected getCustomControls(): string {
        return `
            <div class="caesar-input">
                <label for="caesar-text">Text eingeben:</label>
                <textarea id="caesar-text" placeholder="Text zum Verschlüsseln oder Entschlüsseln eingeben..."></textarea>
            </div>
            
            <div class="caesar-shift">
                <span class="shift-label">Verschiebung:</span>
                <div class="shift-control">
                    <button class="decrement-btn">-</button>
                    <input type="number" id="caesar-shift" min="${this.MIN_KEY}" max="${this.MAX_KEY}" value="3">
                    <button class="increment-btn">+</button>
                </div>
            </div>
        `;
    }

    protected setupEventListeners(): void {
        super.setupEventListeners();
        
        // Shift control buttons
        this.popup.querySelector('.increment-btn')?.addEventListener('click', () => this.incrementShift());
        this.popup.querySelector('.decrement-btn')?.addEventListener('click', () => this.decrementShift());
    }

    private incrementShift(): void {
        const shiftInput = this.popup.querySelector('#caesar-shift') as HTMLInputElement;
        const currentValue = parseInt(shiftInput.value);
        if (currentValue < this.MAX_KEY) {
            shiftInput.value = (currentValue + 1).toString();
        }
    }

    private decrementShift(): void {
        const shiftInput = this.popup.querySelector('#caesar-shift') as HTMLInputElement;
        const currentValue = parseInt(shiftInput.value);
        if (currentValue > this.MIN_KEY) {
            shiftInput.value = (currentValue - 1).toString();
        }
    }

    protected handleEncrypt(): void {
        const text = (this.popup.querySelector('#caesar-text') as HTMLTextAreaElement).value;
        const shift = parseInt((this.popup.querySelector('#caesar-shift') as HTMLInputElement).value);
        
        if (!text) {
            alert('Bitte geben Sie einen Text ein.');
            return;
        }
        
        const encrypted = this.caesarEncrypt(text, shift);
        this.showResult(encrypted);
    }

    protected handleDecrypt(): void {
        const text = (this.popup.querySelector('#caesar-text') as HTMLTextAreaElement).value;
        const shift = parseInt((this.popup.querySelector('#caesar-shift') as HTMLInputElement).value);
        
        if (!text) {
            alert('Bitte geben Sie einen Text ein.');
            return;
        }
        
        const decrypted = this.caesarDecrypt(text, shift);
        this.showResult(decrypted);
    }

    private caesarEncrypt(text: string, shift: number): string {
        return text
            .split('')
            .map(char => {
                if (char.match(/[a-z]/i)) {
                    const code = char.charCodeAt(0);
                    const isUpperCase = char === char.toUpperCase();
                    const base = isUpperCase ? 65 : 97;
                    return String.fromCharCode(((code - base + shift) % 26) + base);
                }
                return char;
            })
            .join('');
    }

    private caesarDecrypt(text: string, shift: number): string {
        return this.caesarEncrypt(text, 26 - shift);
    }

    protected getInfoContent(): string {
        return `
            <p>Die Caesar-Verschlüsselung ist eine der ältesten und einfachsten Verschlüsselungsmethoden.</p>
            <p>Jeder Buchstabe im Text wird um eine festgelegte Anzahl von Positionen im Alphabet verschoben.</p>
            <div class="info-example">
                <h4>Beispiel mit Verschiebung 3:</h4>
                <ul>
                    <li>A → D</li>
                    <li>B → E</li>
                    <li>C → F</li>
                    <li>...</li>
                </ul>
            </div>
            <div class="info-note">
                <p><strong>Hinweis:</strong> Diese Verschlüsselung ist sehr einfach zu knacken und sollte nicht für sensible Daten verwendet werden.</p>
            </div>
        `;
    }
}
