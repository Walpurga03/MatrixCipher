import { showCaesarCipherPopup } from './caesarCipher';
import { showVigenereCipherPopup } from './vigenereCipher';
import { showXorCipherPopup } from './xorCipher';
import { showBlowfishCipherPopup } from './blowfishCipher';
import { showSha256CipherPopup } from './sha256Cipher';
import { showRipemd160CipherPopup } from './ripemd160Cipher';
import { showAesCipherPopup } from './aesCipher';
import { showRsaCipherPopup } from './rsaCipher';

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

export function selectMethod(method: string) {
    const menuElement = document.getElementById('menu') as HTMLElement;
    const computerScreenElement = document.getElementById('computer-screen') as HTMLElement;

    // Blendet das Menü und den Computer-Screen aus, wenn ein Popup aktiv ist
    if (menuElement) {
        hideMenuAndWidget(menuElement);
    }
    if (computerScreenElement) {
        computerScreenElement.style.display = 'none';
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
    inputBar.style.display = 'flex'; // Zeigt die input-bar unten an

    // Füge das Widget direkt zum Dokument hinzu, wenn die inputBar sichtbar ist
    if (inputBar.style.display === 'flex') {
        const widgetContainer = document.createElement('div');
        widgetContainer.innerHTML = `
            <lightning-widget 
                id="donate-widget"
                labels="☕ 1K,🍕 5K,🌽 10K"
                amounts="1000,5000,10000"
                accent="transparent" 
                to="aldobarazutti@getalby.com" 
            ></lightning-widget>
        `;
        widgetContainer.style.display = 'none'; // Setzt den Widget-Container standardmäßig auf 'none'
        document.body.appendChild(widgetContainer);

        // Setze die Attribute des Widgets
        const widget = widgetContainer.querySelector('lightning-widget') as HTMLElement;
        if (widget) {
            // Positioniere das Widget absolut und setze es ganz oben auf dem Bildschirm
            widget.style.position = 'absolute'; // Setzt die Position des Widgets absolut
            widget.style.top = '0'; // Setzt das Widget ganz oben
            widget.style.left = '0'; // Setzt das Widget ganz links
            widget.style.width = '100%'; // Setzt die Breite des Widgets auf 100%

            // Ändere die Beschriftung des "Donate sats" Buttons
            const button = widget.shadowRoot?.querySelector('button.button') as HTMLElement;
            if (button) {
                button.textContent = 'Support my work, thank you!'; // Ändert die Beschriftung des Buttons

                // Füge die Farben direkt mit JavaScript hinzu
                button.style.backgroundColor = 'black';
                button.style.color = '#0F0';
            }
             // Ändere die Beschriftungen und Werte der Buttons
             widget.addEventListener('load', () => {
                const shadowRoot = widget.shadowRoot;
                if (shadowRoot) {
                    const buttons = shadowRoot.querySelectorAll('button.button');
                    if (buttons.length >= 3) {
                        buttons[0].textContent = 'Donate 5';
                        buttons[1].textContent = 'Donate 50';
                        buttons[2].textContent = 'Donate 500';

                        // Optional: Ändere die Werte der Buttons, falls sie andere Werte haben
                        buttons[0].setAttribute('value', '5');
                        buttons[1].setAttribute('value', '50');
                        buttons[2].setAttribute('value', '500');
                    }
                }
            });

            // Event Listener für das Menü hinzufügen
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                item.addEventListener('click', () => {
                    widgetContainer.style.display = 'none'; // Blendet das Widget aus, wenn auf ein Menü geklickt wird
                });
            });
        }

        // Zeige den Widget-Container an, nachdem er zum Dokument hinzugefügt wurde
        widgetContainer.style.display = 'flex';
    }
}