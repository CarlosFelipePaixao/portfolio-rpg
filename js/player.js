class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 4;
    }

    move(direction) {
        let nextX = this.x;
        let nextY = this.y;

        // Calcular próxima posição baseado na direção
        switch(direction) {
            case 'up':
                nextY -= this.speed;
                break;
            case 'down':
                nextY += this.speed;
                break;
            case 'left':
                nextX -= this.speed;
                break;
            case 'right':
                nextX += this.speed;
                break;
        }

        // Só move se não houver colisão
        if (!checkCollision(nextX, nextY)) {
            this.x = nextX;
            this.y = nextY;
        }
    }
}