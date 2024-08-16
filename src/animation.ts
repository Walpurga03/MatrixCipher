function startTextAnimation() {
    const messageElement = document.getElementById('message')!;
    const textPhrases = [
        "Wake up, Neo...",
        "The Matrix has you...",
        "Follow the white rabbit...",
        "Knock, knock, Neo..."
    ];
    let phraseIndex = 0;
    let cursorBlinkCount = 0;

    function blinkCursor(times: number, callback: () => void) {
        function blink() {
            if (cursorBlinkCount < times * 2) { // times * 2 because we count both on and off states
                const cursorElement = document.getElementById('cursor')!;
                cursorElement.style.visibility = cursorBlinkCount % 2 === 0 ? 'visible' : 'hidden';
                cursorBlinkCount++;
                setTimeout(blink, 500);
            } else {
                callback(); // Start the text animation after blinking
            }
        }
        blink();
    }

    function typeNextPhrase() {
        if (phraseIndex < textPhrases.length) {
            const text = textPhrases[phraseIndex];
            let letterIndex = 0;

            function typeNextLetter() {
                if (letterIndex < text.length) {
                    messageElement.innerHTML = text.substring(0, letterIndex + 1) + `<span id="cursor"></span>`;
                    letterIndex++;
                    setTimeout(typeNextLetter, 100);
                } else {
                    phraseIndex++;
                    setTimeout(typeNextPhrase, 1000);
                }
            }

            messageElement.innerHTML = ""; // Clear the message element before typing
            typeNextLetter();
        } else {
            setTimeout(showMenu, 1000); // Show menu after text is fully displayed
        }
    }

     function showMenu() {
        messageElement.style.display = "none"; // Hide the message
        const menuElement = document.getElementById('menu') as HTMLElement;
        if (menuElement) {
            menuElement.style.display = "block"; // Show the menu
        } else {
            console.error('Menu element not found');
        }
    }

    messageElement.innerHTML = `<span id="cursor"></span>`; // Display the cursor first
    blinkCursor(5, typeNextPhrase); // Blink 5 times, then start typing
}

export default startTextAnimation;
