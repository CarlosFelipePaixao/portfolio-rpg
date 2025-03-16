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

        // Novos atributos para interação
        this.podeInteragir = false;
        this.objetoInterativo = null;
        this.inventario = new Set();
        
        // Área de colisão
        this.colisao = {
            x: 8,  // offset da borda esquerda
            y: 32, // offset do topo
            largura: 16, // largura da área de colisão
            altura: 16  // altura da área de colisão
        };
    }

    atualizar(delta, direcao, mapa) {
        // Calcula nova posição
        const novaX = this.posicao.x + direcao.x * this.velocidade * delta;
        const novaY = this.posicao.y + direcao.y * this.velocidade * delta;

        // Verifica colisões com o mapa
        if (this.podeMover(novaX, this.posicao.y, mapa)) {
            this.posicao.x = novaX;
        }
        if (this.podeMover(this.posicao.x, novaY, mapa)) {
            this.posicao.y = novaY;
        }

        // Atualiza direção e animação
        if (direcao.x !== 0 || direcao.y !== 0) {
            if (Math.abs(direcao.x) > Math.abs(direcao.y)) {
                this.direcaoAtual = direcao.x > 0 ? 'direita' : 'esquerda';
            } else {
                this.direcaoAtual = direcao.y > 0 ? 'baixo' : 'cima';
            }

            this.tempoAnimacao += delta;
            if (this.tempoAnimacao >= this.duracaoFrame) {
                this.tempoAnimacao -= this.duracaoFrame;
                this.frame = (this.frame + 1) % 4;
            }
        } else {
            this.frame = 0;
        }

        // Verifica interações
        this.verificarInteracoes(mapa);
    }

    podeMover(x, y, mapa) {
        // Verifica colisões com paredes e objetos
        const colisaoX = x + this.colisao.x;
        const colisaoY = y + this.colisao.y;

        return !mapa.temColisao(
            colisaoX,
            colisaoY,
            this.colisao.largura,
            this.colisao.altura
        );
    }

    verificarInteracoes(mapa) {
        // Área de detecção de interação (um pouco maior que a área de colisão)
        const areaInteracao = {
            x: this.posicao.x + this.colisao.x - 8,
            y: this.posicao.y + this.colisao.y - 8,
            largura: this.colisao.largura + 16,
            altura: this.colisao.altura + 16
        };

        // Verifica objetos interativos próximos
        const objetoProximo = mapa.encontrarObjetoInterativo(
            areaInteracao.x,
            areaInteracao.y,
            areaInteracao.largura,
            areaInteracao.altura
        );

        this.podeInteragir = !!objetoProximo;
        this.objetoInterativo = objetoProximo;
    }

    interagir() {
        if (this.podeInteragir && this.objetoInterativo) {
            return this.objetoInterativo.acao(this);
        }
        return null;
    }

    renderizar(ctx) {
        // Renderiza o personagem
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

        // Renderiza indicador de interação se necessário
        if (this.podeInteragir) {
            const indicador = this.sprites.obterSprite('ui', 'tecla-e', 0);
            if (indicador) {
                ctx.drawImage(
                    indicador,
                    this.posicao.x - 8,
                    this.posicao.y - this.altura - 16,
                    16,
                    16
                );
            }
        }
    }

    // Métodos de inventário
    adicionarItem(item) {
        this.inventario.add(item);
    }

    temItem(item) {
        return this.inventario.has(item);
    }

    removerItem(item) {
        this.inventario.delete(item);
    }
}