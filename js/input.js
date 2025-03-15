export class GerenciadorInput {
    constructor() {
        this.teclas = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false,
            w: false,
            s: false,
            a: false,
            d: false
        };

        this.destino = null;
        this.clickAtivo = false;

        // Bind dos eventos
        window.addEventListener('keydown', this.teclaPrecionada.bind(this));
        window.addEventListener('keyup', this.teclaSolta.bind(this));
        window.addEventListener('click', this.handleClick.bind(this));
    }

    teclaPrecionada(evento) {
        if (this.teclas.hasOwnProperty(evento.key)) {
            this.teclas[evento.key] = true;
        }
    }

    teclaSolta(evento) {
        if (this.teclas.hasOwnProperty(evento.key)) {
            this.teclas[evento.key] = false;
        }
    }

    handleClick(evento) {
        this.destino = {
            x: evento.clientX,
            y: evento.clientY
        };
        this.clickAtivo = true;
    }

    obterDirecao() {
        const direcao = { x: 0, y: 0 };

        // Movimento por teclado
        if (this.teclas.ArrowUp || this.teclas.w) direcao.y = -1;
        if (this.teclas.ArrowDown || this.teclas.s) direcao.y = 1;
        if (this.teclas.ArrowLeft || this.teclas.a) direcao.x = -1;
        if (this.teclas.ArrowRight || this.teclas.d) direcao.x = 1;

        // Normaliza o vetor de direção para movimento diagonal consistente
        if (direcao.x !== 0 && direcao.y !== 0) {
            const comprimento = Math.sqrt(direcao.x * direcao.x + direcao.y * direcao.y);
            direcao.x /= comprimento;
            direcao.y /= comprimento;
        }

        return direcao;
    }

    limparDestino() {
        this.destino = null;
        this.clickAtivo = false;
    }
}