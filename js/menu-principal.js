/**
 * Menu Principal - Portfólio RPG
 * @author: CarlosFelipePaixao
 * @lastUpdate: 2025-03-15 00:40:01 UTC
 */

class MenuPrincipal {
    constructor() {
        // Elementos do DOM
        this.menuElement = document.getElementById('menu-principal');
        this.opcoesMenu = document.querySelectorAll('.opcao-menu');
        this.opcaoSelecionada = 0;
        
        // Inicia o menu quando a tela de carregamento terminar
        this.observarTelaCarregamento();
    }

    observarTelaCarregamento() {
        const telaCarregamento = document.getElementById('tela-carregamento');
        
        // Observa mudanças na tela de carregamento
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'class' && 
                    telaCarregamento.classList.contains('hidden')) {
                    this.init();
                    observer.disconnect();
                }
            });
        });

        // Configura o observer
        observer.observe(telaCarregamento, {
            attributes: true,
            attributeFilter: ['class']
        });
    }

    init() {
        // Remove a classe hidden do menu
        this.menuElement.classList.remove('hidden');
        
        // Configura os event listeners para as opções do menu
        this.opcoesMenu.forEach((opcao, index) => {
            opcao.addEventListener('click', () => this.selecionarOpcao(index));
        });

        // Configura navegação por teclado
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    selecionarOpcao(index) {
        // Remove a seleção anterior
        this.opcoesMenu[this.opcaoSelecionada].classList.remove('selecionado');
        
        // Atualiza a seleção
        this.opcaoSelecionada = index;
        this.opcoesMenu[this.opcaoSelecionada].classList.add('selecionado');
        
        // Executa a ação da opção selecionada
        this.executarAcao(this.opcoesMenu[index].dataset.opcao);
    }

    handleKeyPress(e) {
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                this.navegarMenu(-1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.navegarMenu(1);
                break;
            case 'Enter':
                e.preventDefault();
                this.opcoesMenu[this.opcaoSelecionada].click();
                break;
        }
    }

    navegarMenu(direcao) {
        // Remove a seleção atual
        this.opcoesMenu[this.opcaoSelecionada].classList.remove('selecionado');
        
        // Calcula nova posição
        this.opcaoSelecionada = (this.opcaoSelecionada + direcao + this.opcoesMenu.length) % this.opcoesMenu.length;
        
        // Aplica nova seleção
        this.opcoesMenu[this.opcaoSelecionada].classList.add('selecionado');
        this.opcoesMenu[this.opcaoSelecionada].focus();
    }

    executarAcao(opcao) {
        switch(opcao) {
            case 'iniciar':
                console.log('Iniciando jornada...');
                // Implementar lógica para iniciar o jogo
                break;
            case 'habilidades':
                console.log('Abrindo habilidades...');
                // Implementar lógica para mostrar habilidades
                break;
            case 'projetos':
                console.log('Abrindo projetos...');
                // Implementar lógica para mostrar projetos
                break;
            case 'contato':
                console.log('Abrindo contato...');
                // Implementar lógica para mostrar contato
                break;
        }
    }
}

// Inicializa o menu quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, inicializando Menu Principal');
    window.menuPrincipal = new MenuPrincipal();
});