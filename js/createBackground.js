export function createTemporaryBackground() {
    const canvas = document.createElement('canvas');
    canvas.width = 383;
    canvas.height = 352;
    const ctx = canvas.getContext('2d');

    // Desenhar um padrão de grid
    ctx.fillStyle = '#2c2c2c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar grid
    ctx.strokeStyle = '#3a3a3a';
    ctx.lineWidth = 1;

    // Linhas verticais
    for (let x = 0; x < canvas.width; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Linhas horizontais
    for (let y = 0; y < canvas.height; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    return canvas.toDataURL('image/png');
}