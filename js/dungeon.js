import { Jogo } from './jogo.js';

export class Dungeon {
    constructor() {
        this.elemento = document.createElement('div');
        this.elemento.className = 'dungeon';
        this.jogo = null;
    }

    async inicializar() {
        const canvas = document.getElementById('canvas-jogo');
        if (canvas) {
            this.jogo = new Jogo(canvas);
            await this.jogo.iniciar();
        }
    }
}