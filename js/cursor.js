/**
 * Controlador do Cursor - Portfólio RPG
 * @author: CarlosFelipePaixao
 * @lastUpdate: 2025-03-15 00:54:50 UTC
 */

class CursorController {
    constructor() {
        // Cria os elementos do cursor
        this.cursor = document.createElement('div');
        this.cursorDot = document.createElement('div');
        
        // Adiciona as classes
        this.cursor.className = 'cursor';
        this.cursorDot.className = 'cursor-dot';
        
        // Adiciona ao DOM
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorDot);

        // Posição inicial
        this.cursorPos = { x: 0, y: 0 };
        this.dotPos = { x: 0, y: 0 };

        // Bind dos métodos
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.checkHover = this.checkHover.bind(this);
        this.animate = this.animate.bind(this);

        // Inicia os eventos
        this.setupEventListeners();
        
        // Inicia a animação
        this.animate();
        
        console.log('Cursor Controller iniciado');
    }

    setupEventListeners() {
        // Mouse move
        document.addEventListener('mousemove', this.onMouseMove);
        
        // Mouse clicks
        document.addEventListener('mousedown', this.onMouseDown);
        document.addEventListener('mouseup', this.onMouseUp);
        
        // Elementos interativos
        const interactiveElements = document.querySelectorAll('button, a, .opcao-menu');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => this.checkHover(true));
            element.addEventListener('mouseleave', () => this.checkHover(false));
        });
    }

    onMouseMove(e) {
        this.cursorPos.x = e.clientX;
        this.cursorPos.y = e.clientY;
    }

    onMouseDown() {
        this.cursor.classList.add('click');
        this.cursorDot.classList.add('click');
    }

    onMouseUp() {
        this.cursor.classList.remove('click');
        this.cursorDot.classList.remove('click');
    }

    checkHover(isHovering) {
        if (isHovering) {
            this.cursor.classList.add('hover');
            this.cursorDot.classList.add('hover');
        } else {
            this.cursor.classList.remove('hover');
            this.cursorDot.classList.remove('hover');
        }
    }

    animate() {
        // Suavização do movimento
        this.dotPos.x += (this.cursorPos.x - this.dotPos.x) * 0.2;
        this.dotPos.y += (this.cursorPos.y - this.dotPos.y) * 0.2;

        // Atualiza a posição dos elementos
        this.cursor.style.transform = `translate(${this.cursorPos.x - 10}px, ${this.cursorPos.y - 10}px)`;
        this.cursorDot.style.transform = `translate(${this.dotPos.x - 2}px, ${this.dotPos.y - 2}px)`;

        // Continua a animação
        requestAnimationFrame(this.animate);
    }
}

// Inicializa o controlador do cursor quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.cursorController = new CursorController();
});