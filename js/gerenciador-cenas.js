import { Jogo } from './jogo.js';

export class GerenciadorCenas {
    constructor() {
        console.log('GerenciadorCenas inicializado');
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
        console.log('Iniciando GerenciadorCenas');
        // Criar containers para cada cena
        this.criarContainersCenas();
        
        // Definir menu como cena inicial
        this.cenaAtual = 'menu';

        // Adicionar listener para erros
        window.addEventListener('error', (e) => {
            console.error('Erro na aplicação:', e);
        });
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
        
        console.log('Containers de cenas criados');
    }

    async trocarCena(novaCena) {
        console.log(`Tentando trocar para a cena: ${novaCena}`);
        
        if (this.cenaAtual === novaCena) {
            console.log('Já estamos na cena solicitada');
            return;
        }

        try {
            // Fade out da cena atual
            const cenaAtual = this.cenas[this.cenaAtual];
            if (!cenaAtual) {
                console.error('Cena atual não encontrada:', this.cenaAtual);
                return;
            }
            
            console.log('Iniciando transição de cena');
            cenaAtual.classList.add('fade-out');

            // Aguardar a transição
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Ocultar cena atual
            cenaAtual.classList.add('hidden');
            
            // Preparar nova cena
            const proximaCena = this.cenas[novaCena];
            if (!proximaCena) {
                console.error('Próxima cena não encontrada:', novaCena);
                return;
            }
            
            // Remover classes de transição anteriores
            proximaCena.classList.remove('fade-in', 'fade-out');
            
            // Mostrar nova cena
            proximaCena.classList.remove('hidden');
            
            // Forçar reflow
            proximaCena.offsetHeight;
            
            // Fade in da nova cena
            proximaCena.classList.add('fade-in');
            
            // Atualizar cena atual
            this.cenaAtual = novaCena;
            
            console.log('Carregando conteúdo da nova cena');
            // Carregar conteúdo da nova cena
            await this.carregarConteudoCena(novaCena);
            
            console.log('Transição de cena concluída');
        } catch (error) {
            console.error('Erro durante a troca de cena:', error);
        }
    }

    async carregarConteudoCena(cena) {
        console.log(`Carregando conteúdo da cena: ${cena}`);
        try {
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
                default:
                    console.log('Cena não reconhecida:', cena);
            }
        } catch (error) {
            console.error(`Erro ao carregar cena ${cena}:`, error);
        }
    }

    // ... (mantenha o resto do código igual)

    async carregarJornada() {
        console.log('Iniciando carregamento da Jornada');
        const cena = this.cenas.jornada;
        
        // Limpar conteúdo anterior
        cena.innerHTML = '';
        
        // Criar estrutura da cena
        const conteudo = document.createElement('div');
        conteudo.className = 'cena-jornada';
        conteudo.innerHTML = `
            <h2>Dungeon do Conhecimento</h2>
            <div id="dungeon-container">
                <canvas id="canvas-jogo" width="383" height="352"></canvas>
            </div>
        `;
        
        cena.appendChild(conteudo);

        try {
            console.log('Inicializando o jogo...');
            const jogo = new Jogo();
            await jogo.iniciar();
            console.log('Jogo inicializado com sucesso!');
        } catch (error) {
            console.error('Erro ao inicializar o jogo:', error);
            const mensagemErro = document.createElement('div');
            mensagemErro.className = 'erro-jogo';
            mensagemErro.textContent = 'Erro ao carregar o jogo. Por favor, tente novamente.';
            cena.appendChild(mensagemErro);
        }
    }

// ... (mantenha o resto do código igual)

    async carregarHabilidades() {
        console.log('Carregando cena de Habilidades');
        const cena = this.cenas.habilidades;
        cena.innerHTML = `
            <div class="cena-habilidades">
                <h2>Habilidades</h2>
                <div class="habilidades-container">
                    <div class="habilidade-grupo">
                        <h3>Desenvolvimento Front-end</h3>
                        <ul class="lista-habilidades">
                            <li>HTML5/CSS3</li>
                            <li>JavaScript (ES6+)</li>
                            <li>React</li>
                            <li>TypeScript</li>
                        </ul>
                    </div>
                    <div class="habilidade-grupo">
                        <h3>Desenvolvimento Back-end</h3>
                        <ul class="lista-habilidades">
                            <li>Node.js</li>
                            <li>Python</li>
                            <li>SQL</li>
                            <li>APIs RESTful</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    async carregarProjetos() {
        console.log('Carregando cena de Projetos');
        const cena = this.cenas.projetos;
        cena.innerHTML = `
            <div class="cena-projetos">
                <h2>Projetos</h2>
                <div class="projetos-container">
                    <!-- Adicione seus projetos aqui -->
                    <div class="projeto-card">
                        <h3>Portfolio RPG</h3>
                        <p>Um portfolio interativo em estilo RPG</p>
                        <div class="projeto-tecnologias">
                            <span>HTML5</span>
                            <span>CSS3</span>
                            <span>JavaScript</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async carregarContato() {
        console.log('Carregando cena de Contato');
        const cena = this.cenas.contato;
        cena.innerHTML = `
            <div class="cena-contato">
                <h2>Contato</h2>
                <div class="contato-container">
                    <div class="contato-info">
                        <a href="https://github.com/CarlosFelipePaixao" target="_blank" class="contato-link">
                            <i class="fab fa-github"></i> GitHub
                        </a>
                        <a href="https://linkedin.com/in/CarlosFelipePaixao" target="_blank" class="contato-link">
                            <i class="fab fa-linkedin"></i> LinkedIn
                        </a>
                        <a href="mailto:paixao.carlosfelipe@gmail.com" class="contato-link">
                            <i class="fas fa-envelope"></i> Email
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}