import { GerenciadorInput } from './input.js';
import { GerenciadorSprites } from './sprites.js';
import { Personagem } from './personagem.js';
import { CollisionManager } from './CollisionManager.js';
import { createTemporaryBackground } from './createBackground.js';

export class Jogo {
    constructor() {
        this.canvas = document.getElementById('canvas-jogo');
        this.ctx = this.canvas.getContext('2d');
        this.configurarTela();
        
        // Dimensões do grid (em pixels)
        this.gridTamanho = 32;
        
        // Sistema de sprites e personagem
        this.gerenciadorSprites = new GerenciadorSprites();
        this.personagem = null;
        
        // Sistema de input
        this.input = new GerenciadorInput();
        
        // Sistema de colisão
        this.collisionManager = new CollisionManager();
        
        // Estado do jogo
        this.rodando = false;
        this.ultimoTempo = 0;
        
        // Bind do loop do jogo
        this.loop = this.loop.bind(this);

        // Carrega a imagem de fundo
        this.backgroundImage = new Image();
        this.backgroundImage.onload = () => {
            console.log('Background carregado com sucesso!');
        };
        this.backgroundImage.onerror = (e) => {
            console.error('Erro ao carregar o background:', e);
            // Se falhar ao carregar o background real, usa o temporário
            this.backgroundImage.src = createTemporaryBackground();
        };
        this.backgroundImage.src = './assets/sprites/rooms/background.png';
    }

    configurarTela() {
        // Define tamanho fixo do canvas
        this.canvas.width = 383;  // Largura do mapa
        this.canvas.height = 352; // Altura do mapa
    }

    async iniciar() {
        try {
            // Espera o mapa de colisão carregar
            await this.collisionManager.loadCollisionMap();
            
            // Carrega os sprites necessários
            await this.gerenciadorSprites.carregarSprites();
            
            // Cria o personagem em uma posição inicial válida
            this.personagem = new Personagem({
                x: 100, // Posição inicial X
                y: 100, // Posição inicial Y
                sprites: this.gerenciadorSprites
            });

            // Inicia o loop do jogo
            this.rodando = true;
            requestAnimationFrame(this.loop);
        } catch (error) {
            console.error('Erro ao iniciar o jogo:', error);
        }
    }

    loop(tempoAtual) {
        if (!this.rodando) return;

        // Calcula o delta time
        const delta = (tempoAtual - this.ultimoTempo) / 1000;
        this.ultimoTempo = tempoAtual;

        // Limpa o canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Desenha o fundo
        if (this.backgroundImage.complete) {
            this.ctx.drawImage(this.backgroundImage, 0, 0);
        }

        // Atualiza
        this.atualizar(delta);

        // Renderiza
        this.renderizar();

        // Para debug: desenha o mapa de colisão
        // this.collisionManager.debugDraw(this.ctx);

        // Próximo frame
        requestAnimationFrame(this.loop);
    }

    atualizar(delta) {
        if (!this.personagem) return;

        // Obtém a direção do input
        const direcao = this.input.obterDirecao();
        
        // Calcula a próxima posição
        const nextX = this.personagem.x + direcao.x * this.personagem.velocidade * delta;
        const nextY = this.personagem.y + direcao.y * this.personagem.velocidade * delta;

        // Verifica colisão antes de mover
        if (this.collisionManager.canMove(
            this.personagem.x,
            this.personagem.y,
            nextX,
            nextY,
            this.personagem.width,
            this.personagem.height
        )) {
            this.personagem.atualizar(delta, direcao);
        } else {
            // Obtém uma direção segura para movimento
            const safeDirection = this.collisionManager.getSafeDirection(
                this.personagem.x,
                this.personagem.y,
                this.personagem.width,
                this.personagem.height,
                direcao.x * this.personagem.velocidade * delta,
                direcao.y * this.personagem.velocidade * delta
            );
            
            // Atualiza com a direção segura
            this.personagem.atualizar(delta, {
                x: safeDirection.x / (this.personagem.velocidade * delta),
                y: safeDirection.y / (this.personagem.velocidade * delta)
            });
        }
    }

    renderizar() {
        if (this.personagem) {
            this.personagem.renderizar(this.ctx);
        }
    }
}

// Para debug
window.addEventListener('error', (e) => {
    console.error('Erro no jogo:', e);
});