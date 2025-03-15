/**
 * Tela de Carregamento RPG
 * @author: CarlosFelipePaixao
 * @lastUpdate: 2025-03-15 00:50:03 UTC
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
        console.log('Tela de Carregamento iniciada');
        this.init();
    }

    init() {
        console.log('Inicializando tela de carregamento...');
        
        // Tenta iniciar a música várias vezes
        if (window.audioController) {
            window.audioController.forcePlay();
            
            // Tenta novamente após um pequeno delay
            setTimeout(() => {
                window.audioController.forcePlay();
            }, 1000);
        }
    
        this.escolherPersonagemAleatorio();
        this.atualizarDicas();
        this.simularCarregamento();
    }

    escolherPersonagemAleatorio() {
        const indiceAleatorio = Math.floor(Math.random() * this.personagens.length);
        const personagemEscolhido = this.personagens[indiceAleatorio];
        const elementoPersonagem = document.querySelector('.pixel-art-personagem');
        
        console.log('Carregando personagem:', personagemEscolhido);
        
        const caminhoImagem = `assets/sprites/personagem/loading/${personagemEscolhido}`;
        const img = new Image();
        
        img.onload = () => {
            console.log('Imagem carregada com sucesso:', personagemEscolhido);
            elementoPersonagem.style.backgroundImage = `url('${caminhoImagem}')`;
            elementoPersonagem.style.animation = 'none';
            elementoPersonagem.offsetHeight;
            elementoPersonagem.style.animation = 'caminhar 0.8s steps(4) infinite';
            elementoPersonagem.classList.add('fade-in');
        };

        img.onerror = () => {
            console.error('Erro ao carregar a imagem:', caminhoImagem);
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
        
        const atualizarTextoDica = () => {
            elementoDica.style.opacity = 0;
            
            setTimeout(() => {
                this.dicaAtual = (this.dicaAtual + 1) % this.dicas.length;
                elementoDica.textContent = this.dicas[this.dicaAtual];
                elementoDica.style.opacity = 1;
            }, 1000);
        };

        this.dicaAtual = Math.floor(Math.random() * this.dicas.length);
        elementoDica.textContent = this.dicas[this.dicaAtual];
        
        setInterval(atualizarTextoDica, 4000);
    }

    simularCarregamento() {
        console.log('Iniciando simulação de carregamento');
        const barra = document.querySelector('.progresso');
        let progresso = 0;
        
        barra.style.width = '0%';
        
        const intervalo = setInterval(() => {
            if (progresso >= 100) {
                clearInterval(intervalo);
                console.log('Carregamento concluído');
                this.carregamentoConcluido();
                return;
            }
            
            const incremento = Math.random() * 10;
            progresso = Math.min(progresso + incremento, 100);
            
            barra.style.width = `${progresso}%`;
        }, 200);
    }

    carregamentoConcluido() {
        console.log('Finalizando carregamento...');
        
        // Tenta tocar a música novamente durante a transição
        if (window.audioController) {
            window.audioController.forcePlay();
        }
        
        const telaCarregamento = document.getElementById('tela-carregamento');
        const menuPrincipal = document.getElementById('menu-principal');
        
        // Fade out da tela de carregamento
        telaCarregamento.style.opacity = '0';
        
        // Após o fade out, mostrar menu
        setTimeout(() => {
            telaCarregamento.classList.add('hidden');
            telaCarregamento.style.display = 'none';
            menuPrincipal.classList.remove('hidden');
            menuPrincipal.style.opacity = '0';
            
            // Pequeno delay antes do fade in do menu
            requestAnimationFrame(() => {
                menuPrincipal.style.opacity = '1';
            });
        }, 1000);
    }
}

// Iniciar quando a página carregar
window.addEventListener('load', () => {
    console.log('Página carregada, iniciando TelaCarregamento');
    new TelaCarregamento();
});