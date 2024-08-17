// widgetUtils.ts

let widgetContainer: HTMLElement | null = null;

export function initializeAndShowWidget() {
    if (!widgetContainer) {
        widgetContainer = document.createElement('div');
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
                button.style.boxShadow = '0 0 10px #0F0';
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
                    widgetContainer!.style.display = 'none'; // Blendet das Widget aus, wenn auf ein Menü geklickt wird
                });
            });
        }
    }

    // Zeige den Widget-Container an
    widgetContainer.style.display = 'flex';
}

export function hideWidget() {
    if (widgetContainer) {
        widgetContainer.style.display = 'none';
    }
}