function startMatrixAnimation(canvasId: string) {
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
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(text, x, y);

                if (y > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
    }

    return setInterval(draw, 33);
}

export default startMatrixAnimation;
