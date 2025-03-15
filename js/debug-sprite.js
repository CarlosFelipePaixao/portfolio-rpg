window.addEventListener('load', () => {
    const personagem = document.querySelector('.pixel-art-personagem');
    
    // Verifica se o elemento existe
    if (!personagem) {
        console.error('Elemento do personagem não encontrado!');
        return;
    }

    // Verifica se a imagem está carregando
    const url = getComputedStyle(personagem).backgroundImage;
    const imagePath = url.slice(4, -1).replace(/['"]/g, '');
    
    const img = new Image();
    img.onload = () => {
        console.log('Sprite carregado com sucesso!', {
            width: img.width,
            height: img.height
        });
    };
    
    img.onerror = () => {
        console.error('Erro ao carregar o sprite!', {
            path: imagePath
        });
    };
    
    img.src = imagePath;
});