export abstract class BaseEncryptionPopup {
    protected overlay!: HTMLDivElement;
    protected popup!: HTMLDivElement;
    protected resultDiv!: HTMLDivElement;
    protected infoPopup!: HTMLDivElement;

    constructor(protected title: string) {
        this.createBaseStructure();
    }

    protected createBaseStructure(): void {
        // Erstelle Overlay und Popup
        this.overlay = document.createElement('div');
        this.overlay.className = 'caesar-overlay';
        
        this.popup = document.createElement('div');
        this.popup.className = 'caesar-popup';
        
        // Basis-Popup-Struktur
        this.popup.innerHTML = `
            <div class="caesar-controls">
                <button class="info-button" title="Info zur Verschlüsselung">ℹ</button>
                <button class="close-button" title="Schließen">&times;</button>
            </div>
            
            <div class="caesar-header">
                <h3>${this.title}</h3>
            </div>
            
            ${this.getCustomControls()}
            
            <div class="caesar-actions">
                <button class="encrypt-btn">Verschlüsseln</button>
                <button class="decrypt-btn">Entschlüsseln</button>
            </div>
            
            <div class="caesar-result">
                <h4>Ergebnis:</h4>
                <div class="result-text"></div>
            </div>
        `;
        
        this.overlay.appendChild(this.popup);
        this.setupEventListeners();
    }

    protected showInfo(): void {
        const infoPopup = document.createElement('div');
        infoPopup.className = 'caesar-info';
        
        // Hauptpopup ausblenden
        this.popup.classList.add('info-active');
        
        const infoContent = this.getInfoContent();
        infoPopup.innerHTML = `
            <button class="close-info">&times;</button>
            <h4>${this.title}</h4>
            <div class="info-content">
                ${infoContent}
            </div>
        `;
        
        document.body.appendChild(infoPopup);
        
        // Event Listener für Schließen-Button
        infoPopup.querySelector('.close-info')?.addEventListener('click', () => {
            this.hideInfo(infoPopup);
        });
    }

    protected hideInfo(infoPopup: HTMLDivElement): void {
        // Info-Popup entfernen
        infoPopup.remove();
        
        // Hauptpopup wieder einblenden
        this.popup.classList.remove('info-active');
    }

    protected abstract getInfoContent(): string;
    protected abstract getCustomControls(): string;
    protected abstract handleEncrypt(): void;
    protected abstract handleDecrypt(): void;

    protected setupEventListeners(): void {
        // Info Button
        this.popup.querySelector('.info-button')?.addEventListener('click', () => this.showInfo());
        
        // Close Button
        this.popup.querySelector('.close-button')?.addEventListener('click', () => this.close());
        
        // Encrypt/Decrypt Buttons
        this.popup.querySelector('.encrypt-btn')?.addEventListener('click', () => this.handleEncrypt());
        this.popup.querySelector('.decrypt-btn')?.addEventListener('click', () => this.handleDecrypt());
    }

    public show(): void {
        document.body.appendChild(this.overlay);
    }

    public close(): void {
        // Entferne alle Info-Popups
        const infoPopup = document.querySelector('.caesar-info');
        if (infoPopup) {
            infoPopup.remove();
        }
        this.popup.classList.remove('info-active');
        this.overlay.remove();
    }

    protected showResult(result: string): void {
        const resultText = this.popup.querySelector('.result-text');
        if (resultText) {
            resultText.textContent = result;
        }
    }
}
