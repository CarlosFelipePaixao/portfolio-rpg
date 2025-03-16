export class GerenciadorSprites {
    constructor() {
        this.sprites = new Map();
        this.carregando = 0;
        this.basePath = 'assets/sprites/';
    }

    async carregarSprites() {
        await Promise.all([
            this.carregarSpritesPersonagem(),
            this.carregarSpritesUI(),
            this.carregarSpritesSalas()
        ]);
    }

    async carregarSpritesPersonagem() {
        // Carrega sprites de loading
        const spritesLoading = [];
        for (let i = 1; i <= 3; i++) { // ajuste o número conforme quantidade de sprites
            const sprite = await this.carregarImagem(`${this.basePath}personagem/Loading/hero${i}.png`);
            spritesLoading.push(sprite);
        }
        this.sprites.set('personagem_loading', spritesLoading);

        // Carrega sprites do jogo
        const direcoes = ['baixo', 'cima', 'esquerda', 'direita'];
        for (const direcao of direcoes) {
            const spritesDir = [];
            for (let i = 1; i <= 4; i++) {
                const sprite = await this.carregarImagem(
                    `${this.basePath}personagem/Game/${direcao}/walk${i}.png`
                );
                spritesDir.push(sprite);
            }
            this.sprites.set(`personagem_${direcao}`, spritesDir);
        }
    }

    async carregarSpritesUI() {
        // Interface básica
        await Promise.all([
            this.carregarImagem(`${this.basePath}ui/dialog/box.png`).then(
                sprite => this.sprites.set('ui_dialog', sprite)
            ),
            this.carregarImagem(`${this.basePath}ui/icons/tecla-e.png`).then(
                sprite => this.sprites.set('ui_tecla_e', sprite)
            )
        ]);
    }

    async carregarSpritesSalas() {
        // Sala Frontend
        await Promise.all([
            this.carregarImagem(`${this.basePath}rooms/frontend/background.png`).then(
                sprite => this.sprites.set('sala_frontend', sprite)
            ),
            this.carregarImagem(`${this.basePath}rooms/tiles/frontend-tiles.png`).then(
                sprite => this.sprites.set('tiles_frontend', sprite)
            )
        ]);
    }

    async carregarImagem(src) {
        this.carregando++;
        
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.carregando--;
                resolve(img);
            };
            img.onerror = () => {
                this.carregando--;
                console.error(`Erro ao carregar sprite: ${src}`);
                reject(new Error(`Falha ao carregar ${src}`));
            };
            img.src = src;
        });
    }

    obterSprite(categoria, nome, frame = 0) {
        const key = `${categoria}_${nome}`;
        const sprite = this.sprites.get(key);
        
        if (Array.isArray(sprite)) {
            return sprite[frame % sprite.length];
        }
        return sprite;
    }

    obterSpritesLoading() {
        return this.sprites.get('personagem_loading') || [];
    }

    estaCarregando() {
        return this.carregando > 0;
    }
}