// Sound-Manager für Matrix-Effekte
class MatrixAudio {
    private static instance: MatrixAudio;
    private audio: HTMLAudioElement | null = null;
    private initPromise: Promise<void> | null = null;

    private constructor() {
        console.log('MatrixAudio instance created');
    }

    public static getInstance(): MatrixAudio {
        if (!MatrixAudio.instance) {
            MatrixAudio.instance = new MatrixAudio();
        }
        return MatrixAudio.instance;
    }

    public init(): Promise<void> {
        if (this.initPromise) {
            return this.initPromise;
        }

        this.initPromise = new Promise((resolve, reject) => {
            try {
                if (!this.audio) {
                    const audioPath = 'https://walpurga03.github.io/MatrixCipher/audio/matrix-sound.mp3';
                    console.log('Initializing audio with path:', audioPath);
                    
                    // Create audio element
                    this.audio = document.createElement('audio');
                    // Add source element
                    const source = document.createElement('source');
                    source.src = audioPath;
                    source.type = 'audio/mpeg';
                    this.audio.appendChild(source);
                    
                    console.log('Audio object created');
                    
                    // Debug-Events hinzufügen
                    this.audio.addEventListener('loadstart', () => console.log('Audio loading started'));
                    this.audio.addEventListener('loadeddata', () => console.log('Audio data loaded'));
                    this.audio.addEventListener('error', (e) => {
                        console.error('Audio loading error:', e);
                        reject(e);
                    });
                    this.audio.addEventListener('canplay', () => {
                        console.log('Audio can be played');
                        resolve();
                    });
                    
                    this.audio.volume = 0.3;
                    this.audio.loop = true;
                    console.log('Audio initialized with volume:', this.audio.volume, 'and loop:', this.audio.loop);
                }
            } catch (error) {
                console.error('Error in audio initialization:', error);
                reject(error);
            }
        });

        return this.initPromise;
    }

    public async play() {
        try {
            // Warte 3 Sekunden bevor wir starten
            await new Promise(resolve => setTimeout(resolve, 5000));
            
            await this.init();
            if (this.audio) {
                await this.audio.play();
                console.log('Audio playing');
            } else {
                throw new Error('Audio still not initialized after init attempt');
            }
        } catch (error) {
            console.error('Failed to play audio:', error);
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
