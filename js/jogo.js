import { Personagem } from './personagem.js';
import { GerenciadorInput } from './input.js';
import { GerenciadorSprites } from './sprites.js';

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
        
        // Estado do jogo
        this.rodando = false;
        this.ultimoTempo = 0;
        
        // Bind do loop do jogo
        this.loop = this.loop.bind(this);
    }

    configurarTela() {
        // Configura o tamanho do canvas para ser responsivo
        const atualizarTamanho = () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', atualizarTamanho);
        atualizarTamanho();
    }

    async iniciar() {
        // Carrega os sprites necessários
        await this.gerenciadorSprites.carregarSprites();
        
        // Cria o personagem no centro da tela
        this.personagem = new Personagem({
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            sprites: this.gerenciadorSprites
        });

        // Inicia o loop do jogo
        this.rodando = true;
        requestAnimationFrame(this.loop);
    }

    loop(tempoAtual) {
        if (!this.rodando) return;

        // Calcula o delta time
        const delta = (tempoAtual - this.ultimoTempo) / 1000;
        this.ultimoTempo = tempoAtual;

        // Limpa o canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Atualiza
        this.atualizar(delta);

        // Renderiza
        this.renderizar();

        // Próximo frame
        requestAnimationFrame(this.loop);
    }

    atualizar(delta) {
        // Atualiza o personagem com base nos inputs
        const direcao = this.input.obterDirecao();
        this.personagem.atualizar(delta, direcao);
    }

    renderizar() {
        // Renderiza o personagem
        this.personagem.renderizar(this.ctx);
    }
}

// Inicia o jogo quando a página carregar
window.addEventListener('load', () => {
    const jogo = new Jogo();
    jogo.iniciar();
});