export class GerenciadorSprites {
    constructor() {
        this.sprites = {};
        this.spriteSheet = new Image();
    }

    async carregarSprites() {
        return new Promise((resolve, reject) => {
            this.spriteSheet.onload = () => {
                this.criarSprites();
                resolve();
            };
            this.spriteSheet.onerror = (e) => reject(e);
            this.spriteSheet.src = './assets/sprites/personagem/character-sheet.png';
        });
    }

    criarSprites() {
        // Define os frames para cada direção
        const frameWidth = 48;
        const frameHeight = 68;

        this.sprites = {
            idle: {
                down: [{ x: 0, y: 0, width: frameWidth, height: frameHeight }],
                up: [{ x: 0, y: frameHeight, width: frameWidth, height: frameHeight }],
                left: [{ x: 0, y: frameHeight * 2, width: frameWidth, height: frameHeight }],
                right: [{ x: 0, y: frameHeight * 3, width: frameWidth, height: frameHeight }]
            },
            walk: {
                down: this.criarFrames(0, 0, frameWidth, frameHeight, 4),
                up: this.criarFrames(0, frameHeight, frameWidth, frameHeight, 4),
                left: this.criarFrames(0, frameHeight * 2, frameWidth, frameHeight, 4),
                right: this.criarFrames(0, frameHeight * 3, frameWidth, frameHeight, 4)
            }
        };
    }

    criarFrames(startX, startY, width, height, count) {
        const frames = [];
        for (let i = 0; i < count; i++) {
            frames.push({
                x: startX + (i * width),
                y: startY,
                width: width,
                height: height
            });
        }
        return frames;
    }

    obterFrame(acao, direcao, frameIndex) {
        if (!this.sprites[acao] || !this.sprites[acao][direcao]) {
            console.error(`Sprite não encontrado: ${acao} ${direcao}`);
            return null;
        }
        const frames = this.sprites[acao][direcao];
        return frames[frameIndex % frames.length];
    }
}