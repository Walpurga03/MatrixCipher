// Sound-Manager für Matrix-Effekte
class MatrixAudio {
    private static instance: MatrixAudio;
    private audio: HTMLAudioElement | null = null;

    private constructor() {
        console.log('MatrixAudio instance created');
    }

    public static getInstance(): MatrixAudio {
        if (!MatrixAudio.instance) {
            MatrixAudio.instance = new MatrixAudio();
        }
        return MatrixAudio.instance;
    }

    public init() {
        try {
            if (!this.audio) {
                console.log('Initializing audio...');
                this.audio = new Audio('./src/assets/sounds/matrix-sound.mp3');
                this.audio.volume = 0.3;
                this.audio.loop = true;
                console.log('Audio initialized successfully');
            }
        } catch (error) {
            console.error('Error initializing audio:', error);
        }
    }

    public play() {
        console.log('Attempting to play audio...');
        if (!this.audio) {
            console.log('Audio not initialized, initializing now...');
            this.init();
        }
        this.audio?.play().catch(err => {
            console.error('Failed to play audio:', err);
        });
    }

    public stop() {
        console.log('Stopping audio...');
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
            console.log('Audio stopped');
        }
    }
}

export const matrixAudio = MatrixAudio.getInstance();
