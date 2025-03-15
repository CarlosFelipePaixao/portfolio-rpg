/**
 * Controlador de Áudio - Portfólio RPG
 * @author: CarlosFelipePaixao
 * @lastUpdate: 2025-03-15 00:52:10 UTC
 */

class AudioController {
    constructor() {
        // Configuração inicial do áudio
        this.bgMusic = new Audio();
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.5;
        this.bgMusic.src = 'assets/audio/music/background-theme.mp3';
        
        // Flag para controlar o estado do áudio
        this.isPlaying = false;
        this.isInitialized = false;

        // Configura os event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Lista de eventos que podem iniciar o áudio
        const events = ['click', 'touchstart', 'keydown'];
        
        // Função para iniciar o áudio
        const startAudio = () => {
            if (!this.isInitialized) {
                this.isInitialized = true;
                this.play();
                
                // Remove os event listeners após o primeiro sucesso
                events.forEach(event => {
                    document.removeEventListener(event, startAudio);
                });
            }
        };

        // Adiciona os event listeners
        events.forEach(event => {
            document.addEventListener(event, startAudio);
        });

        // Monitora o estado da música
        this.bgMusic.onplay = () => {
            this.isPlaying = true;
            console.log('Música iniciada');
        };

        this.bgMusic.onpause = () => {
            this.isPlaying = false;
            console.log('Música pausada');
        };

        this.bgMusic.onended = () => {
            this.isPlaying = false;
            console.log('Música terminada');
            // Tenta reiniciar se estiver em loop
            if (this.bgMusic.loop) {
                this.play();
            }
        };
    }

    play() {
        if (!this.isPlaying) {
            const playPromise = this.bgMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('Erro ao reproduzir áudio:', error);
                    this.isPlaying = false;
                });
            }
        }
    }

    pause() {
        if (this.isPlaying) {
            this.bgMusic.pause();
            this.isPlaying = false;
        }
    }

    setVolume(value) {
        const volume = Math.max(0, Math.min(1, value));
        this.bgMusic.volume = volume;
    }

    // Método para forçar o play
    forcePlay() {
        if (!this.isPlaying) {
            this.play();
        }
    }

    // Método para verificar se o áudio está tocando
    isAudioPlaying() {
        return this.isPlaying;
    }
}

// Cria uma única instância global
window.audioController = new AudioController();

// Tenta iniciar o áudio em diferentes momentos
document.addEventListener('DOMContentLoaded', () => {
    if (window.audioController) {
        window.audioController.forcePlay();
    }
});

window.addEventListener('load', () => {
    if (window.audioController) {
        window.audioController.forcePlay();
    }
});