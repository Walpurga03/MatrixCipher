// Sound-Effekt für Matrix Rain
let matrixSound: HTMLAudioElement;

function initMatrixSound() {
    matrixSound = new Audio('/src/assets/sounds/matrix-sound.mp3');
    matrixSound.volume = 0.3;
    matrixSound.loop = true;
}

function playMatrixSound() {
    if (!matrixSound) {
        initMatrixSound();
    }
    matrixSound.play().catch(err => console.log('Audio konnte nicht abgespielt werden:', err));
}

function stopMatrixSound() {
    if (matrixSound) {
        matrixSound.pause();
        matrixSound.currentTime = 0;
    }
}

function startMatrixAnimation(canvasId: string) {
    // Starte den Matrix-Sound
    playMatrixSound();

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) {
        console.error(`Canvas element with id "${canvasId}" not found.`);
        return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Unable to get 2D context from canvas.");
        return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array(columns).fill(0);

    const chars = "0123456789/*-+/<>?;:[]~!@#$%^&*()+=abcdefghijklmnopqrstuvwxyz".split('');

    function draw() {
        if (ctx) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        }
        if (ctx) {
            ctx.fillRect(0, 0, width, height);
        }

        if (ctx) {
            ctx.fillStyle = '#0F0';
        }
        if (ctx) {
            ctx.font = `${fontSize}px monospace`;
        }

        drops.forEach((drop, i) => {
            const text = chars[Math.floor(Math.random() * chars.length)];
            if (ctx) {
                ctx.fillText(text, i * fontSize, drop * fontSize);
            }

            if (drop * fontSize > height || Math.random() > 0.97) {
                drops[i] = 0;
            } else {
                drops[i]++;
            }
        });
    }

    setInterval(draw, 50);
}

export default startMatrixAnimation;
