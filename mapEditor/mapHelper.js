// Definir tamanho do tile
const TILE_SIZE = 8; // Mudamos de 16 para 8
// Calcular número de tiles baseado no novo tamanho
const GRID_COLS = Math.ceil(383 / TILE_SIZE); // ~48 colunas
const GRID_ROWS = Math.ceil(352 / TILE_SIZE); // ~44 linhas

// Inicializar array de colisão com o novo tamanho
let collisionMap = Array(GRID_ROWS).fill().map(() => Array(GRID_COLS).fill(0));
let isDrawingWall = true;
let mapImage = new Image();
let canvas, ctx;
let isDragging = false;

mapImage.src = '../assets/sprites/rooms/background.png';

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar canvas e contexto globalmente
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    // Carregar imagem inicial
    mapImage.onload = function() {
        drawAll();
    };

    // Adicionar eventos de mouse
    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        handleDraw(e);
    });
    canvas.addEventListener('mousemove', (e) => {
        if (isDragging) {
            handleDraw(e);
        }
    });
    canvas.addEventListener('mouseup', () => {
        isDragging = false;
    });
    canvas.addEventListener('mouseleave', () => {
        isDragging = false;
    });

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

    // Adicionar botão para limpar tudo
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Limpar Tudo';
    clearButton.onclick = clearAll;
    document.body.appendChild(clearButton);
});

function handleDraw(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const tileX = Math.floor((e.clientX - rect.left) * scaleX / TILE_SIZE);
    const tileY = Math.floor((e.clientY - rect.top) * scaleY / TILE_SIZE);
    
    if(tileX >= 0 && tileX < GRID_COLS && tileY >= 0 && tileY < GRID_ROWS) {
        if(collisionMap[tileY][tileX] !== (isDrawingWall ? 1 : 0)) {
            collisionMap[tileY][tileX] = isDrawingWall ? 1 : 0;
            drawAll();
        }
    }
}

function clearAll() {
    collisionMap = Array(GRID_ROWS).fill().map(() => Array(GRID_COLS).fill(0));
    drawAll();
}

function drawAll() {
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar imagem de fundo
    ctx.drawImage(mapImage, 0, 0);
    
    // Desenhar grid
    drawGrid();
    
    // Desenhar áreas de colisão
    drawCollisions();
}

function drawGrid() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'; // Grid mais sutil
    ctx.beginPath();
    
    // Linhas verticais
    for(let x = 0; x < canvas.width; x += TILE_SIZE) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }
    
    // Linhas horizontais
    for(let y = 0; y < canvas.height; y += TILE_SIZE) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }
    
    ctx.stroke();
}

function drawCollisions() {
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
    for(let y = 0; y < collisionMap.length; y++) {
        for(let x = 0; x < collisionMap[y].length; x++) {
            if(collisionMap[y][x] === 1) {
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}

function exportMap() {
    const mapString = JSON.stringify(collisionMap);
    console.log(mapString);
    // Criar arquivo para download
    const blob = new Blob([mapString], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'collisionMap.json';
    a.click();
}