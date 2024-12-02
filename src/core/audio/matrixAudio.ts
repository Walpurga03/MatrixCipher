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
                const audioPath = 'https://walpurga03.github.io/MatrixCipher/public/audio/matrix-sound.mp3';
                console.log('Initializing audio with path:', audioPath);
                
                this.audio = new Audio(audioPath);
                console.log('Audio object created');
                
                // Debug-Events hinzufügen
                this.audio.addEventListener('loadstart', () => console.log('Audio loading started'));
                this.audio.addEventListener('loadeddata', () => console.log('Audio data loaded'));
                this.audio.addEventListener('error', (e) => console.error('Audio loading error:', e));
                this.audio.addEventListener('canplay', () => console.log('Audio can be played'));
                
                this.audio.volume = 0.3;
                this.audio.loop = true;
                console.log('Audio initialized with volume:', this.audio.volume, 'and loop:', this.audio.loop);
            }
        } catch (error) {
            console.error('Error in audio initialization:', error);
        }
    }

    public play() {
        try {
            // Wenn Audio nicht initialisiert ist, initialisiere es
            if (!this.audio) {
                console.log('Audio not initialized, initializing now...');
                this.init();
            }

            if (this.audio) {
                console.log('Attempting to play audio...');
                const playPromise = this.audio.play();
                
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => console.log('Audio playing successfully'))
                        .catch(error => {
                            console.error('Failed to play audio:', error);
                            console.log('Audio state:', {
                                currentSrc: this.audio?.currentSrc,
                                readyState: this.audio?.readyState,
                                networkState: this.audio?.networkState,
                                error: this.audio?.error
                            });
                        });
                }
            } else {
                console.error('Audio still not initialized after init attempt');
            }
        } catch (error) {
            console.error('Error in play():', error);
        }
    }

    public stop() {
        try {
            if (this.audio) {
                console.log('Stopping audio...');
                this.audio.pause();
                this.audio.currentTime = 0;
                console.log('Audio stopped');
            }
        } catch (error) {
            console.error('Error in stop():', error);
        }
    }
}

export const matrixAudio = MatrixAudio.getInstance();
