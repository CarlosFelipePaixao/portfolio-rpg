/**
 * Gerenciador de Cenas do Portfólio RPG
 * @author: CarlosFelipePaixao
 * @lastUpdate: 2025-03-14 21:53:48 UTC
 */

class GerenciadorCenas {
    constructor() {
        this.cenaAtual = null;
        this.cenas = {
            menu: document.getElementById('menu-principal'),
            jornada: null,
            habilidades: null,
            projetos: null,
            contato: null
        };
        
        this.init();
    }

    init() {
        // Criar containers para cada cena
        this.criarContainersCenas();
        
        // Definir menu como cena inicial
        this.cenaAtual = 'menu';
    }

    criarContainersCenas() {
        // Criar containers para cada seção
        const cenas = ['jornada', 'habilidades', 'projetos', 'contato'];
        
        cenas.forEach(cena => {
            const container = document.createElement('div');
            container.id = `cena-${cena}`;
            container.className = 'cena hidden';
            document.body.appendChild(container);
            this.cenas[cena] = container;
        });
    }

    async trocarCena(novaCena) {
        if (this.cenaAtual === novaCena) return;

        // Fade out da cena atual
        const cenaAtual = this.cenas[this.cenaAtual];
        cenaAtual.classList.add('fade-out');

        // Aguardar a transição
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Ocultar cena atual
        cenaAtual.classList.add('hidden');
        
        // Preparar nova cena
        const proximaCena = this.cenas[novaCena];
        proximaCena.classList.remove('hidden');
        proximaCena.classList.add('fade-out');
        
        // Forçar reflow
        proximaCena.offsetHeight;
        
        // Fade in da nova cena
        proximaCena.classList.remove('fade-out');
        proximaCena.classList.add('fade-in');
        
        // Atualizar cena atual
        this.cenaAtual = novaCena;
        
        // Carregar conteúdo da nova cena
        await this.carregarConteudoCena(novaCena);
    }

    async carregarConteudoCena(cena) {
        switch(cena) {
            case 'jornada':
                await this.carregarJornada();
                break;
            case 'habilidades':
                await this.carregarHabilidades();
                break;
            case 'projetos':
                await this.carregarProjetos();
                break;
            case 'contato':
                await this.carregarContato();
                break;
        }
    }

    // Métodos para carregar cada cena
    async carregarJornada() {
        const cena = this.cenas.jornada;
        cena.innerHTML = `
            <div class="cena-jornada">
                <h2>Dungeon do Conhecimento</h2>
                <div id="dungeon-container"></div>
            </div>
        `;
    
        // Inicializar a dungeon
        const dungeon = new Dungeon();
        document.getElementById('dungeon-container').appendChild(dungeon.elemento);
    }
    

    async carregarHabilidades() {
        const cena = this.cenas.habilidades;
        cena.innerHTML = `
            <div class="cena-habilidades">
                <h2>Árvore de Habilidades</h2>
                <div class="arvore-habilidades">
                    <!-- Aqui virá a árvore de habilidades -->
                </div>
            </div>
        `;
    }

    async carregarProjetos() {
        const cena = this.cenas.projetos;
        cena.innerHTML = `
            <div class="cena-projetos">
                <h2>Projetos Realizados</h2>
                <div class="lista-projetos">
                    <!-- Aqui virão os cards de projetos -->
                </div>
            </div>
        `;
    }

    async carregarContato() {
        const cena = this.cenas.contato;
        cena.innerHTML = `
            <div class="cena-contato">
                <h2>Contato</h2>
                <div class="formulario-contato">
                    <!-- Aqui virá o formulário de contato -->
                </div>
            </div>
        `;
    }
}

// Exportar para uso global
window.GerenciadorCenas = GerenciadorCenas;