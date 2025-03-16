export class GerenciadorInput {
    constructor() {
        this.teclasPressionadas = new Set();
        this.iniciarEventos();
    }

    iniciarEventos() {
        window.addEventListener('keydown', (e) => {
            this.teclasPressionadas.add(e.key);
        });

        window.addEventListener('keyup', (e) => {
            this.teclasPressionadas.delete(e.key);
        });
    }

    obterDirecao() {
        const direcao = { x: 0, y: 0 };

        if (this.teclasPressionadas.has('ArrowLeft')) direcao.x = -1;
        if (this.teclasPressionadas.has('ArrowRight')) direcao.x = 1;
        if (this.teclasPressionadas.has('ArrowUp')) direcao.y = -1;
        if (this.teclasPressionadas.has('ArrowDown')) direcao.y = 1;

        return direcao;
    }
}