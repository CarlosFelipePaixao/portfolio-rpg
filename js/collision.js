// Mapa de colisão baseado em grid
const TILE_SIZE = 32; // Tamanho de cada tile
const MAP_WIDTH = 383;
const MAP_HEIGHT = 352;

// Array 2D para representar colisões
// 0 = pode andar
// 1 = parede/não pode andar
const collisionMap = [
    [1,1,1,1,1,1,1,1,1,1,1,1], // 12 tiles de largura
    [1,0,0,0,1,0,0,0,0,0,0,1], // 0 = área livre
    [1,0,0,0,1,0,0,0,0,0,0,1], // 1 = parede/obstáculo
    [1,0,0,0,1,0,0,0,0,0,0,1],
    // ... continue mapeando baseado no seu layout
];

// Função para checar colisão
function checkCollision(x, y) {
    // Converter posição do personagem para índice do grid
    const tileX = Math.floor(x / TILE_SIZE);
    const tileY = Math.floor(y / TILE_SIZE);
    
    // Verificar se posição está dentro dos limites
    if (tileX < 0 || tileX >= MAP_WIDTH || tileY < 0 || tileY >= MAP_HEIGHT) {
        return true; // Colisão com limites do mapa
    }
    
    return collisionMap[tileY][tileX] === 1;
}