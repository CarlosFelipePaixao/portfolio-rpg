let collisionMap = Array(11).fill().map(() => Array(12).fill(0));
let isDrawingWall = true; // true = desenhando parede, false = apagando

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Adicionar eventos de mouse
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);

    // Adicionar botão para alternar entre desenhar/apagar
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Modo: Desenhando Parede';
    toggleButton.onclick = () => {
        isDrawingWall = !isDrawingWall;
        toggleButton.textContent = `Modo: ${isDrawingWall ? 'Desenhando Parede' : 'Apagando'}`;
    };
    document.body.appendChild(toggleButton);

    // Adicionar botão para exportar o mapa
    const exportButton = document.createElement('button');
    exportButton.textContent = 'Exportar Mapa';
    exportButton.onclick = exportMap;
    document.body.appendChild(exportButton);
});

function startDrawing(e) {
    const tileX = Math.floor(e.offsetX / 32);
    const tileY = Math.floor(e.offsetY / 32);
    
    collisionMap[tileY][tileX] = isDrawingWall ? 1 : 0;
    drawCollisionOverlay();
}

function draw(e) {
    if (e.buttons !== 1) return; // Só desenha se o botão do mouse estiver pressionado
    
    const tileX = Math.floor(e.offsetX / 32);
    const tileY = Math.floor(e.offsetY / 32);
    
    collisionMap[tileY][tileX] = isDrawingWall ? 1 : 0;
    drawCollisionOverlay();
}

function stopDrawing() {
    // Nada precisa ser feito aqui por enquanto
}

function drawCollisionOverlay() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Redesenhar mapa base
    const mapImage = document.querySelector('img');
    if (mapImage) ctx.drawImage(mapImage, 0, 0);
    
    // Desenhar áreas de colisão
    for(let y = 0; y < collisionMap.length; y++) {
        for(let x = 0; x < collisionMap[y].length; x++) {
            if(collisionMap[y][x] === 1) {
                ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
                ctx.fillRect(x * 32, y * 32, 32, 32);
            }
        }
    }
}

function exportMap() {
    const mapString = JSON.stringify(collisionMap);
    console.log(mapString);
    // Opcional: criar arquivo para download
    const blob = new Blob([mapString], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'collisionMap.json';
    a.click();
}