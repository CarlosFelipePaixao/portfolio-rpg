/**
 * Gerenciador de Assets - Portfólio RPG
 * @author: CarlosFelipePaixao
 * @lastUpdate: 2025-03-15 02:09:22 UTC
 */

class AssetManager {
    constructor() {
        this.assets = {
            images: new Map(),
            audio: new Map(),
            sprites: new Map()
        };
        this.totalAssets = 0;
        this.loadedAssets = 0;
        this.errors = [];
        this.debug = true; // Ativa logs detalhados
    }

    log(message, type = 'info') {
        if (this.debug) {
            console[type](`[AssetManager] ${message}`);
        }
    }

    // Lista de todos os assets que precisam ser carregados
    assetsList = {
        images: {
            'menu-bg': 'assets/backgrounds/menu-bg.jpeg',
            'cursor-normal': 'assets/cursors/sword-normal.png',
            'cursor-pointer': 'assets/cursors/sword-pointer.png',
            'hero-loading': 'assets/sprites/personagem/loading/hero1.png'
        },
        sprites: {
            'hero-sheet': {
                path: 'assets/sprites/personagem/loading-sprite.png',
                frameWidth: 32,
                frameHeight: 32,
                frames: 5
            }
        },
        audio: {
            'background-theme': 'assets/audio/background-theme.mp3'
        }
    };

    async checkAssetExistence(path) {
        try {
            const response = await fetch(path, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    // Carrega uma imagem com verificação detalhada
    loadImage(key, src) {
        return new Promise(async (resolve, reject) => {
            this.log(`Tentando carregar imagem: ${src}`);
            
            // Verifica se o arquivo existe
            const exists = await this.checkAssetExistence(src);
            if (!exists) {
                const error = `Arquivo não encontrado: ${src}`;
                this.log(error, 'error');
                this.errors.push(error);
                reject(new Error(error));
                return;
            }

            const img = new Image();
            
            img.onload = () => {
                this.log(`Imagem carregada com sucesso: ${src}`);
                this.assets.images.set(key, img);
                this.loadedAssets++;
                resolve(img);
            };

            img.onerror = (e) => {
                const error = `Erro ao carregar imagem: ${src}. Detalhes: ${e.message}`;
                this.log(error, 'error');
                this.errors.push(error);
                reject(new Error(error));
            };

            img.src = src;
        });
    }

    // Carrega um áudio com verificação detalhada
    loadAudio(key, src) {
        return new Promise(async (resolve, reject) => {
            this.log(`Tentando carregar áudio: ${src}`);

            // Verifica se o arquivo existe
            const exists = await this.checkAssetExistence(src);
            if (!exists) {
                const error = `Arquivo não encontrado: ${src}`;
                this.log(error, 'error');
                this.errors.push(error);
                reject(new Error(error));
                return;
            }

            const audio = new Audio();
            
            audio.oncanplaythrough = () => {
                this.log(`Áudio carregado com sucesso: ${src}`);
                this.assets.audio.set(key, audio);
                this.loadedAssets++;
                resolve(audio);
            };

            audio.onerror = (e) => {
                const error = `Erro ao carregar áudio: ${src}. Detalhes: ${e.message}`;
                this.log(error, 'error');
                this.errors.push(error);
                reject(new Error(error));
            };

            audio.src = src;
        });
    }

    // Carrega todos os assets com tratamento de erro aprimorado
    async loadAll(onProgress) {
        this.log('Iniciando carregamento de todos os assets');
        const loadPromises = [];
        
        // Conta total de assets
        this.totalAssets = Object.keys(this.assetsList.images).length +
                          Object.keys(this.assetsList.sprites).length +
                          Object.keys(this.assetsList.audio).length;
        
        this.log(`Total de assets a serem carregados: ${this.totalAssets}`);

        // Carrega imagens
        for (const [key, src] of Object.entries(this.assetsList.images)) {
            loadPromises.push(
                this.loadImage(key, src)
                    .then(() => {
                        onProgress(this.getProgress());
                    })
                    .catch(error => {
                        this.log(`Falha ao carregar imagem ${key}: ${error.message}`, 'error');
                        throw error;
                    })
            );
        }

        // Carrega sprites
        for (const [key, config] of Object.entries(this.assetsList.sprites)) {
            loadPromises.push(
                this.loadSprite(key, config)
                    .then(() => {
                        onProgress(this.getProgress());
                    })
                    .catch(error => {
                        this.log(`Falha ao carregar sprite ${key}: ${error.message}`, 'error');
                        throw error;
                    })
            );
        }

        // Carrega áudios
        for (const [key, src] of Object.entries(this.assetsList.audio)) {
            loadPromises.push(
                this.loadAudio(key, src)
                    .then(() => {
                        onProgress(this.getProgress());
                    })
                    .catch(error => {
                        this.log(`Falha ao carregar áudio ${key}: ${error.message}`, 'error');
                        throw error;
                    })
            );
        }

        try {
            await Promise.all(loadPromises);
            this.log('Todos os assets foram carregados com sucesso!');
            return true;
        } catch (error) {
            this.log('Falha no carregamento de alguns assets', 'error');
            return false;
        }
    }
}