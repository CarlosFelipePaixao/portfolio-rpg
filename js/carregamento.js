/**
 * Tela de Carregamento RPG
 * @author: CarlosFelipePaixao
 * @lastUpdate: 2025-03-14 21:28:19 UTC
 */

class TelaCarregamento {
    constructor() {
        this.personagens = [
            'hero1.png',
            'hero2.png',
            'hero3.png',
            'hero4.png',
            'hero5.png'
        ];

        this.dicas = [
            "Pressione ENTER para interagir com NPCs...",
            "Use as setas do teclado para se mover...",
            "Explore todos os cantos do mapa...",
            "Cada local tem uma história para contar...",
            "Colete experiência desenvolvendo jogos...",
            "Procure por segredos escondidos...",
            "Converse com todos os habitantes...",
            "Aprenda novas habilidades de programação...",
            "Desbloqueie conquistas secretas...",
            "Salve seu progresso regularmente...",
            "Combine itens para criar novos...",
            "Observe os padrões dos inimigos...",
            "Complete missões secundárias...",
            "Melhore suas habilidades...",
        ];
        
        this.dicaAtual = 0;
        this.init();
    }

    init() {
        this.escolherPersonagemAleatorio();
        this.atualizarDicas();
        this.simularCarregamento();
    }

    escolherPersonagemAleatorio() {
        const indiceAleatorio = Math.floor(Math.random() * this.personagens.length);
        const personagemEscolhido = this.personagens[indiceAleatorio];
        const elementoPersonagem = document.querySelector('.pixel-art-personagem');
        
        // Log para debug
        console.log('Carregando personagem:', personagemEscolhido);
        
        // Caminho para a pasta loading
        const caminhoImagem = `assets/sprites/personagem/loading/${personagemEscolhido}`;

        // Verificar se a imagem existe e carregar
        const img = new Image();
        img.onload = () => {
            console.log('Imagem carregada com sucesso:', personagemEscolhido);
            elementoPersonagem.style.backgroundImage = `url('${caminhoImagem}')`;
            
            // Forçar reinício da animação
            elementoPersonagem.style.animation = 'none';
            elementoPersonagem.offsetHeight; // Trigger reflow
            elementoPersonagem.style.animation = 'caminhar 0.8s steps(4) infinite';
            elementoPersonagem.classList.add('fade-in');
        };

        img.onerror = () => {
            console.error('Erro ao carregar a imagem:', caminhoImagem);
            // Tenta carregar o próximo personagem em caso de erro
            const proximoIndice = (indiceAleatorio + 1) % this.personagens.length;
            if (proximoIndice !== indiceAleatorio) {
                this.personagens[indiceAleatorio] = this.personagens[proximoIndice];
                this.escolherPersonagemAleatorio();
            }
        };

        img.src = caminhoImagem;
    }

    atualizarDicas() {
        const elementoDica = document.querySelector('.dicas');
        
        // Função para atualizar o texto com fade
        const atualizarTextoDica = () => {
            elementoDica.style.opacity = 0;
            
            setTimeout(() => {
                this.dicaAtual = (this.dicaAtual + 1) % this.dicas.length;
                elementoDica.textContent = this.dicas[this.dicaAtual];
                elementoDica.style.opacity = 1;
            }, 1000);
        };

        // Primeira dica aleatória
        this.dicaAtual = Math.floor(Math.random() * this.dicas.length);
        elementoDica.textContent = this.dicas[this.dicaAtual];
        
        // Atualizar dicas a cada 4 segundos
        setInterval(atualizarTextoDica, 4000);
    }

    simularCarregamento() {
        const barra = document.querySelector('.progresso');
        let progresso = 0;
        
        // Resetar a barra de progresso
        barra.style.width = '0%';
        
        // Simular carregamento com velocidade variável
        const intervalo = setInterval(() => {
            if (progresso >= 100) {
                clearInterval(intervalo);
                this.carregamentoConcluido();
                return;
            }
            
            // Incremento variável para simular carregamento real
            const incremento = Math.random() * 10;
            progresso = Math.min(progresso + incremento, 100);
            
            // Atualizar largura da barra
            barra.style.width = `${progresso}%`;
        }, 200);
    }

    carregamentoConcluido() {
        console.log('Carregamento concluído!');
        
        // Elementos
        const telaCarregamento = document.getElementById('tela-carregamento');
        const menuPrincipal = document.getElementById('menu-principal');
        
        // Configurar transição inicial do menu
        menuPrincipal.style.display = 'flex';
        menuPrincipal.style.opacity = '0';
        
        // Fade out da tela de carregamento
        telaCarregamento.classList.add('fade-out');
        
        // Após o fade out, mostrar menu
        setTimeout(() => {
            telaCarregamento.style.display = 'none';
            menuPrincipal.classList.remove('hidden');
            
            // Pequeno delay antes do fade in
            requestAnimationFrame(() => {
                menuPrincipal.style.opacity = '1';
            });
        }, 1000);
    }

    // Método para forçar troca de personagem (pode ser útil depois)
    trocarPersonagem() {
        this.escolherPersonagemAleatorio();
    }
}

// Iniciar quando a página carregar
window.addEventListener('load', () => {
    new TelaCarregamento();
});

// Expor a classe globalmente (opcional, para debug)
window.TelaCarregamento = TelaCarregamento;

