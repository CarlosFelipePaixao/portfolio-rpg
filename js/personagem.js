export class Personagem {
    constructor({ x, y, sprites }) {
        this.x = x;
        this.y = y;
        this.width = 48;
        this.height = 68;
        this.velocidade = 150;
        this.sprites = sprites;
        
        // Animação
        this.frameAtual = 0;
        this.tempoFrame = 0;
        this.duracaoFrame = 0.1; // segundos
        
        // Estado
        this.direcaoAtual = 'down';
        this.movendo = false;
    }

    atualizar(delta, direcao) {
        // Atualiza posição
        this.x += direcao.x * this.velocidade * delta;
        this.y += direcao.y * this.velocidade * delta;

        // Determina se está movendo e a direção
        this.movendo = direcao.x !== 0 || direcao.y !== 0;
        if (this.movendo) {
            if (Math.abs(direcao.x) > Math.abs(direcao.y)) {
                this.direcaoAtual = direcao.x > 0 ? 'right' : 'left';
            } else {
                this.direcaoAtual = direcao.y > 0 ? 'down' : 'up';
            }
        }

        // Atualiza animação
        if (this.movendo) {
            this.tempoFrame += delta;
            if (this.tempoFrame >= this.duracaoFrame) {
                this.tempoFrame = 0;
                this.frameAtual = (this.frameAtual + 1) % 4;
            }
        } else {
            this.frameAtual = 0;
        }
    }

    renderizar(ctx) {
        const frame = this.sprites.obterFrame(
            this.movendo ? 'walk' : 'idle',
            this.direcaoAtual,
            this.frameAtual
        );

        if (!frame) return;

        ctx.drawImage(
            this.sprites.spriteSheet,
            frame.x, frame.y,
            frame.width, frame.height,
            Math.round(this.x), Math.round(this.y),
            this.width, this.height
        );

        // Debug: desenha hitbox
        // ctx.strokeStyle = 'red';
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}