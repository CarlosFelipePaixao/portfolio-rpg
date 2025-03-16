const collisionMap = [
    // Cada linha representa uma linha de tiles do mapa
    // 0 = área onde o personagem pode andar
    // 1 = parede/obstáculo onde não pode passar
    
    [1,1,1,1,1,1,1,1,1,1,1,1], // Linha 0 (topo do mapa)
    [1,0,0,0,0,0,0,0,0,0,0,1], // Linha 1
    [1,0,0,0,0,0,0,0,0,0,0,1], // Linha 2
    // ... continue até completar as 11 linhas
];