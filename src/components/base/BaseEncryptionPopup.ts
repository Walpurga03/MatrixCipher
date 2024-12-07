export abstract class BaseEncryptionPopup {
    protected overlay!: HTMLDivElement;
    protected popup!: HTMLDivElement;
    protected resultDiv!: HTMLDivElement;
    protected infoPopup!: HTMLDivElement;
    protected type: string;

    constructor(protected title: string) {
        this.type = this.getType();
        this.createBaseStructure();
    }

    protected getType(): string {
        // Extrahiere den Typ aus dem Klassennamen (z.B. "caesar" aus "CaesarPopup")
        return this.constructor.name.replace('Popup', '').toLowerCase();
    }

    protected createBaseStructure(): void {
        // Erstelle Overlay und Popup
        this.overlay = document.createElement('div');
        this.overlay.className = `${this.type}-overlay`;
        
        this.popup = document.createElement('div');
        this.popup.className = `${this.type}-popup`;
        
        // Basis-Popup-Struktur
        this.popup.innerHTML = `
            <div class="${this.type}-controls">
                <button class="info-button" title="Info zur Verschlüsselung">ℹ</button>
                <button class="close-button" title="Schließen">&times;</button>
            </div>
            
            <div class="${this.type}-header">
                <h3>${this.title}</h3>
            </div>
            
            ${this.getCustomControls()}
            
            <div class="${this.type}-actions">
                <button class="encrypt-btn">Verschlüsseln</button>
                <button class="decrypt-btn">Entschlüsseln</button>
            </div>
            
            <div class="${this.type}-result">
                <h4>Ergebnis:</h4>
                <div class="result-text"></div>
            </div>
        `;
        
        this.overlay.appendChild(this.popup);
        this.setupEventListeners();
    }

    protected showInfo(): void {
        const infoPopup = document.createElement('div');
        infoPopup.className = `${this.type}-info`;
        
        // Hauptpopup ausblenden
        this.popup.style.display = 'none';
        
        infoPopup.innerHTML = `
            <button class="close-info" title="Schließen">&times;</button>
            <h4>Info zur ${this.title}</h4>
            <div class="info-content">
                ${this.getInfoContent()}
            </div>
        `;
        
        this.overlay.appendChild(infoPopup);
        this.infoPopup = infoPopup;
        
        // Event-Listener für Schließen-Button
        const closeButton = infoPopup.querySelector('.close-info');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.hideInfo();
            });
        }
    }

    protected hideInfo(): void {
        if (this.infoPopup) {
            this.infoPopup.remove();
            this.popup.style.display = 'block';
        }
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
        const infoPopup = this.overlay.querySelector(`.${this.type}-info`);
        if (infoPopup) {
            infoPopup.remove();
        }
        this.popup.style.display = 'block';
        this.overlay.remove();
    }

    protected showResult(result: string): void {
        const resultText = this.popup.querySelector('.result-text');
        if (resultText) {
            resultText.textContent = result;
        }
    }
}
