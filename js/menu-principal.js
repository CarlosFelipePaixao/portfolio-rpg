/**
 * Menu Principal RPG
 * @author: CarlosFelipePaixao
 * @lastUpdate: 2025-03-14 21:53:48 UTC
 */

class MenuPrincipal {
    constructor() {
        this.menuElement = document.getElementById('menu-principal');
        this.opcoesMenu = document.querySelectorAll('.opcao-menu');
        this.opcaoSelecionada = 0;
        this.gerenciadorCenas = new GerenciadorCenas();
        this.init();
    }

    init() {
        this.adicionarEventos();
        this.atualizarSelecao();
    }

    adicionarEventos() {
        // Eventos de teclado
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp':
                    this.moverSelecao(-1);
                    break;
                case 'ArrowDown':
                    this.moverSelecao(1);
                    break;
                case 'Enter':
                    this.selecionarOpcao();
                    break;
            }
        });

        // Eventos de mouse
        this.opcoesMenu.forEach((opcao, index) => {
            opcao.addEventListener('mouseover', () => {
                this.opcaoSelecionada = index;
                this.atualizarSelecao();
            });

            opcao.addEventListener('click', () => {
                this.selecionarOpcao();
            });
        });
    }

    moverSelecao(direcao) {
        this.opcaoSelecionada = (this.opcaoSelecionada + direcao + this.opcoesMenu.length) % this.opcoesMenu.length;
        this.atualizarSelecao();
    }

    atualizarSelecao() {
        this.opcoesMenu.forEach((opcao, index) => {
            if (index === this.opcaoSelecionada) {
                opcao.classList.add('selecionado');
            } else {
                opcao.classList.remove('selecionado');
            }
        });
    }

    async selecionarOpcao() {
        const opcaoAtual = this.opcoesMenu[this.opcaoSelecionada];
        const acao = opcaoAtual.dataset.opcao;
        
        switch(acao) {
            case 'iniciar':
                await this.gerenciadorCenas.trocarCena('jornada');
                break;
            case 'habilidades':
                await this.gerenciadorCenas.trocarCena('habilidades');
                break;
            case 'projetos':
                await this.gerenciadorCenas.trocarCena('projetos');
                break;
            case 'contato':
                await this.gerenciadorCenas.trocarCena('contato');
                break;
        }
    }

    mostrar() {
        this.menuElement.classList.remove('hidden');
    }

    ocultar() {
        this.menuElement.classList.add('hidden');
    }

    // Métodos para implementar as ações do menu
    iniciarJornada() {
        console.log('Iniciando jornada...');
        // Implementar navegação para o início do jogo
    }

    mostrarHabilidades() {
        console.log('Mostrando habilidades...');
        // Implementar navegação para a seção de habilidades
    }

    mostrarProjetos() {
        console.log('Mostrando projetos...');
        // Implementar navegação para a seção de projetos
    }

    mostrarContato() {
        console.log('Mostrando contato...');
        // Implementar navegação para a seção de contato
    }
}

// Inicializar menu após o carregamento
window.addEventListener('load', () => {
    const menu = new MenuPrincipal();
});