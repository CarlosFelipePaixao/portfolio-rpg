export class GerenciadorSprites {
    constructor() {
        this.sprites = {
            personagem: {
                baixo: [],
                cima: [],
                esquerda: [],
                direita: []
            }
        };
    }

    async carregarSprites() {
        // Carrega a spritesheet do personagem
        const spritesheetPersonagem = await this.carregarImagem('/assets/sprites/personagem/spritesheet.png');
        
        // Divide a spritesheet em sprites individuais
        this.cortarSpritesheet(spritesheetPersonagem);
    }

    async carregarImagem(caminho) {
        return new Promise((resolve, reject) => {
            const imagem = new Image();
            imagem.onload = () => resolve(imagem);
            imagem.onerror = reject;
            imagem.src = caminho;
        });
    }

    cortarSpritesheet(spritesheet) {
        // Dimensões de cada sprite na spritesheet
        const larguraSprite = 32;
        const alturaSprite = 48;
        
        // Temporário: cria um canvas para cortar os sprites
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = larguraSprite;
        canvas.height = alturaSprite;

        // Corta os sprites para cada direção
        const direcoes = ['baixo', 'esquerda', 'direita', 'cima'];
        direcoes.forEach((direcao, linha) => {
            for (let frame = 0; frame < 4; frame++) {
                ctx.clearRect(0, 0, larguraSprite, alturaSprite);
                ctx.drawImage(
                    spritesheet,
                    frame * larguraSprite,
                    linha * alturaSprite,
                    larguraSprite,
                    alturaSprite,
                    0,
                    0,
                    larguraSprite,
                    alturaSprite
                );
                
                // Cria uma nova imagem para o sprite
                const sprite = new Image();
                sprite.src = canvas.toDataURL();
                this.sprites.personagem[direcao].push(sprite);
            }
        });
    }

    obterSprite(tipo, direcao, frame) {
        return this.sprites[tipo]?.[direcao]?.[frame];
    }
}