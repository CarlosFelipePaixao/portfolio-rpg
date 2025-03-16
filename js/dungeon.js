/**
 * Classe da Dungeon
 * @author: CarlosFelipePaixao
 * @lastUpdate: 2025-03-15 13:23:10 UTC
 */
class Dungeon {
    constructor() {
        this.elemento = null;
        this.personagem = null;
        this.salasDesbloqueadas = ['frontend'];
        this.salaAtual = 'frontend';
        this.teclasPressionadas = {};
        
        this.init();
    }

    init() {
        this.elemento = document.createElement('div');
        this.elemento.className = 'dungeon';
        
        this.personagem = new Personagem();
        this.elemento.appendChild(this.personagem.elemento);
        
        this.configurarControles();
        this.iniciarLoopJogo();
        this.carregarSala('frontend');
    }

    configurarControles() {
        document.addEventListener('keydown', (e) => {
            this.teclasPressionadas[e.key] = true;
            
            if (e.key === 'e' && this.personagem.podeInteragir) {
                this.interagir();
            }
        });

        document.addEventListener('keyup', (e) => {
            this.teclasPressionadas[e.key] = false;
        });
    }

    iniciarLoopJogo() {
        let ultimoTempo = 0;
        const loopJogo = (tempoAtual) => {
            const delta = tempoAtual - ultimoTempo;

            if (delta > 1000/60) { // 60 FPS
                this.atualizar();
                ultimoTempo = tempoAtual;
            }

            requestAnimationFrame(loopJogo);
        };

        requestAnimationFrame(loopJogo);
    }

    atualizar() {
        this.processarMovimento();
        this.personagem.proximoSprite();
        this.verificarInteracoes();
    }

    processarMovimento() {
        if (this.teclasPressionadas['ArrowUp']) {
            this.personagem.mover('cima');
        }
        else if (this.teclasPressionadas['ArrowDown']) {
            this.personagem.mover('baixo');
        }
        else if (this.teclasPressionadas['ArrowLeft']) {
            this.personagem.mover('esquerda');
        }
        else if (this.teclasPressionadas['ArrowRight']) {
            this.personagem.mover('direita');
        }
        else {
            this.personagem.parar();
        }
    }

    verificarInteracoes() {
        // Implementar detecção de objetos interativos próximos
    }

    interagir() {
        // Implementar sistema de diálogo e interações
    }

    carregarSala(nomeSala) {
        this.salaAtual = nomeSala;
        // Implementar carregamento de sala específica
    }
}