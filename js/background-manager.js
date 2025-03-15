/**
 * Gerenciador de Backgrounds Animados
 * @author: CarlosFelipePaixao
 * @lastUpdate: 2025-03-14 23:09:09 UTC
 */

class BackgroundManager {
    constructor() {
        console.log('Iniciando BackgroundManager...');
        this.initialize();
    }

    initialize() {
        // Elementos
        this.container = document.querySelector('.background-container');
        this.scene = document.querySelector('.background-scene');
        
        // Debug
        console.log('Container:', this.container);
        console.log('Scene:', this.scene);

        if (!this.container || !this.scene) {
            console.error('Elementos de background não encontrados!');
            return;
        }

        // Mostrar container
        this.container.style.opacity = '1';
        
        // Verificar se o background está carregando
        this.preloadBackground();
    }

    preloadBackground() {
        const img = new Image();
        img.onload = () => {
            console.log('Background carregado com sucesso!');
            this.showBackground();
        };
        img.onerror = (err) => {
            console.error('Erro ao carregar background:', err);
        };
        img.src = 'assets/backgrounds/scene1.gif';
    }

    showBackground() {
        if (this.scene) {
            this.scene.style.opacity = '1';
            console.log('Background visível');
        }
    }
}

// Não inicializar automaticamente
window.BackgroundManager = BackgroundManager;