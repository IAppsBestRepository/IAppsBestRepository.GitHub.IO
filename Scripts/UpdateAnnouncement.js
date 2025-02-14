(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = 
        window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
        timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}());

document.querySelector('.download-canvas-btn').addEventListener('click', async () => {
    try {
    const canvas = document.getElementById('myCanvas');
    const upscaleFactor = 3;
    const targetCanvas = document.createElement('canvas');
    targetCanvas.width = canvas.width * upscaleFactor;
    targetCanvas.height = canvas.height * upscaleFactor;
    
    await pica().resize(canvas, targetCanvas, {
        quality: 3,
        unsharpAmount: 80,
        unsharpThreshold: 3
    });
    
    // Создаем ссылку для скачивания
    const link = document.createElement('a');
    link.download = `canvas-${Date.now()}.png`;
    link.href = targetCanvas.toDataURL('image/png');
    link.dispatchEvent(new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: false
    }));
    } catch (error) {
    console.error('Ошибка скачивания:', error);
    alert('Ошибка: ' + error.message);
    }
});

let selectedNum = 3;
const inputsContainer = document.getElementById('inputsContainer');
const numButtons = document.querySelectorAll('.num-selector button');

const generateInputs = num => {
    inputsContainer.innerHTML = '';
    Array.from({length: num}).forEach((_, i) => {
        const div = document.createElement('div');
        div.className = 'input-group';
        div.innerHTML = `
        <label>Изображение ${i + 1}:</label>
        <input type="text" id="img${i}" placeholder="Ссылка на изображение">
        `;
        inputsContainer.appendChild(div);
    });
};

generateInputs(selectedNum);

numButtons.forEach(button => {
    button.addEventListener('click', function() {
        numButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        selectedNum = parseInt(this.dataset.num);
        generateInputs(selectedNum);
    });
});

document.querySelector('.num-selector button[data-num="3"]').classList.add('active');

let animationFrameId = null;
let currentUrls = [];
let images = [];

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => resizeCanvas(), 100);
});

const resizeCanvas = () => {
    const canvasContainer = document.getElementById('canvasContainer');
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    const baseCanvasWidth = 1000;
    const baseCanvasHeight = 400;
    const aspectRatio = baseCanvasWidth / baseCanvasHeight;
    
    const isContainerVisible = canvasContainer.style.display !== 'none';
    const containerWidth = isContainerVisible ? canvasContainer.clientWidth : window.innerWidth;
    const isMobile = containerWidth <= 768;

    let canvasWidth, canvasHeight;
    if (isMobile) {
        canvasWidth = Math.min(baseCanvasWidth, containerWidth * 0.95);
        canvasHeight = canvasWidth / aspectRatio;
    } else {
        canvasWidth = baseCanvasWidth;
        canvasHeight = baseCanvasHeight;
    }
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    ctx.scale(dpr, dpr);
    
    if (currentUrls.length > 0) {
        drawCanvas(canvasWidth, canvasHeight, baseCanvasWidth, baseCanvasHeight);
    }
};

document.getElementById('displayBtn').addEventListener('click', () => {
    const urls = Array.from({length: selectedNum})
        .map((_, i) => document.getElementById(`img${i}`).value.trim());
    
    if (urls.some(url => !url)) {
        alert("Пожалуйста, заполните все ссылки на изображения");
        return;
    }
    
    currentUrls = urls;
    const canvasContainer = document.getElementById('canvasContainer');
    canvasContainer.style.display = 'inline-block';
    
    images = [];
    let loadedCount = 0;
    
    urls.forEach((url, index) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            loadedCount++;
            if (loadedCount === selectedNum) {
                resizeCanvas();
            }
        };
        img.onerror = () => alert(`Ошибка загрузки изображения ${index + 1}`);
        img.src = url;
        images.push(img);
    });
});

const drawCanvas = (canvasWidth, canvasHeight, baseCanvasWidth, baseCanvasHeight) => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);

    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const baseScale = canvasWidth / baseCanvasWidth;

    const targetHeights = {
        3: [70, 90, 70],
        5: [60, 80, 100, 80, 60],
        7: [50, 65, 80, 100, 80, 65, 50]
    }[selectedNum].map(h => h * baseScale);

    const bottomLine = canvasHeight * 0.75;
    const yPositions = targetHeights.map(h => bottomLine - h);
    const widths = images.map((img, i) => img.width * (targetHeights[i] / img.height));
    const overlap = 20 * baseScale;
    const groupWidth = widths.reduce((a, b) => a + b, 0) - (selectedNum - 1) * overlap;
    const startX = (canvasWidth - groupWidth) / 2;
    const xs = [startX];

    for (let i = 1; i < selectedNum; i++) {
        xs[i] = xs[i - 1] + widths[i - 1] - overlap;
    }

    const drawOrder = {
        3: [0, 2, 1],
        5: [0, 4, 1, 3, 2],
        7: [0, 6, 1, 5, 2, 4, 3]
    }[selectedNum];

    const drawRoundedImage = (image, x, y, width, height, radiusBase) => {
        const radius = radiusBase * baseScale;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(image, x, y, width, height);
        ctx.restore();
    };

    const animateGradient = time => {
        const gradientOffset = (time * 0.05) % 800;
        const gradient = ctx.createLinearGradient(
            gradientOffset - 400, 0,
            gradientOffset + 400, 0
        );
        gradient.addColorStop(0, '#8A2BE2');
        gradient.addColorStop(0.25, '#4B0082');
        gradient.addColorStop(0.5, '#0000FF');
        gradient.addColorStop(0.75, '#00BFFF');
        gradient.addColorStop(1, '#8A2BE2');
        return gradient;
    };

    const drawFrame = time => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = "#0D1117";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        const text = "Update Repository";
        ctx.font = `bold ${24 * baseScale}px sans-serif`;
        const textWidth = ctx.measureText(text).width;
        ctx.fillStyle = animateGradient(time);
        ctx.fillText(text, (canvasWidth - textWidth) / 2, canvasHeight * 0.4);
        
        drawOrder.forEach(i => {
            drawRoundedImage(images[i], xs[i], yPositions[i], widths[i], targetHeights[i], 20);
        });
        
        animationFrameId = requestAnimationFrame(drawFrame);
    };

    drawFrame(0);
};
