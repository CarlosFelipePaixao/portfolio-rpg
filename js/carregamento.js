/**
 * Controlador da Tela de Carregamento - Portfólio RPG
 * @author: CarlosFelipePaixao
 * @lastUpdate: 2025-03-15 02:09:22 UTC
 */

class TelaCarregamento {
    constructor() {
        this.container = document.getElementById('tela-carregamento');
        this.barraProgresso = this.container.querySelector('.progresso');
        this.textoDica = this.container.querySelector('.dicas');
        this.assetManager = new AssetManager();
        
        // Elemento para mostrar erros
        this.erroContainer = document.createElement('div');
        this.erroContainer.className = 'erro-container';
        this.erroContainer.style.display = 'none';
        this.container.appendChild(this.erroContainer);
        
        this.botaoTentarNovamente = document.createElement('button');
        this.botaoTentarNovamente.textContent = 'Tentar Novamente';
        this.botaoTentarNovamente.className = 'botao-retry';
        this.botaoTentarNovamente.style.display = 'none';
        this.container.appendChild(this.botaoTentarNovamente);
        
        this.dicas = [
            "Verificando arquivos...",
            "Preparando sua jornada...",
            "Carregando mapas...",
            "Afiando espadas...",
            "Preparando magias...",
            "Invocando heróis...",
            "Conectando reinos..."
        ];

        this.configurarEventos();
    }

    configurarEventos() {
        this.botaoTentarNovamente.addEventListener('click', () => {
            this.resetarCarregamento();
            this.iniciar();
        });
    }

    resetarCarregamento() {
        this.barraProgresso.style.width = '0%';
        this.textoDica.style.color = '';
        this.textoDica.textContent = this.dicas[0];
        this.erroContainer.style.display = 'none';
        this.botaoTentarNovamente.style.display = 'none';
        this.assetManager = new AssetManager();
    }

    atualizarProgresso(progresso) {
        this.barraProgresso.style.width = `${progresso}%`;
        const indiceDica = Math.floor((progresso / 100) * (this.dicas.length - 1));
        this.textoDica.textContent = this.dicas[indiceDica];
    }

    async verificarEstruturaPastas() {
        const pastasNecessarias = [
            'assets/backgrounds/',
            'assets/cursors/',
            'assets/sprites/personagem/loading/',
            'assets/audio/'
        ];

        const verificacoes = await Promise.all(
            pastasNecessarias.map(async pasta => {
                try {
                    const response = await fetch(pasta);
                    return response.ok;
                } catch {
                    return false;
                }
            })
        );

        return verificacoes.every(ok => ok);
    }

    async iniciar() {
        try {
            // Verifica estrutura de pastas
            const estruturaOk = await this.verificarEstruturaPastas();
            if (!estruturaOk) {
                throw new Error("Estrutura de pastas incorreta. Verifique se todas as pastas necessárias existem.");
            }

            const sucesso = await this.assetManager.loadAll(
                (progresso) => this.atualizarProgresso(progresso)
            );

            if (sucesso) {
                await this.finalizarCarregamento();
            } else {
                throw new Error("Falha no carregamento de alguns assets");
            }
        } catch (error) {
            console.error("Erro durante o carregamento:", error);
            this.mostrarErro(error.message);
        }
    }

    mostrarErro(mensagem) {
        this.textoDica.textContent = "Erro no carregamento";
        this.textoDica.style.color = "#ff0000";
        
        this.erroContainer.style.display = 'block';
        this.erroContainer.innerHTML = `
            <h3>Detalhes do Erro:</h3>
            <p>${mensagem}</p>
            <ul>
                ${this.assetManager.errors.map(err => `<li>${err}</li>`).join('')}
            </ul>
            <p>Verifique se todos os arquivos existem nas pastas corretas.</p>
        `;
        
        this.botaoTentarNovamente.style.display = 'block';
    }
}

// Inicia o carregamento quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const telaCarregamento = new TelaCarregamento();
    telaCarregamento.iniciar();
});