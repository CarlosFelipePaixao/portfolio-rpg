class CollisionManager {
    constructor() {
        this.collisionMap = [];
        this.tileSize = 8; // mesmo tamanho que usamos no editor
        this.isLoaded = false;
        this.loadCollisionMap();
    }

    async loadCollisionMap() {
        try {
            const response = await fetch('../assets/maps/collisionMap.json');
            this.collisionMap = await response.json();
            this.isLoaded = true;
            console.log('Mapa de colisão carregado com sucesso');
        } catch (error) {
            console.error('Erro ao carregar o mapa de colisão:', error);
            // Inicializa com um mapa vazio em caso de erro
            this.collisionMap = Array(44).fill().map(() => Array(48).fill(0));
        }
    }

    // Verifica se o mapa de colisão já foi carregado
    isMapLoaded() {
        return this.isLoaded;
    }

    // Verifica se uma posição específica tem colisão
    hasCollision(x, y) {
        const tileX = Math.floor(x / this.tileSize);
        const tileY = Math.floor(y / this.tileSize);

        // Verifica se a posição está dentro dos limites do mapa
        if (tileY >= 0 && tileY < this.collisionMap.length &&
            tileX >= 0 && tileX < this.collisionMap[tileY].length) {
            return this.collisionMap[tileY][tileX] === 1;
        }
        return true; // Considera fora dos limites como colisão
    }

    // Verifica colisão para um retângulo (útil para personagem)
    checkCollision(x, y, width, height) {
        // Verifica os pontos de colisão ao redor do personagem
        const points = [
            { x: x, y: y }, // Canto superior esquerdo
            { x: x + width, y: y }, // Canto superior direito
            { x: x, y: y + height }, // Canto inferior esquerdo
            { x: x + width, y: y + height }, // Canto inferior direito
            { x: x + width/2, y: y }, // Meio superior
            { x: x + width/2, y: y + height }, // Meio inferior
            { x: x, y: y + height/2 }, // Meio esquerdo
            { x: x + width, y: y + height/2 } // Meio direito
        ];

        // Se qualquer ponto colidir, retorna true
        return points.some(point => this.hasCollision(point.x, point.y));
    }

    // Verifica se o movimento é válido
    canMove(currentX, currentY, nextX, nextY, width, height) {
        // Se não houver diferença na posição, permite o movimento
        if (currentX === nextX && currentY === nextY) return true;

        // Verifica colisão na próxima posição
        return !this.checkCollision(nextX, nextY, width, height);
    }

    // Retorna a direção segura mais próxima
    getSafeDirection(x, y, width, height, velocityX, velocityY) {
        const nextX = x + velocityX;
        const nextY = y + velocityY;

        // Tenta mover apenas no eixo X
        if (this.canMove(x, y, nextX, y, width, height)) {
            return { x: velocityX, y: 0 };
        }

        // Tenta mover apenas no eixo Y
        if (this.canMove(x, y, x, nextY, width, height)) {
            return { x: 0, y: velocityY };
        }

        // Se não puder mover em nenhuma direção, retorna velocidade zero
        return { x: 0, y: 0 };
    }

    // Debug: desenha o mapa de colisão
    debugDraw(ctx) {
        if (!this.isLoaded) return;

        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        for (let y = 0; y < this.collisionMap.length; y++) {
            for (let x = 0; x < this.collisionMap[y].length; x++) {
                if (this.collisionMap[y][x] === 1) {
                    ctx.fillRect(
                        x * this.tileSize,
                        y * this.tileSize,
                        this.tileSize,
                        this.tileSize
                    );
                }
            }
        }
    }

    // Atualiza uma posição específica no mapa de colisão
    setCollision(x, y, value) {
        const tileX = Math.floor(x / this.tileSize);
        const tileY = Math.floor(y / this.tileSize);

        if (tileY >= 0 && tileY < this.collisionMap.length &&
            tileX >= 0 && tileX < this.collisionMap[tileY].length) {
            this.collisionMap[tileY][tileX] = value ? 1 : 0;
        }
    }

    // Obtém o valor de colisão em uma posição específica
    getCollision(x, y) {
        const tileX = Math.floor(x / this.tileSize);
        const tileY = Math.floor(y / this.tileSize);

        if (tileY >= 0 && tileY < this.collisionMap.length &&
            tileX >= 0 && tileX < this.collisionMap[tileY].length) {
            return this.collisionMap[tileY][tileX];
        }
        return 1; // Retorna 1 (colisão) para posições fora do mapa
    }
}