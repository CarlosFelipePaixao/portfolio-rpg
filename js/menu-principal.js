export class MenuPrincipal {
    constructor(gerenciadorCenas) {
        this.menuElement = document.getElementById('menu-principal');
        this.opcoesMenu = document.querySelectorAll('.opcao-menu');
        this.opcaoSelecionada = 0;
        this.gerenciadorCenas = gerenciadorCenas;
        
        console.log('Menu Principal inicializado');
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

            opcao.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Opção clicada:', opcao.dataset.opcao);
                this.opcaoSelecionada = index;
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
        
        console.log('Selecionando opção:', acao);
        
        try {
            switch(acao) {
                case 'iniciar':
                    console.log('Iniciando jornada...');
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
        } catch (error) {
            console.error('Erro ao selecionar opção:', error);
        }
    }

    mostrar() {
        this.menuElement.classList.remove('hidden');
    }

    ocultar() {
        this.menuElement.classList.add('hidden');
    }
}