export class Personagem {
    constructor({ x, y, sprites }) {
        this.posicao = { x, y };
        this.velocidade = 200; // pixels por segundo
        this.sprites = sprites;
        
        // Estado da animação
        this.direcaoAtual = 'baixo';
        this.frame = 0;
        this.tempoAnimacao = 0;
        this.duracaoFrame = 0.1; // segundos por frame
        
        // Dimensões do personagem
        this.largura = 32;
        this.altura = 48;
    }

    atualizar(delta, direcao) {
        // Atualiza a posição
        this.posicao.x += direcao.x * this.velocidade * delta;
        this.posicao.y += direcao.y * this.velocidade * delta;

        // Atualiza a direção do personagem
        if (direcao.x !== 0 || direcao.y !== 0) {
            if (Math.abs(direcao.x) > Math.abs(direcao.y)) {
                this.direcaoAtual = direcao.x > 0 ? 'direita' : 'esquerda';
            } else {
                this.direcaoAtual = direcao.y > 0 ? 'baixo' : 'cima';
            }

            // Atualiza a animação
            this.tempoAnimacao += delta;
            if (this.tempoAnimacao >= this.duracaoFrame) {
                this.tempoAnimacao -= this.duracaoFrame;
                this.frame = (this.frame + 1) % 4; // 4 frames de animação
            }
        } else {
            // Reseta para o frame parado quando não há movimento
            this.frame = 0;
        }
    }

    renderizar(ctx) {
        // Obtém o sprite correto baseado na direção e frame atual
        const sprite = this.sprites.obterSprite('personagem', this.direcaoAtual, this.frame);
        
        if (sprite) {
            ctx.drawImage(
                sprite,
                this.posicao.x - this.largura / 2,
                this.posicao.y - this.altura / 2,
                this.largura,
                this.altura
            );
        }
    }
}